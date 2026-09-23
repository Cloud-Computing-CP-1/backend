export class AWSDeploymentStrategy {
    async deploy(input) {
        console.log(`Deploying project ${input.imageUri} to AWS`);
        // We will implement this next.
        return {
            status: "RUNNING",
        };
    }
    async stop(deploymentId) {
        console.log("Stopping AWS deployment:", deploymentId);
    }
    async delete(deploymentId) {
        console.log("Deleting AWS deployment:", deploymentId);
    }
    async getStatus(deploymentId) {
        return "RUNNING";
    }
}
//# sourceMappingURL=aws.Statergy.js.map