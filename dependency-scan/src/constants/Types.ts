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

export const TYPES = {
    App: Symbol("ScanApplication"),
    CloneAction: Symbol("CloneAction"),
    DependencyDecision: Symbol("DependencyDecision"),
    Logger: Symbol("Logger"),
    InstallerAction: Symbol("InstallerAction"),
    RepoData: Symbol("RepositoryMetadata"),
    RepoRules: Symbol("RepositoryRules"),
    RepoRulesData: Symbol("RepositoryRulesData"),
    ReportAction: Symbol("ReportAction"),
    ScannerAction: Symbol("ScannerAction")
};
