import request from 'supertest';
import app from '../index.js';

const FAKE_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoiZmFrZUBmYWtlLmNvbSIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNTE2MjM5MDIyfQ.fake_signature_part';

// index.ts: app.use('/cart', cartRoutes) + routes use /cart prefix → /cart/cart/*
const BASE = '/cart/cart';

/**
 * NOTE: GET /cart/cart/count/:userId is omitted because it uses PrismaCartItemRepository
 * which requires a live DB connection unavailable in CI — causing timeouts.
 * The remaining endpoints all return 401 at the auth middleware before touching Prisma.
 */
describe('API Security - Cart (Authorization & Input Validation)', () => {

    // ─────────────────────────────────────────────────────────────────────────
    // POST /cart/cart/add — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('POST /cart/cart/add — Requires AUTH (add item)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/add`)
                .send({ productId: '507f1f77bcf86cd799439011', quantity: 1 });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .post(`${BASE}/add`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ productId: '507f1f77bcf86cd799439011', quantity: 1 });
            expect(res.status).toBe(401);
        });

        it('should block NoSQL injection at auth layer', async () => {
            const res = await request(app)
                .post(`${BASE}/add`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ productId: { "$gt": "" }, quantity: 1 });
            expect(res.status).toBe(401);
        });

        it('should block negative quantity at auth layer', async () => {
            const res = await request(app)
                .post(`${BASE}/add`)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ productId: '507f1f77bcf86cd799439011', quantity: -999 });
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /cart/cart/me — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /cart/cart/me — Requires AUTH (get own cart)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app).get(`${BASE}/me`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .get(`${BASE}/me`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /cart/cart — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /cart/cart — Requires AUTH (update cart)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put(BASE)
                .send({ cartItemId: '1', quantity: 2 });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .put(BASE)
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ cartItemId: '1', quantity: 2 });
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /cart/cart/:id — Requires AUTH
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /cart/cart/:id — Requires AUTH (remove item)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app).delete(`${BASE}/1`);
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .delete(`${BASE}/1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });

        it('should block injection in cart item ID at auth layer', async () => {
            const res = await request(app)
                .delete(`${BASE}/1' OR '1'='1`)
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });
    });
});
