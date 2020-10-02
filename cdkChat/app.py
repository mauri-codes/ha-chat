#!/usr/bin/env python3

from aws_cdk import core

from cdk_chat.cdk_chat_stack import CdkChatStack


app = core.App()
CdkChatStack(app, "cdk-chat")

app.synth()
