from aws_cdk import core
from aws_cdk.aws_elasticloadbalancingv2 import (
    ApplicationLoadBalancer,
    ApplicationTargetGroup,
    ApplicationProtocol,
    TargetType
)
from aws_cdk.aws_ecs import (
    Cluster,
    ContainerImage,
    FargateTaskDefinition,
    ApplicationLoadBalancedFargateService,
    ApplicationLoadBalancedTaskImageOptions
)
from aws_cdk.aws_ec2 import SubnetSelection

class ClusterStack(core.Stack):
    def __init__(self, scope: core.Construct, id: str, vpc, ecr_repo, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        task_definition=FargateTaskDefinition(self, "chatTaskDefinition",
            memory_limit_mib=2048,
            cpu=512
        )
        ecs_cluster = Cluster(self, "chatCluster",
            cluster_name="chat-cluster",
            vpc=vpc
        )
        fargate_service = ApplicationLoadBalancedFargateService(self, "FargateService",
            cluster=ecs_cluster,
            task_definition=task_definition,
            task_image_options=ApplicationLoadBalancedTaskImageOptions(
                image=ContainerImage.from_ecr_repository(ecr_repo)
            ),
            desired_count=3,
            service_name="chat-service",
            memory_limit_mib=2048,
            cpu=512
        )
        fargate_service.service.auto_scale_task_count(
            min_capacity=2,
            max_capacity=5
        )