import request from 'supertest';
import app from '../index.js';

const FAKE_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoiZmFrZUBmYWtlLmNvbSIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNTE2MjM5MDIyfQ.fake_signature_part';

// index.ts: app.use('/payments', paymentRoutes)
const BASE = '/payments';

describe('API Security - Payments (Authorization & Input Validation)', () => {

    // ─────────────────────────────────────────────────────────────────────────
    // POST /payments/createCard — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('POST /payments/createCard — Requires AUTH (save card)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/createCard`)
                .send({ cardNumber: '4242424242424242', expiry: '12/26', cvv: '123' });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/createCard`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ cardNumber: '4242424242424242', expiry: '12/26', cvv: '123' });
            expect(res.status).toBe(401);
        });

        it('should not crash on empty payload without auth', async () => {
            const res = await request(app).post(`${BASE}/createCard`).send({});
            expect([400, 401, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should not expose card details or stack traces in error responses', async () => {
            const res = await request(app)
                .post(`${BASE}/createCard`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ cardNumber: '4242424242424242' });
            expect(res.body).not.toHaveProperty('stack');
            // Ensure raw card numbers are not echoed back in the response
            expect(JSON.stringify(res.body)).not.toContain('4242424242424242');
        });

        it('should not crash on XSS payload in card holder name', async () => {
            const res = await request(app)
                .post(`${BASE}/createCard`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ cardHolder: '<script>alert("xss")</script>' });
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /payments/getCard — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /payments/getCard — Requires AUTH (get saved card)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app).get(`${BASE}/getCard`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .get(`${BASE}/getCard`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /payments/payments/:id — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /payments/payments/:id — Requires AUTH (update card)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put(`${BASE}/payments/1`)
                .send({ expiry: '01/30' });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided (IDOR test)', async () => {
            // Attempting to update someone else's payment record
            const res = await request(app)
                .put(`${BASE}/payments/1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ expiry: '01/30' });
            expect(res.status).toBe(401);
        });

        it('should handle injection in payment ID param without crashing', async () => {
            const res = await request(app)
                .put(`${BASE}/payments/1' OR '1'='1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ expiry: '01/30' });
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /payments/payments/:id — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /payments/payments/:id — Requires AUTH (delete card)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app).delete(`${BASE}/payments/1`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided (IDOR test)', async () => {
            const res = await request(app)
                .delete(`${BASE}/payments/1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });

        it('should handle injection in ID param without crashing', async () => {
            const res = await request(app)
                .delete(`${BASE}/payments/{"$gt":""}`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // POST /payments/create-intent — Requires AUTH (Stripe PaymentIntent)
    // ─────────────────────────────────────────────────────────────────────────
    describe('POST /payments/create-intent — Requires AUTH (Stripe intent)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/create-intent`)
                .send({ amount: 1000, currency: 'usd' });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/create-intent`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ amount: 1000, currency: 'usd' });
            expect(res.status).toBe(401);
        });

        it('should not crash on zero or negative amount (price manipulation)', async () => {
            const res = await request(app)
                .post(`${BASE}/create-intent`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ amount: -1, currency: 'usd' });
            // Should be rejected by auth before processing, not crash the server
            expect([400, 401, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should not crash on empty payload', async () => {
            const res = await request(app)
                .post(`${BASE}/create-intent`)
                .send({});
            expect([400, 401, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // POST /payments/webhook — Public (Stripe signature verification)
    // ─────────────────────────────────────────────────────────────────────────
    describe('POST /payments/webhook — Public Stripe Webhook (signature required)', () => {

        it('should reject a webhook without Stripe signature header', async () => {
            const res = await request(app)
                .post(`${BASE}/webhook`)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ type: 'payment_intent.succeeded' }));
            // Stripe will reject if there's no stripe-signature header
            expect([400, 401, 403]).toContain(res.status);
            expect(res.status).not.toBe(200);
        });

        it('should reject a webhook with a tampered/fake Stripe signature', async () => {
            const res = await request(app)
                .post(`${BASE}/webhook`)
                .set('stripe-signature', 'fake_stripe_signature_header')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ type: 'payment_intent.succeeded' }));
            // Stripe SDK will reject invalid signatures
            expect([400, 401, 403]).toContain(res.status);
            expect(res.status).not.toBe(200);
        });

        it('should not crash or expose stack on empty body', async () => {
            const res = await request(app)
                .post(`${BASE}/webhook`)
                .set('stripe-signature', 't=123,v1=fakevalue')
                .send('');
            expect(res.status).not.toBe(500);
            expect(res.body).not.toHaveProperty('stack');
        });
    });
});
