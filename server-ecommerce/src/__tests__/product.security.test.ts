import request from 'supertest';
import app from '../index.js';

const FAKE_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoiZmFrZUBmYWtlLmNvbSIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNTE2MjM5MDIyfQ.fake_signature_part';

// Base paths (index.ts: app.use('/products', productRoutes), routes use /products prefix)
const BASE = '/products/products';
const BANNERS = '/products/banners';

describe('API Security - Products (Authorization & Input Validation)', () => {

    // ─────────────────────────────────────────────────────────────────────────
    // GET /products/products — Public list
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /products/products — Public product list', () => {

        it('should return 200 and an array without authentication', async () => {
            const res = await request(app).get(BASE);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should handle an overly long query string without crashing', async () => {
            const res = await request(app).get(`${BASE}?category=${'A'.repeat(5000)}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /products/products/search — Search (DoS protection)
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /products/products/search — Search input validation', () => {

        it('should return 400 when search query exceeds 200 characters', async () => {
            const longQuery = 'A'.repeat(201);
            const res = await request(app).get(`${BASE}/search?q=${longQuery}`);
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        it('should handle NoSQL injection in search query gracefully', async () => {
            const res = await request(app).get(`${BASE}/search?q={"$gt":""}`);
            expect(res.status).not.toBe(500);
        });

        it('should handle an empty search query without crashing', async () => {
            const res = await request(app).get(`${BASE}/search?q=`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /products/products/:id — Public, ID validation
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /products/products/:id — Public, ID validation', () => {

        it('should return 400 or 404 for a non-existent product (not 500)', async () => {
            const res = await request(app).get(`${BASE}/507f1f77bcf86cd799439999`);
            expect([400, 404]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should handle SQL injection in product ID without crashing', async () => {
            const res = await request(app).get(`${BASE}/1' OR '1'='1`);
            expect(res.status).not.toBe(500);
            expect(res.status).not.toBe(200);
        });

        it('should handle NoSQL injection in product ID without crashing', async () => {
            const res = await request(app).get(`${BASE}/{"$gt":""}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // POST /products/products — ADMIN only (create)
    // ─────────────────────────────────────────────────────────────────────────
    describe('POST /products/products — Requires AUTH + ADMIN (BOLA/IDOR)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .post(BASE)
                .send({ name: 'Hacked Product', price: 0.01 });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .post(BASE)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ name: 'Hacked Product', price: 0.01 });
            expect(res.status).toBe(401);
        });

        it('should not crash on an empty payload without auth', async () => {
            const res = await request(app).post(BASE).send({});
            expect([400, 401, 403, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should not expose stack trace on invalid multipart data', async () => {
            const res = await request(app)
                .post(BASE)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .set('Content-Type', 'multipart/form-data')
                .send('not-valid-multipart-data');
            expect(res.status).not.toBe(500);
            expect(res.body).not.toHaveProperty('stack');
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /products/products/:id — ADMIN only (update)
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /products/products/:id — Requires AUTH + ADMIN', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put(`${BASE}/507f1f77bcf86cd799439011`)
                .send({ price: -999 });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .put(`${BASE}/507f1f77bcf86cd799439011`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ price: -999 });
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /products/products/:id/publish — ADMIN only
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /products/products/:id/publish — Requires AUTH + ADMIN', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put(`${BASE}/507f1f77bcf86cd799439011/publish`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .put(`${BASE}/507f1f77bcf86cd799439011/publish`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /products/products/:id — ADMIN only (single)
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /products/products/:id — Requires AUTH + ADMIN', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .delete(`${BASE}/507f1f77bcf86cd799439011`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .delete(`${BASE}/507f1f77bcf86cd799439011`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });

        it('should handle injection in ID param without 500', async () => {
            const res = await request(app)
                .delete(`${BASE}/1' OR '1'='1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /products/products — ADMIN only (bulk)
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /products/products — Requires AUTH + ADMIN (bulk delete)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .delete(BASE)
                .send({ ids: ['507f1f77bcf86cd799439011'] });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .delete(BASE)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ ids: ['507f1f77bcf86cd799439011'] });
            expect(res.status).toBe(401);
        });

        it('should handle an empty ids array without crashing', async () => {
            const res = await request(app)
                .delete(BASE)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ ids: [] });
            expect([400, 401, 403, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /products/banners — Public
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /products/banners — Public showcase banners', () => {

        it('should return 200 without authentication', async () => {
            const res = await request(app).get(BANNERS);
            expect([200, 404]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /products/banners/:id — ADMIN only
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /products/banners/:id — Requires AUTH + ADMIN', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put(`${BANNERS}/507f1f77bcf86cd799439011`)
                .send({ isFeatured: true });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .put(`${BANNERS}/507f1f77bcf86cd799439011`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ isFeatured: true });
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // POST /products/products/analyze-title — ADMIN only
    // ─────────────────────────────────────────────────────────────────────────
    describe('POST /products/products/analyze-title — Requires AUTH + ADMIN', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/analyze-title`)
                .send({ title: 'iPhone 15 Pro Max' });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/analyze-title`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ title: 'iPhone 15 Pro Max' });
            expect(res.status).toBe(401);
        });

        it('should handle a very long title without crashing', async () => {
            const res = await request(app)
                .post(`${BASE}/analyze-title`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ title: 'X'.repeat(10000) });
            expect(res.status).not.toBe(500);
        });
    });
});
