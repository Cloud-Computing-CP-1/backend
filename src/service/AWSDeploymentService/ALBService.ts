import { elbv2Client } from "../../AWS/ECSClient.js";
import type { DeploymentInput } from "../Cloud_Provider/strategies/CloudProviderStrategy.js";
import {
    ElasticLoadBalancingV2Client,
    CreateTargetGroupCommand,
    CreateRuleCommand
} from "@aws-sdk/client-elastic-load-balancing-v2";
export class ALBService {

    async createTargetGroup(input: DeploymentInput) {
        const vpcId = process.env.AWS_VPC_ID;

        if (!vpcId) {
            throw new Error("AWS_VPC_ID is not configured");
        }

        const targetGroupName =
            `df-project-${input.project_id}-tg`;

        const command = new CreateTargetGroupCommand({

            Name: targetGroupName,

            Protocol: "HTTP",

            Port: input.contariner_port,

            VpcId: vpcId,

            TargetType: "ip",

            // Health check
            HealthCheckEnabled: true,

            HealthCheckProtocol: "HTTP",

            HealthCheckPath: "/",

            HealthCheckPort: "traffic-port",

            HealthyThresholdCount: 2,

            UnhealthyThresholdCount: 3,

            HealthCheckTimeoutSeconds: 5,

            HealthCheckIntervalSeconds: 30,

            Matcher: {
                HttpCode: "200-399",
            },
        });

        const response =
            await elbv2Client.send(command);

        const targetGroupArn =
            response.TargetGroups?.[0]?.TargetGroupArn;

        if (!targetGroupArn) {
            throw new Error(
                "AWS did not return Target Group ARN"
            );
        }

        return targetGroupArn;
    }



    async createListenerRule(
        projectId: string | string[] | undefined,
        projectSlug: string,
        targetGroupArn: string
    ): Promise<{
        ruleArn: string;
        hostname: string;
        deploymentUrl: string;
    }> {

        const listenerArn = process.env.AWS_ALB_LISTENER_ARN;

        if (!listenerArn) {
            throw new Error(
                "AWS_ALB_LISTENER_ARN is not configured"
            );
        }

        // Example:
        // digital-twin.deployforge.site
        const hostname =
            `${projectSlug}.deployforge.site`;

        /*
         * ALB priorities must be unique.
         * Fine for your current project IDs.
         */
        if (!projectId) {
            throw new Error(
                "project_idrequired"
            );
        }
        const priority = 1000 + Number(projectId);

        const command = new CreateRuleCommand({
            ListenerArn: listenerArn,

            Priority: priority,

            Conditions: [
                {
                    Field: "host-header",

                    HostHeaderConfig: {
                        Values: [hostname],
                    },
                },
            ],

            Actions: [
                {
                    Type: "forward",
                    TargetGroupArn: targetGroupArn,
                },
            ],
        });

        const response =
            await elbv2Client.send(command);

        const ruleArn =
            response.Rules?.[0]?.RuleArn;

        if (!ruleArn) {
            throw new Error(
                "AWS did not return Listener Rule ARN"
            );
        }
        const deploymentUrl =
            `https://${hostname}`;
        return {
            ruleArn,
            hostname,
            deploymentUrl,
        };
    }

    async deleteTargetGroup() { }
}