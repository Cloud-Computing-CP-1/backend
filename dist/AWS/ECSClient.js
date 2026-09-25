import { ECSClient } from "@aws-sdk/client-ecs";
import { ElasticLoadBalancingV2Client } from "@aws-sdk/client-elastic-load-balancing-v2";
import { config } from "dotenv";
config();
export const ecsClient = new ECSClient({
    region: process.env.AWS_REGION
});
export const elbv2Client = new ElasticLoadBalancingV2Client({
    region: process.env.AWS_REGION
});
//# sourceMappingURL=ECSClient.js.map