from aws_cdk import core
from aws_cdk.aws_elasticloadbalancingv2 import ApplicationLoadBalancer
from aws_cdk.aws_ec2 import SubnetSelection

class ClusterStack(core.Stack):
    def __init__(self, scope: core.Construct, id: str, vpc, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        alb = ApplicationLoadBalancer(self, "chatLB",
            vpc=vpc,
            internet_facing=True,
            load_balancer_name="chat-alb",
            vpc_subnets=SubnetSelection(one_per_az=True)
        )    
