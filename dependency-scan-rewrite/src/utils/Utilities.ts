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

import * as fs from "fs";
import * as path from "path";
import { isNullOrUndefined } from "util";

export class Utilities {

    public static getEnv(envVar: string, defaultValue: boolean = false): boolean {
        //TODO: use yargs for better parsing?
        if (!isNullOrUndefined(process.argv) && process.argv.includes(envVar)) {
            console.log("Using command line " + envVar + "=true");
            return true;
        }
        if (!isNullOrUndefined(process.env[envVar])) {
            const envValue = process.env[envVar].toLowerCase();
            if (envValue === "true" ||
                envValue === "1" ||
                envValue === "yes") {
                console.log("Using env " + envVar + "=true");
                return true;
            }
            console.log("Using env " + envVar + "=false");
            return false;
        }
        return defaultValue;
    }

    public static isDirectory(dir: string) {
        return fs.lstatSync(dir).isDirectory();
    }

    public static getSubDirs(dir: string) {
        return fs.readdirSync(dir).filter((subDir) => Utilities.isDirectory(path.join(dir, subDir)));
    }

    public static dirHasGradleProject(dir: string) {
        return fs.existsSync(path.join(dir, "build.gradle"));
    }

    public static dirHasNodeProject(dir: string) {
        return fs.existsSync(path.join(dir, "package.json"));
    }

    public static dirHasMavenProject(dir: string) {
        return fs.existsSync(path.join(dir, "pom.xml"));
    }
}