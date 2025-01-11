import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 users over 30 seconds
    { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users over 30 seconds
  ],
};

export default function () {
  let res = http.get('http://localhost:5000/api/generate-load?limit=10000');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
