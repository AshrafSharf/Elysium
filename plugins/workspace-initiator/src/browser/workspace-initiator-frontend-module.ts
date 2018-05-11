/*
 * Copyright (C) 2018 SE RWTH.
 *
 * TODO: Include License.
 */

import { ContainerModule } from "inversify";
import { WorkspaceInitiatorContribution } from "./workspace-initiator-contribution";
import { FrontendApplicationContribution } from "@theia/core/lib/browser";

export default new ContainerModule(bind => {
    bind(WorkspaceInitiatorContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toDynamicValue(
        ctx => ctx.container.get(WorkspaceInitiatorContribution)
    ).inSingletonScope();
});
