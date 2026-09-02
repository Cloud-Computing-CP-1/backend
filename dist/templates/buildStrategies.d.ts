export interface BuildStrategy {
    name: string;
    match: (workspacePath: string) => boolean;
    generate: (workspacePath: string) => string;
}
export declare const strategies: BuildStrategy[];
//# sourceMappingURL=buildStrategies.d.ts.map