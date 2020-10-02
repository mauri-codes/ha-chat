from aws_cdk import core
import aws_cdk.aws_ecr as ecr

class CdkChatStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        repository = ecr.Repository(self, "ChatRepo", repository_name="chatapp")

        # The code that defines your stack goes here
