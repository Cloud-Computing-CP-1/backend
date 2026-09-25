import { ALBService } from "../AWSDeploymentService/ALBService.js";
import { ECSService } from "../AWSDeploymentService/ECSService.js";
import { get__Project_name } from "../../model/users.projects.js";
export class AWSDeploymentService {
    ecsService = new ECSService();
    albService = new ALBService();
    async deploy(input) {
        const taskDefinition = await this.ecsService.registerTaskDefinition(input);
        const targetGroup = await this.albService.createTargetGroup(input);
        const project_slug = await get__Project_name(input.project_id);
        const slug = project_slug?.projects_name;
        const routing = await this.albService.createListenerRule(input.project_id, slug, targetGroup);
        await this.ecsService.createService(input, targetGroup, taskDefinition);
        return {
            status: "RUNNING",
            // providerResourceId:
            //     ecsService.serviceArn,
            // providerMetadata: {
            //     taskDefinition,
            //     targetGroup
            // }
        };
    }
}
//# sourceMappingURL=AWSDeploymentService.js.map