import { AWSDeploymentService } from "../../AWSDeploymentService/AWSDeploymentService.js";
import { AWSDeploymentStrategy } from "../strategies/aws.Statergy.js";
import { AzureDeploymentStrategy } from "../strategies/Azure.Statergy.js";
import type { CloudProviderStrategy } from "../strategies/CloudProviderStrategy.js";
import { GCPDeploymentStrategy } from "../strategies/Gcp.Statergy.js";

export class Clud_Provider_Factory_ {
    static Create(provider_name: string): CloudProviderStrategy {
        switch (provider_name.toUpperCase()) {
            case "AWS":
                return new AWSDeploymentStrategy(new AWSDeploymentService())
            case "GCP":
                return new GCPDeploymentStrategy()
            case "AZURE":
                return new AzureDeploymentStrategy()
            default:
                throw new Error(
                    `Unsupported cloud provider: ${provider_name}`
                );
        }
    }
}