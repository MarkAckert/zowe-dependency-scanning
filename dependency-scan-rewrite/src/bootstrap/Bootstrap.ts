/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

// Downloads the json file containing the list of repositories we should scan, along with version information
// Places in <root>/resources/repos.json
import * as fs from "fs";
import * as https from "https";
import { Container } from "inversify";
import "reflect-metadata";
import { CloneAction } from "../actions/CloneAction";
import { InstallAction } from "../actions/InstallAction";
import { ReportActon } from "../actions/ReportAction";
import { ScanAction } from "../actions/ScanAction";
import { ScanApplication } from "../app/ScanApplication";
import { Constants } from "../constants/Constants";
import { TYPES } from "../constants/Types";
import { RepositoryRules } from "../repos/RepositoryRules";
import { Logger } from "../utils/Logger";

export function bootstrap(container: Container) {
    return new Promise<ScanApplication>((resolveApp, rejectApp) => {
        if (!container.isBound(TYPES.App)) {
            new Promise<boolean>((resolve, reject) => {
                const reposFile = fs.createWriteStream(Constants.REPO_METADATA_PATH);
                const dependencyDecisionsFile = fs.createWriteStream(Constants.DEPENDENCY_DECISIONS_YAML);
                reposFile.on("finish", () => {
                    resolve(true);
                });
                const repoMetadataReq = https.get(fs.readFileSync(Constants.REPO_METADATA_SOURCE).toString().trim(), (response: any) => {
                    response.pipe(reposFile);
                });
                const dependencyDecisionsReq = https.get(fs.readFileSync(Constants.DEPENDENCY_DECISIONS_SOURCE).toString().trim(),
                    (response: any) => {
                        response.pipe(dependencyDecisionsFile);
                    });
            }).then((result) => {
                console.log("Getting application");
                container.bind(TYPES.App).to(ScanApplication).inSingletonScope();
                container.bind(TYPES.Logger).to(Logger).inSingletonScope();
                container.bind(TYPES.CloneAction).to(CloneAction).inSingletonScope();
                container.bind(TYPES.InstallerAction).to(InstallAction).inSingletonScope();
                container.bind(TYPES.ScannerAction).to(ScanAction).inSingletonScope();
                container.bind(TYPES.ReportAction).to(ReportActon).inSingletonScope();
                container.bind(TYPES.RepoRules).to(RepositoryRules).inSingletonScope();
                container.bind(TYPES.RepoData).toConstantValue(JSON.parse(fs.readFileSync("./resources/repos_static_test.json").toString()));
                container.bind(TYPES.RepoRulesData).toConstantValue(JSON.parse(fs.readFileSync(Constants.REPO_RULE_PATH).toString()));
                resolveApp(container.get(TYPES.App));
            }).catch((error) => {
                rejectApp(error);
                console.log(error);
                console.log("Critical error downloading the master repository+tag data. Aborting.");
                process.exit(1);
            });
        }
        else {
            resolveApp(container.get<ScanApplication>(TYPES.App));
        }
    });

};
