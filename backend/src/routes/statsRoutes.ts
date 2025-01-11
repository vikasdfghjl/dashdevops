import { Router } from 'express';
import os from 'os';

const router = Router();

router.get('/server-stats', (req, res) => {
  const stats = {
    time: new Date().toLocaleTimeString(),
    cpu: os.loadavg()[0], // 1-minute load average
    memory: (os.totalmem() - os.freemem()) / os.totalmem() * 100, // Memory usage in percentage
    disk: Math.random() * 100 // Placeholder for disk usage
  };
  res.json([stats]);
});

export default router;
