/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-json version: 2.1.1(0e6ea95f4f4e093db9201c502e8d401391803233)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-json/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define("vs/language/json/monaco.contribution",["require","exports"],function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=monaco.Emitter,n=function(){function e(e,n){this._onDidChange=new o,this._languageId=e,this.setDiagnosticsOptions(n)}return Object.defineProperty(e.prototype,"onDidChange",{get:function(){return this._onDidChange.event},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"diagnosticsOptions",{get:function(){return this._diagnosticsOptions},enumerable:!0,configurable:!0}),e.prototype.setDiagnosticsOptions=function(e){this._diagnosticsOptions=e||Object.create(null),this._onDidChange.fire(this)},e}(),i=new(e.LanguageServiceDefaultsImpl=n)("json",{validate:!0,allowComments:!0,schemas:[]});monaco.languages.json={jsonDefaults:i},monaco.languages.register({id:"json",extensions:[".json",".bowerrc",".jshintrc",".jscsrc",".eslintrc",".babelrc"],aliases:["JSON","json"],mimetypes:["application/json"]}),monaco.languages.onLanguage("json",function(){monaco.Promise.wrap(new Promise(function(e,n){t(["./jsonMode"],e,n)})).then(function(e){return e.setupMode(i)})})});