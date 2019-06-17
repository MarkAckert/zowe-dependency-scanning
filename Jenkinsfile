#!groovy

/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2019
 */


node('ibm-jenkins-slave-nvm') {
  def lib = library("jenkins-library").org.zowe.jenkins_shared_library

  def pipeline = lib.pipelines.generic.NodeJSPipeline.new(this)

  pipeline.admins.add("jackjia", "markackert")

  pipeline.setup(
    packageName: 'org.zowe.dependency-scanning',
    github: [
      email                      : lib.Constants.DEFAULT_GITHUB_ROBOT_EMAIL,
      usernamePasswordCredential : lib.Constants.DEFAULT_GITHUB_ROBOT_CREDENTIAL,
    ],
    artifactory: [
      url                        : lib.Constants.DEFAULT_ARTIFACTORY_URL,
      usernamePasswordCredential : lib.Constants.DEFAULT_ARTIFACTORY_ROBOT_CREDENTIAL,
    ],
    npm: [

    ]
  )

  pipeline.build(
    timeout       : [time: 5, unit: 'MINUTES'],
    isSkippable   : false,
    operation     : {
        echo "Building LicenseFinder..."
        sh "cd LicenseFinder && bundle install -j4 && rake build"
    }
  )

  // FIXME: we may move smoke test into this pipeline
  pipeline.test(
    name              : "Smoke",
    operation         : {
        echo 'Skip until test case are embeded into this pipeline.'
    },
    allowMissingJunit : true
  )

  // how we packaging jars/zips
  pipeline.packaging(name: 'zowe')

  // define we need publish stage
  pipeline.publish(
    artifacts: [
      '.pax/zowe.pax'
    ]
  )

  pipeline.end()
}