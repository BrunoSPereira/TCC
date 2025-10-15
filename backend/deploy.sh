#!/usr/bin/env bash
set -eu
APP_VERSION=0.0.1
IMAGE=backend:$APP_VERSION

echo "Efetuando Docker Build da versão $APP_VERSION"
docker build -t $IMAGE --build-arg APP_VERSION=$APP_VERSION .
# docker push $IMAGE
