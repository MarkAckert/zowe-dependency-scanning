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

import { inject, injectable } from "inversify";
import { IAction } from "../actions/IAction";
import { Constants } from "../constants/Constants";
import { TYPES } from "../constants/Types";

@injectable()
export class ScanApplication {

    @inject(TYPES.CloneAction) private readonly cloneAction: IAction;
    @inject(TYPES.InstallerAction) private readonly installAction: IAction;
    @inject(TYPES.ScannerAction) private readonly scanAction: IAction;
    @inject(TYPES.ReportAction) private readonly reportAction: IAction;

    public run() {
        const appFns: Array<() => Promise<any>> = [];
        // tslint:disable 
        // TSLint Disabled so I can do a heinous (op1,op2) within the ternary operator. 
        //      Confusing comma syntax, both statements are performed and the result of the second is returned..
        (Constants.EXEC_CLONE) ? (appFns.push(this.cloneAction.run.bind(this.cloneAction)), console.log("Will Execute Clone Step"))
            : console.log("Will Skip Clone Step");
        (Constants.EXEC_INSTALLS) ? (appFns.push(this.installAction.run.bind(this.installAction)), console.log("Will Execute Install Step"))
            : console.log("Will Skip Install Step");
        (Constants.EXEC_SCANS) ? (appFns.push(this.scanAction.run.bind(this.scanAction)), console.log("Will Execute Scan Step"))
            : console.log("Will Skip Scan Step");
        (Constants.EXEC_REPORTS) ? (appFns.push(this.reportAction.run.bind(this.reportAction)), console.log("Will Execute Report Step"))
            : console.log("Will Skip Report Step");
        // tslint:enable
        appFns.reduce((prev, cur) => prev.then(cur), Promise.resolve());
    }
}