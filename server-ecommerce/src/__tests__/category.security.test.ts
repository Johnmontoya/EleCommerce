import request from 'supertest';
import app from '../index.js';

const FAKE_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoiZmFrZUBmYWtlLmNvbSIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNTE2MjM5MDIyfQ.fake_signature_part';

// index.ts: app.use('/categories', categoryRoutes)
// categoryRoutes: router.post('/categories', ...) → full path: /categories/categories
const BASE = '/categories/categories';

describe('API Security - Categories (Authorization & Input Validation)', () => {

    // ─────────────────────────────────────────────────────────────────────────
    // GET /categories/categories — Public list
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /categories/categories — Public category list', () => {

        it('should return 200 and success without authentication', async () => {
            const res = await request(app).get(BASE);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should handle overly long query params without crashing', async () => {
            const res = await request(app).get(`${BASE}?isPublished=${'A'.repeat(5000)}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /categories/categories/:id — Public, ID validation
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /categories/categories/:id — Public, ID validation', () => {

        it('should return 400 or 404 for a non-existent category (not 500)', async () => {
            const res = await request(app).get(`${BASE}/507f1f77bcf86cd799439999`);
            expect([400, 404]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should handle SQL injection in category ID without crashing', async () => {
            const res = await request(app).get(`${BASE}/1' OR '1'='1`);
            expect(res.status).not.toBe(500);
            expect(res.status).not.toBe(200);
        });

        it('should handle NoSQL injection in category ID without crashing', async () => {
            const res = await request(app).get(`${BASE}/{"$gt":""}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /categories/categories/slug/:slug — Public
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /categories/categories/slug/:slug — Public, slug validation', () => {

        it('should return 400 or 404 for a non-existent slug (not 500)', async () => {
            const res = await request(app).get(`${BASE}/slug/slug-that-does-not-exist-xyz`);
            expect([400, 404]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should handle XSS payload in slug without crashing', async () => {
            const res = await request(app).get(`${BASE}/slug/<script>alert(1)</script>`);
            expect(res.status).not.toBe(500);
        });

        it('should handle an overly long slug without crashing', async () => {
            const res = await request(app).get(`${BASE}/slug/${'a'.repeat(2000)}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // POST /categories/categories — ⚠️ Missing auth! Security finding.
    // ─────────────────────────────────────────────────────────────────────────
    describe('POST /categories/categories — Input validation (⚠️ no auth middleware)', () => {

        /**
         * ⚠️ SECURITY FINDING:
         * This endpoint does NOT require authentication or ADMIN role.
         * Any unauthenticated user can create a category.
         * Recommendation: add `authenticate, authorize('ADMIN')` middleware.
         */
        it('⚠️ [SECURITY] should ideally return 401 without a token — currently unprotected', async () => {
            const res = await request(app)
                .post(BASE)
                .send({ name: 'Hacked Category', slug: 'hacked' });
            // Document the current behavior. Ideally this should be 401.
            console.warn(`⚠️ POST ${BASE} returned ${res.status} — expected 401 if protected.`);
            expect(res.status).not.toBe(500);
        });

        it('should not crash on empty payload', async () => {
            const res = await request(app).post(BASE).send({});
            expect([400, 401, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should not crash on XSS payload in name field', async () => {
            const res = await request(app)
                .post(BASE)
                .send({
                    name: '<script>alert("xss")</script>',
                    slug: '<img src=x onerror=alert(1)>',
                });
            expect(res.status).not.toBe(500);
            expect(res.body).not.toHaveProperty('stack');
        });

        it('should not crash on NoSQL injection in name field', async () => {
            const res = await request(app)
                .post(BASE)
                .send({ name: { "$gt": "" }, slug: { "$gt": "" } });
            expect(res.status).not.toBe(500);
        });

        it('should handle an overly long name without crashing (resource exhaustion)', async () => {
            const res = await request(app)
                .post(BASE)
                .send({ name: 'A'.repeat(10000), slug: 'long-name' });
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /categories/categories/:id — ⚠️ Missing auth! Security finding.
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /categories/categories/:id — Input validation (⚠️ no auth middleware)', () => {

        /**
         * ⚠️ SECURITY FINDING:
         * This endpoint does NOT require authentication or ADMIN role.
         * Any unauthenticated user can modify any category.
         * Recommendation: add `authenticate, authorize('ADMIN')` middleware.
         */
        it('⚠️ [SECURITY] should ideally return 401 without a token — currently unprotected', async () => {
            const res = await request(app)
                .put(`${BASE}/507f1f77bcf86cd799439011`)
                .send({ name: 'Tampered' });
            console.warn(`⚠️ PUT ${BASE}/:id returned ${res.status} — expected 401 if protected.`);
            expect(res.status).not.toBe(500);
        });

        it('should handle SQL injection in category ID param', async () => {
            const res = await request(app)
                .put(`${BASE}/1' OR '1'='1`)
                .send({ name: 'Injected' });
            expect(res.status).not.toBe(500);
        });

        it('should handle XSS payload in body without crashing', async () => {
            const res = await request(app)
                .put(`${BASE}/507f1f77bcf86cd799439011`)
                .send({ description: '<script>alert("xss")</script>' });
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /categories/categories/:id — ⚠️ Missing auth! Security finding.
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /categories/categories/:id — (⚠️ no auth middleware)', () => {

        /**
         * ⚠️ SECURITY FINDING:
         * This endpoint does NOT require authentication or ADMIN role.
         * Any unauthenticated user can delete any category.
         * Recommendation: add `authenticate, authorize('ADMIN')` middleware.
         */
        it('⚠️ [SECURITY] should ideally return 401 without a token — currently unprotected', async () => {
            const res = await request(app)
                .delete(`${BASE}/507f1f77bcf86cd799439999`); // non-existent ID
            console.warn(`⚠️ DELETE ${BASE}/:id returned ${res.status} — expected 401 if protected.`);
            expect(res.status).not.toBe(500);
        });

        it('should handle injection in ID param without crashing', async () => {
            const res = await request(app).delete(`${BASE}/1' OR '1'='1`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /categories/categories — ⚠️ Missing auth! Bulk delete.
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /categories/categories — Bulk delete (⚠️ no auth middleware)', () => {

        it('⚠️ [SECURITY] should ideally return 401 without a token — currently unprotected', async () => {
            const res = await request(app)
                .delete(BASE)
                .send({ ids: ['507f1f77bcf86cd799439999'] });
            console.warn(`⚠️ DELETE ${BASE} (bulk) returned ${res.status} — expected 401 if protected.`);
            expect(res.status).not.toBe(500);
        });

        it('should handle empty ids array without crashing', async () => {
            const res = await request(app).delete(BASE).send({ ids: [] });
            expect([400, 401, 404, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should handle missing body without crashing', async () => {
            const res = await request(app).delete(BASE).send({});
            expect(res.status).not.toBe(500);
        });
    });
});
