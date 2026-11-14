import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const webhookErrorRate = new Rate('webhook_error_rate');

export const options = {
  scenarios: {
    webhook_burst: {
      executor: 'constant-arrival-rate',
      rate: 200, // 200 webhook events per second burst
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<150'], // Meta requires sub-150ms webhook acknowledgment
    webhook_error_rate: ['rate<0.005'], // < 0.5% errors
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:4000/api/v1';

export default function () {
  const wamid = `wamid_burst_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const payload = JSON.stringify({
    object: 'whatsapp_business_account',
    entry: [
      {
        id: '109823746591029',
        changes: [
          {
            value: {
              messaging_product: 'whatsapp',
              metadata: {
                display_phone_number: '+919876543210',
                phone_number_id: '102938475610293',
              },
              statuses: [
                {
                  id: wamid,
                  status: 'delivered',
                  timestamp: Math.floor(Date.now() / 1000).toString(),
                  recipient_id: '919876540001',
                },
              ],
            },
            field: 'messages',
          },
        ],
      },
    ],
  });

  const res = http.post(`${BASE_URL}/webhooks/meta/whatsapp`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'x-hub-signature-256': 'sha256=test_signature',
    },
  });

  const success = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  webhookErrorRate.add(!success);
}

