from aws_cdk import core
from aws_cdk.aws_elasticloadbalancingv2 import (
    ApplicationLoadBalancer,
    ApplicationTargetGroup,
    ApplicationProtocol,
    TargetType
)
from aws_cdk.aws_ecs import (
    Cluster,
    PortMapping,
    NetworkMode,
    Compatibility,
    ContainerImage,
    FargateService,
    FargateTaskDefinition
)
from aws_cdk.aws_ec2 import SubnetSelection

class ClusterStack(core.Stack):
    def __init__(self, scope: core.Construct, id: str, vpc, ecr_repo, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        load_balancer = ApplicationLoadBalancer(self, "chatLB",
            vpc=vpc,
            internet_facing=True,
            load_balancer_name="chat-alb"
        )
        listener=load_balancer.add_listener("lbListener",
            port=80,
            protocol=ApplicationProtocol("HTTP")
        )
        # target_group = ApplicationTargetGroup(self, "chatTargetGroup",
        #     vpc=vpc,
        #     port=80,
        #     protocol=ApplicationProtocol("HTTP"),
        #     target_type=TargetType("IP"),
        #     target_group_name="chat-tg"
        # )
        ecs_cluster = Cluster(self, "chatCluster",
            cluster_name="chat-cluster",
            vpc=vpc
        )
        task_definition=FargateTaskDefinition(self, "chatTaskDefinition",
            memory_limit_mib=2048,
            cpu=512
        )
        container = task_definition.add_container("AddContainer",
            image=ContainerImage.from_ecr_repository(ecr_repo)
        )
        container.add_port_mappings(
            PortMapping(container_port=80)
        )
        fargate_service = FargateService(self, "chatService",
            vpc_subnets=SubnetSelection(one_per_az=True),
            task_definition=task_definition,
            service_name="chat-service",
            assign_public_ip=True, # try with False later
            cluster=ecs_cluster,
            desired_count=3,
        )
        listener.add_targets("AddTarget",
            protocol=ApplicationProtocol("HTTP"),
            target_group_name="chat-tg",
            targets=[fargate_service],
            port=80,
        )