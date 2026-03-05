import request from 'supertest';
import app from '../index.js';

const FAKE_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoiZmFrZUBmYWtlLmNvbSIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNTE2MjM5MDIyfQ.fake_signature_part';

// index.ts: app.use('/products', productRoutes) + routes use /products prefix → /products/products/*
const BASE = '/products/products';
const BANNERS = '/products/banners';

/**
 * NOTE: Public GET endpoints are omitted because they use MongoProductRepository
 * which requires a live MongoDB connection unavailable in CI — causing timeouts.
 * Only protected write endpoints and the search DoS guard (400 before DB) are tested here,
 * since they return 401/400 at the middleware layer before touching the database.
 */
describe('API Security - Products (Authorization & Input Validation)', () => {

    // ─────────────────────────────────────────────────────────────────────────
    // GET /products/products/search — DoS protection (validated BEFORE DB query)
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /products/products/search — Search DoS protection', () => {

        it('should return 400 when search query exceeds 200 characters', async () => {
            const longQuery = 'A'.repeat(201);
            const res = await request(app).get(`${BASE}/search?q=${longQuery}`);
            // validateSearchQuery middleware returns 400 BEFORE hitting the DB
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // POST /products/products — Requires AUTH + ADMIN (create)
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

        it('should not expose stack trace on invalid multipart data', async () => {
            const res = await request(app)
                .post(BASE)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .set('Content-Type', 'multipart/form-data')
                .send('not-valid-multipart-data');
            // Blocked at auth before reaching multer/DB
            expect(res.status).toBe(401);
            expect(res.body).not.toHaveProperty('stack');
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /products/products/:id — Requires AUTH + ADMIN (update)
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
    // PUT /products/products/:id/publish — Requires AUTH + ADMIN
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
    // DELETE /products/products/:id — Requires AUTH + ADMIN (single)
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

        it('should block injection in ID at auth layer', async () => {
            const res = await request(app)
                .delete(`${BASE}/1' OR '1'='1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /products/products — Requires AUTH + ADMIN (bulk)
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

        it('should return 401 on empty ids array (blocked before DB)', async () => {
            const res = await request(app)
                .delete(BASE)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ ids: [] });
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /products/banners/:id — Requires AUTH + ADMIN
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
    // POST /products/products/analyze-title — Requires AUTH + ADMIN
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
    });
});
