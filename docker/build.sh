#!/bin/bash
rsync -av --progress ../dependency-scan-rewrite include/ --exclude .git --exclude build --exclude lib --exclude node_modules
rsync -av --progress ../LicenseFinder include/ --exclude .git --exclude ci

docker build -t zowe/zowe-dependency-scanning:latest .