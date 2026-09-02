import { BuildService } from '../service/build.service.js';
import crypto from 'crypto';
const buildService = new BuildService();
export const startBuild = async (req, res) => {
    try {
        const { repoUrl } = req.body;
        if (!repoUrl) {
            res.status(400).json({ error: 'Repository URL is required' });
            return;
        }
        // Generate a unique build ID for tracking
        const buildId = crypto.randomUUID();
        console.log(`[API] Received build request ${buildId} for ${repoUrl}`);
        // simulates the SQS decoupling.
        buildService.processBuild(repoUrl, buildId).catch(err => {
            console.error(`[Background Build ${buildId}] Failed:`, err);
        });
        // Immediately respond to the user
        res.status(202).json({
            message: 'Build triggered successfully',
            buildId: buildId,
            repoUrl: repoUrl
        });
    }
    catch (error) {
        console.error('[API] Error starting build:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//# sourceMappingURL=build.controller.js.map