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

import * as path from "path";
import { Utilities } from "../utils/Utilities";

export class Constants {

    public static readonly BASE_WORK_DIR: string = path.join(".", "build");

    public static readonly BUILD_RESOURCES_DIR: string = path.join(Constants.BASE_WORK_DIR, "resources");

    public static readonly CLONE_DIR: string = path.join(Constants.BASE_WORK_DIR, "clone_repositories");

    public static readonly LOG_DIR: string = path.join(Constants.BASE_WORK_DIR, "logs");

    public static readonly REPORTS_DIR: string = path.join(Constants.BASE_WORK_DIR, "reports");

    public static readonly ZOWE_MANIFEST_PATH: string = path.join(Constants.BUILD_RESOURCES_DIR, "zowe-manifest.json");

    public static readonly ZOWE_MANIFEST_SOURCE: string = path.join(".", "resources", "zowe-manifest-source.txt");

    public static readonly REPO_RULE_PATH: string = path.join(".", "resources", "repoRules.json");

    public static readonly DEPENDENCY_DECISIONS_YAML: string = path.join(Constants.BUILD_RESOURCES_DIR, "dependency_decisions.yml");

    public static readonly SCAN_AGGREGATE_REPORT_FILE: string = path.join(Constants.REPORTS_DIR, "dependency_approval_action_aggregates.json");

    public static readonly PARALLEL_CLONE_COUNT: number = 4;

    public static readonly PARALLEL_INSTALL_COUNT: number = 6;

    public static readonly PARALLEL_SCAN_COUNT: number = 2;

    public static readonly PARALLEL_REPORT_COUNT: number = 6;

    public static readonly CLEAN_REPO_DIR_ON_START: boolean = true;

    public static readonly CLEAN_LOGS_ON_START: boolean = true;

    // Typical flow: clone, perform installs, run scans, generate reports
    // set steps to false to skip them (partial runs)
    // If you skip step (n), you should skip all (n-1, n-2, etc.) steps.
    public static readonly EXEC_CLONE: boolean = Utilities.getEnv("ZOWE_STEP_CLONE", true);

    public static readonly EXEC_INSTALLS: boolean = Utilities.getEnv("ZOWE_STEP_INSTALL", true);

    public static readonly EXEC_SCANS: boolean = Utilities.getEnv("ZOWE_STEP_SCAN", true);

    public static readonly EXEC_REPORTS: boolean = Utilities.getEnv("ZOWE_STEP_REPORT", true);

    public static readonly SCAN_INDIVIDUALS: boolean = Utilities.getEnv("ZOWE_SCAN_INDIVIDUAL", true);

    public static readonly SCAN_AGGREGATE: boolean = Utilities.getEnv("ZOWE_SCAN_AGGREGATE", true);
}
