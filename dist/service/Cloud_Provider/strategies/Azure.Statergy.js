export class AzureDeploymentStrategy {
    async deploy(input) {
        throw new Error("Azure deployment not implemented");
    }
    async stop(id) { }
    async delete(id) { }
    async getStatus(id) {
        return "NOT_IMPLEMENTED";
    }
}
//# sourceMappingURL=Azure.Statergy.js.map