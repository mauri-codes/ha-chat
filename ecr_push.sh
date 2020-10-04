#!/bin/bash

# prepare files
# npm install
# npm run server_build
# npm run client_install
# npm run client_build

# push to repository
AWS_ACCOUNT=972073858291
REGION=us-east-2
APP=chatapp

docker build -t mau/$APP .
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com
docker tag mau/$APP $AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com/$APP
docker push $AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com/$APP
