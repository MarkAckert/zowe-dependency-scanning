#!/bin/bash
rsync -av --progress ../dependency-scan include/ --delete --exclude .git --exclude build --exclude lib --exclude node_modules --exclude yarn.lock
rsync -av --progress ../LicenseFinder include/ --delete --exclude .git --exclude ci

docker build -t zowe/zowe-dependency-scanning:latest .