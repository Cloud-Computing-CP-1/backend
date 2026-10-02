import { api } from "../controller/Buildimage.controller.js";
import { getAllCloude_Provider } from "../model/admin.provider.js";
import { get_all_deployment_instace_AWS, update_Deployment_instance } from "../model/user.deployment.js";
import { CreateImage } from "../model/user.image.js";
import { findProjectUpdatecurrimage, get__Project_name, get_Projet_id_from_repo_id, getProjectEnv, update_status } from "../model/users.projects.js";
import { WithRetry } from "../Statergy/WithRetry.js";
import type { BuildMessage } from "../types/BuildMessage.js";
import { Clud_Provider_Factory_ } from "./Cloud_Provider/factory/CloudProviderFactory.js";
import type { Deployment_update_Input, DeploymentInput } from "./Cloud_Provider/strategies/CloudProviderStrategy.js";
export class Auto_Deploy {

    static async Porcess_data_Deploye(payload: BuildMessage) {

        console.log("Processing:", payload.fullName);

        const project =
            await get_Projet_id_from_repo_id(payload.repoId);
        const projectId = project.id;
        await update_status(projectId,"DEPLOYING")
        if (!projectId) {
            throw new Error("Project not found");
        }

        const imageBuildStartTime = new Date();

        const data = await WithRetry(async () => {

            const response = await api.post(
                "/api/builds",
                {
                    repoUrl: payload.cloneUrl
                }
            );

            return response.data;
        });

        const imageBuildCompletedTime = new Date();


        const imageTag = data?.image?.tag;
        const imageUri = data?.image?.reference;
        const imageDigest = data?.id;

        if (!imageUri) {
            throw new Error("Image URI not returned from build service");
        }

        const image = await CreateImage(
            projectId,
            payload.repoId.toString(),
            payload.cloneUrl,
            payload.branch,
            imageUri,
            imageDigest,
            imageTag,
            "READY",
            imageBuildStartTime,
            imageBuildCompletedTime
        );

        const imageId = image.id;
        await findProjectUpdatecurrimage(
            imageId,
            projectId
        )
        const providers =
            await getAllCloude_Provider();
        const provider =
            providers.find(p => p.is_enabled === true);
        if (!provider) {
            throw new Error("No cloud provider is enabled");
        }
        const providerName = provider.provider_name;
        const existingDeployment =
            await get_all_deployment_instace_AWS(
                projectId,
                providerName
            );
        const all_env = await getProjectEnv(projectId);
        const deploymentEnv = all_env.map(({ key, value }) => ({
            name: key,
            value: String(value),
        }));
        const deploymentInput: DeploymentInput = {
            project_id: projectId,
            imageUri: imageUri,
            env: deploymentEnv,
            contariner_port: 80
        };
        if (!existingDeployment) {
            console.log("First deployment");
            const statergy = Clud_Provider_Factory_.Create(providerName)
            await statergy.deploy(deploymentInput)
        } else {
            console.log("Existing deployment - updating");
            const metadata =
                existingDeployment.provider_metadata;
            const serviceName = metadata.serviceName;
            const deploymentInput_update: Deployment_update_Input = {
                project_id: projectId,
                imageUri: imageUri,
                env: deploymentEnv,
                contariner_port: 80,
                ServiceName: serviceName
            };
            const statergy = Clud_Provider_Factory_.Create(providerName)
            const { taskDefinition, serviceArn } = await statergy.update(deploymentInput_update)
            await update_Deployment_instance(existingDeployment.id, taskDefinition, serviceArn, imageId)
            await update_status(projectId,"RUNNING")
        }
        // Only return when EVERYTHING succeeded.
        return {
            success: true,
            projectId,
            imageId
        };
    }
}