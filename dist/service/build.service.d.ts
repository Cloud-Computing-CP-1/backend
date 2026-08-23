export type SupportedRuntime = 'NODEJS' | 'PYTHON' | 'GO';
export declare class BuildService {
    private detectLanguage;
    private generateDockerfile;
    private cloneRepository;
    processBuild(repoUrl: string): Promise<void>;
}
//# sourceMappingURL=build.service.d.ts.map