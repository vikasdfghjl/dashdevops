import { Router } from 'express';
import client from 'prom-client';
import os from 'os';

const router = Router();

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'dashdevops'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Create custom metrics
const cpuUsageGauge = new client.Gauge({
  name: 'cpu_usage',
  help: 'CPU usage in percentage'
});

const memoryUsageGauge = new client.Gauge({
  name: 'memory_usage',
  help: 'Memory usage in percentage'
});

const diskUsageGauge = new client.Gauge({
  name: 'disk_usage',
  help: 'Disk usage in percentage'
});

// Register the custom metrics
register.registerMetric(cpuUsageGauge);
register.registerMetric(memoryUsageGauge);
register.registerMetric(diskUsageGauge);

// Update the custom metrics periodically
setInterval(() => {
  cpuUsageGauge.set(os.loadavg()[0]); // 1-minute load average
  memoryUsageGauge.set((os.totalmem() - os.freemem()) / os.totalmem() * 100); // Memory usage in percentage
  diskUsageGauge.set(Math.random() * 100); // Placeholder for disk usage
}, 5000);

// Expose the metrics endpoint
router.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export default router;
