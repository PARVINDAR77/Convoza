import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// Custom Metrics
const errorRate = new Rate('error_rate');
const dashboardDuration = new Trend('dashboard_duration');
const contactPaginationDuration = new Trend('contact_pagination_duration');
const messageSendDuration = new Trend('message_send_duration');

export const options = {
  stages: [
    { duration: '30s', target: 100 },   // Warm up to 100 VUs
    { duration: '1m', target: 500 },    // Scale to 500 VUs
    { duration: '2m', target: 1000 },   // Peak steady state: 1,000 concurrent authenticated VUs
    { duration: '30s', target: 1200 },  // Headroom stress test: 1,200 VUs
    { duration: '30s', target: 0 },     // Ramp down
  ],
  thresholds: {
    // P95 latency below 500ms for lightweight reads
    dashboard_duration: ['p(95)<500'],
    // P95 latency below 800ms for indexed database queries
    contact_pagination_duration: ['p(95)<800'],
    // Error rate must remain under 1%
    error_rate: ['rate<0.01'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:4000/api/v1';

export function setup() {
  // Pre-authenticate a test user to obtain a JWT
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: 'alex@apexretail.com',
      password: 'Demo@Convoza2026!',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  let token = '';
  let orgId = '';
  if (loginRes.status === 200) {
    const body = JSON.parse(loginRes.body);
    token = body.data?.tokens?.accessToken || '';
    orgId = body.data?.organizations?.[0]?.id || '';
  }

  return { token, orgId };
}

export default function (data) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${data.token}`,
    'x-organization-id': data.orgId,
  };

  group('1. Dashboard Metrics Aggregation', () => {
    const res = http.get(`${BASE_URL}/analytics/dashboard`, { headers });
    const success = check(res, {
      'status is 200': (r) => r.status === 200,
      'has rates and counts': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.data?.totalMessages !== undefined;
        } catch {
          return false;
        }
      },
    });
    errorRate.add(!success);
    dashboardDuration.add(res.timings.duration);
  });

  sleep(1);

  group('2. Contact Pagination & Search', () => {
    const page = Math.floor(Math.random() * 5) + 1;
    const res = http.get(`${BASE_URL}/contacts?page=${page}&limit=20`, { headers });
    const success = check(res, {
      'status is 200': (r) => r.status === 200,
      'has items array': (r) => {
        try {
          const body = JSON.parse(r.body);
          return Array.isArray(body.data?.items);
        } catch {
          return false;
        }
      },
    });
    errorRate.add(!success);
    contactPaginationDuration.add(res.timings.duration);
  });

  sleep(1);

  group('3. Template Inspection', () => {
    const res = http.get(`${BASE_URL}/templates?limit=10`, { headers });
    const success = check(res, {
      'status is 200': (r) => r.status === 200,
    });
    errorRate.add(!success);
  });

  sleep(1);

  group('4. Message Sending with Idempotency Key', () => {
    const idempotencyKey = `k6_msg_${__VU}_${__ITER}_${Date.now()}`;
    const payload = JSON.stringify({
      phoneNumberId: '102938475610293',
      recipientPhone: '+919876540001',
      type: 'TEMPLATE',
      templateId: 'tpl-1',
      templateParameters: { '1': 'Sarah', '2': 'APX-99' },
      idempotencyKey,
    });

    const res = http.post(`${BASE_URL}/messages/send`, payload, { headers });
    const success = check(res, {
      'message accepted (201 or 200)': (r) => r.status === 201 || r.status === 200,
    });
    errorRate.add(!success);
    messageSendDuration.add(res.timings.duration);
  });

  sleep(1);
}
