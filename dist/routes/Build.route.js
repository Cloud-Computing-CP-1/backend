import { Router } from 'express';
import { startBuild } from '../controller/build.controller.js';
// Adjust this import based on how you export your middleware
import { AuthMiddleWare } from '../middleware/auth.middleware.js';
const router = Router();
// Endpoint: POST /api/build/start
router.post('/start', startBuild);
export default router;
//# sourceMappingURL=Build.route.js.map