export type SupportedRuntime = 'NODEJS' | 'PYTHON' | 'GO';
export declare class BuildService {
    private detectLanguage;
    private cloneRepository;
    processBuild(repoUrl: string): Promise<SupportedRuntime>;
}
//# sourceMappingURL=build.service.d.ts.map