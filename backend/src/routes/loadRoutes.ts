import { Router } from 'express';

const router = Router();

const isPrime = (num: number): boolean => {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

const calculatePrimes = (limit: number): number[] => {
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
};

router.get('/generate-load', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10000;
  const primes = calculatePrimes(limit);
  res.json({ primes });
});

export default router;
