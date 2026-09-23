import { AWSDeploymentStrategy } from "../strategies/aws.Statergy.js";
import { AzureDeploymentStrategy } from "../strategies/Azure.Statergy.js";
import { GCPDeploymentStrategy } from "../strategies/Gcp.Statergy.js";
export class Clud_Provider_Factory_ {
    static Create(provider_name) {
        switch (provider_name.toUpperCase()) {
            case "AWS":
                return new AWSDeploymentStrategy();
            case "GCP":
                return new GCPDeploymentStrategy();
            case "AZURE":
                return new AzureDeploymentStrategy();
            default:
                throw new Error(`Unsupported cloud provider: ${provider_name}`);
        }
    }
}
//# sourceMappingURL=CloudProviderFactory.js.map