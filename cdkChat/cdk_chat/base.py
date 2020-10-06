from aws_cdk import core
import aws_cdk.aws_ecr as ecr
import aws_cdk.aws_ec2 as ec2

class BaseStack(core.Stack):
    
    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        repository = ecr.Repository(self, "ChatRepo", repository_name="chat-ecr-repo")
        self.vpc = ec2.Vpc(self, "chat-vpc",
            cidr="10.0.0.0/16",
            subnet_configuration=[{ 
                "cidrMask": 24,
                "name": 'mainApp',
                "subnetType": ec2.SubnetType.PUBLIC
            }] 
        )
    
    def get_vpc(self):
        return self.vpc
        # elb_sg = ec2.SecurityGroup(self, "ChatElbSg",
        #     description="Elastic Load Balancer for chat application",
        #     security_group_name="chat-elb-sg"
        # )

        # The code that defines your stack goes here
