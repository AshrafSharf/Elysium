/*
 * Copyright (C) 2018 SE RWTH.
 *
 * TODO: Include License.
 */

import URI from "@elysium/core/lib/common/uri";
import { injectable, inject, named } from "inversify";
import { ContributionProvider, DisposableCollection } from "@theia/core/lib/common";
import { FrontendApplicationContribution, FrontendApplication } from "@theia/core/lib/browser";
import { FrontendApplicationState } from "@theia/core/lib/browser/frontend-application-state";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";

export const QueryHandler = Symbol("QueryHandler");

/**
 * `QueryHandler` should be implemented to provide a new query param handler.
 */
export interface QueryHandler {
    /**
     * Checks whether the given uri can be processed. Returns a priority or 0 for no.
     */
    canHandle(uri: URI): number;

    /**
     * Handles the given uri.
     */
    handle(uri: URI): Promise<void>;
}

/**
 * FrontendApplicationContribution responsible for the execution of the correct QueryHandler.
 */
@injectable()
export class QueryController implements FrontendApplicationContribution {
    @inject(ContributionProvider) @named(QueryHandler)
    protected readonly provider: ContributionProvider<QueryHandler>;
    @inject(FrontendApplicationStateService) protected readonly stateService: FrontendApplicationStateService;

    protected toDispose: DisposableCollection = new DisposableCollection();

    public async onStart(app: FrontendApplication): Promise<void> {
        this.toDispose.push(
            this.stateService.onStateChanged(
                async (state: FrontendApplicationState) => await this.handleStateChange(state)
            )
        );
    }

    protected async handleStateChange(state: FrontendApplicationState): Promise<void> {
        if (state === "started_contributions") {
            this.toDispose.dispose();

            return this.handleContributionsStarted();
        }
    }

    protected async getSortedContributions(uri: URI): Promise<QueryHandler[]> {
        const handlers: QueryHandler[] = [];

        for (const contribution of this.provider.getContributions()) {
            const priority = await contribution.canHandle(uri);

            handlers.splice(priority, 0, contribution);
        }

        return handlers;
    }

    protected async handleContributionsStarted(): Promise<void> {
        const uri = new URI(window.location.href);
        const contributions = await this.getSortedContributions(uri);
        const contribution = contributions.pop();

        if (contribution) return contribution.handle(uri);
    }
}