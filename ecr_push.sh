#!/bin/bash

AWS_ACCOUNT=$(aws sts get-caller-identity --output text --query 'Account')
REGION=us-east-2
APP=chat-image

docker build -t mau/$APP .
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com
docker tag mau/$APP $AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com/$APP
docker push $AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com/$APP
