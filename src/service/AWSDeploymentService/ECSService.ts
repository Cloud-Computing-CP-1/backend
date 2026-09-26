import { RegisterTaskDefinitionCommand, type RegisterTaskDefinitionCommandOutput,CreateServiceCommand } from "@aws-sdk/client-ecs";
import type { DeploymentInput } from "../Cloud_Provider/strategies/CloudProviderStrategy.js";
import { ecsClient } from "../../AWS/ECSClient.js";

export class ECSService {

    async registerTaskDefinition(input: DeploymentInput) {
        const containerName =
            `df-project-${input.project_id}`;

        const family =
            `df-project-${input.project_id}`;
        const cammand = new RegisterTaskDefinitionCommand({
            family,
            networkMode: "awsvpc",
            requiresCompatibilities: [
                "FARGATE"
            ],
            cpu: "256",
            memory: "512",
            executionRoleArn:
                process.env.ECS_EXECUTION_ROLE_ARN,
            containerDefinitions: [
                {

                    name: containerName,
                    image: input.imageUri,
                    portMappings: [
                        {
                            containerPort: input.contariner_port,
                            protocol: "tcp"
                        }
                    ],
                    environment: input.env
                }
            ]
        })
        const response: RegisterTaskDefinitionCommandOutput = await ecsClient.send(cammand)
        const taskDefinitionArn =
            response.taskDefinition
                ?.taskDefinitionArn;

        if (!taskDefinitionArn) {
            throw new Error(
                "AWS did not return task definition ARN"
            );
        }
        return taskDefinitionArn
    }

    async createService(input: DeploymentInput, TargetGroupArn: string, taskDefinitionArn: string):Promise<{ serviceArn:string,serviceName:string}> {
       
                const subnetIds = process.env.AWS_SUBNET_ID
                    ?.split(",")
                    .map(id => id.trim());

                const securityGroupId =
                    process.env.AWS_FARGATE_SECURITY_GROUP_ID;

                if (!subnetIds || subnetIds.length < 2) {
                    throw new Error("At least 2 subnet IDs are required");
                }

                if (!securityGroupId) {
                    throw new Error("Fargate Security Group ID missing");
                }

                const serviceName =
                    `df-project-${input.project_id}-service`;

                const containerName =
                    `df-project-${input.project_id}`;

                const command = new CreateServiceCommand({

                    cluster: "deployforge-cluster",

                    serviceName,

                    taskDefinition: taskDefinitionArn,

                    desiredCount: 1,

                    launchType: "FARGATE",

                    networkConfiguration: {
                        awsvpcConfiguration: {
                            subnets: subnetIds,
                            securityGroups: [securityGroupId],

                            // For first deployment/testing
                            assignPublicIp: "ENABLED"
                        }
                    },

                    loadBalancers: [
                        {
                            targetGroupArn: TargetGroupArn,
                            containerPort:input.contariner_port,
                            containerName,
                        }
                    ]
                });

                const response = await ecsClient.send(command);

                const serviceArn = response.service?.serviceArn;

                if (!serviceArn) {
                    throw new Error("ECS Service ARN not returned");
                }

                console.log("ECS Service created:", serviceArn);

                return {serviceArn,serviceName};
            }

    async updateService() {
        // AWS ECS SDK
    }

    async waitUntilHealthy() {
        // ECS checking
    }
}