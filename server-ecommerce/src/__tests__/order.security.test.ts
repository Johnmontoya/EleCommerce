import request from 'supertest';
import app from '../index.js';

const FAKE_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoiZmFrZUBmYWtlLmNvbSIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNTE2MjM5MDIyfQ.fake_signature_part';

// index.ts: app.use('/orders', orderRoutes)
// orderRoutes: router.post('/create', ...) → /orders/create
const BASE = '/orders';

describe('API Security - Orders (Authorization & Input Validation)', () => {

    // ─────────────────────────────────────────────────────────────────────────
    // POST /orders/create — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('POST /orders/create — Requires AUTH (create order)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/create`)
                .send({ items: [], total: 100 });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/create`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ items: [], total: 100 });
            expect(res.status).toBe(401);
        });

        it('should not crash on empty payload without auth', async () => {
            const res = await request(app).post(`${BASE}/create`).send({});
            expect([400, 401, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should not crash on negative total (price manipulation attempt)', async () => {
            const res = await request(app)
                .post(`${BASE}/create`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ items: [{ productId: '123', quantity: 1 }], total: -999.99 });
            expect(res.status).not.toBe(500);
        });

        it('should not crash on NoSQL injection in body', async () => {
            const res = await request(app)
                .post(`${BASE}/create`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ items: { "$gt": "" }, total: { "$gt": 0 } });
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /orders/all — Requires AUTH + ADMIN
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /orders/all — Requires AUTH + ADMIN (all orders)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app).get(`${BASE}/all`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when a non-admin token is provided', async () => {
            const res = await request(app)
                .get(`${BASE}/all`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /orders/orders-user — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /orders/orders-user — Requires AUTH (own orders)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app).get(`${BASE}/orders-user`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .get(`${BASE}/orders-user`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /orders/cancel/:id — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /orders/cancel/:id — Requires AUTH (cancel order)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .delete(`${BASE}/cancel/507f1f77bcf86cd799439011`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided (IDOR test)', async () => {
            const res = await request(app)
                .delete(`${BASE}/cancel/507f1f77bcf86cd799439011`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            // Must not allow cancellation without valid auth
            expect(res.status).toBe(401);
        });

        it('should handle SQL injection in order ID without crashing', async () => {
            const res = await request(app)
                .delete(`${BASE}/cancel/1' OR '1'='1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /orders/update-status/:id — Requires AUTH + ADMIN
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /orders/update-status/:id — Requires AUTH + ADMIN', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put(`${BASE}/update-status/507f1f77bcf86cd799439011`)
                .send({ status: 'DELIVERED' });
            expect(res.status).toBe(401);
        });

        it('should return 401 when a non-admin token is provided', async () => {
            const res = await request(app)
                .put(`${BASE}/update-status/507f1f77bcf86cd799439011`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ status: 'DELIVERED' });
            expect(res.status).toBe(401);
        });

        it('should not crash on invalid status value without auth', async () => {
            const res = await request(app)
                .put(`${BASE}/update-status/507f1f77bcf86cd799439011`)
                .send({ status: '<script>alert(1)</script>' });
            expect([400, 401, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /orders/:trackingNumber — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /orders/:trackingNumber — Requires AUTH (IDOR test)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app).get(`${BASE}/TRK-000123`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .get(`${BASE}/TRK-000123`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });

        it('should handle injection in tracking number without crashing', async () => {
            const res = await request(app)
                .get(`${BASE}/1' OR '1'='1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).not.toBe(500);
        });
    });
});
