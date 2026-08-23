import { BuildService } from './service/build.service.js';
async function runTest() {
    const builder = new BuildService();
    const testRepoUrl = 'https://github.com/expressjs/express.git';
    console.log('Starting build pipeline test...');
    try {
        await builder.processBuild(testRepoUrl);
        console.log('Build pipeline test complete');
    }
    catch (error) {
        console.error('Test failed', error);
    }
}
runTest();
//# sourceMappingURL=test-build.js.map