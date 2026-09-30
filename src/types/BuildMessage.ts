export interface BuildMessage {
    repoId: number;
    name: string | null;
    email: string | null;
    repoName: string;
    fullName: string;
    cloneUrl: string;
    branch: string;
    commitSha: string;
}