import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface ServerStat {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
}

interface PrimeData {
  primes: number[];
}

const ServerStats: React.FC = () => {
  const [stats, setStats] = useState<ServerStat[]>([]);
  const [primeData, setPrimeData] = useState<PrimeData | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get('/api/server-stats');
      setStats(response.data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Fetch stats every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const generateLoad = async () => {
    const response = await axios.get('/api/generate-load?limit=10000');
    setPrimeData(response.data);
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
          <Line type="monotone" dataKey="memory" stroke="#82ca9d" />
          <Line type="monotone" dataKey="disk" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
      <button onClick={generateLoad}>Generate CPU Load</button>
      {primeData && (
        <div>
          <h2>Prime Numbers</h2>
          <p>{primeData.primes.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ServerStats;
