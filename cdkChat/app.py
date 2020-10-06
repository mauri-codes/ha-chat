#!/usr/bin/env python3
import boto3

from aws_cdk import core

from cdk_chat.base import BaseStack
from cdk_chat.cluster import ClusterStack

sts = boto3.client('sts')
account = sts.get_caller_identity().get("Account")

environment = core.Environment(account=account, region="us-east-2")

app = core.App()
base = BaseStack(app, "chat-base", env=environment)
cluster = ClusterStack(app, "chat-cluster",
    vpc=base.get_vpc(),
    env=environment,
    ecr_repo=base.get_erc_repo()
)

app.synth()
