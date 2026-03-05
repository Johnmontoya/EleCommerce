import request from 'supertest';
import app from '../index.js';

const FAKE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoiZmFrZUBmYWtlLmNvbSIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNTE2MjM5MDIyfQ.fake_signature_part';

describe('API Security - Users (Authorization & Input Validation)', () => {

    // ─────────────────────────────────────────────────────────────────────────
    // GET /auth/all — Listado público
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /auth/all — Public user list', () => {

        it('should return 200 and an array without authentication', async () => {
            const res = await request(app).get('/auth/all');
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        it('should NOT expose password hashes in the response', async () => {
            const res = await request(app).get('/auth/all');
            const users: Record<string, unknown>[] = res.body.data ?? [];
            users.forEach((user) => {
                expect(user).not.toHaveProperty('password');
            });
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // GET /auth/get-user/:id — ADMIN only
    // ─────────────────────────────────────────────────────────────────────────
    describe('GET /auth/get-user/:id — Requires AUTH + ADMIN role (BOLA/IDOR)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app).get('/auth/get-user/507f1f77bcf86cd799439011');
            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .get('/auth/get-user/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });

        it('should handle NoSQL injection in user ID without 500', async () => {
            const res = await request(app)
                .get("/auth/get-user/{ \"$gt\": \"\" }")
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).not.toBe(500);
        });

        it('should handle SQL injection in user ID without crashing', async () => {
            const res = await request(app)
                .get("/auth/get-user/1' OR '1'='1")
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /auth/update/:id — Auth required
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /auth/update/:id — Requires AUTH (Input Validation & Injection)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put('/auth/update/507f1f77bcf86cd799439011')
                .send({ firstName: 'Hacker' });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .put('/auth/update/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ firstName: 'Hacker' });
            expect(res.status).toBe(401);
        });

        it('should not crash on empty payload (input validation)', async () => {
            const res = await request(app)
                .put('/auth/update/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({});
            expect([400, 401, 403, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should not crash on XSS payload in name fields', async () => {
            const res = await request(app)
                .put('/auth/update/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({
                    firstName: '<script>alert("xss")</script>',
                    lastName: '<img src=x onerror=alert(1)>',
                });
            expect(res.status).not.toBe(500);
        });

        it('should not crash on overly long input (resource exhaustion)', async () => {
            const res = await request(app)
                .put('/auth/update/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ firstName: 'A'.repeat(10000) });
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // PUT /auth/toggle-active/:id — ADMIN only
    // ─────────────────────────────────────────────────────────────────────────
    describe('PUT /auth/toggle-active/:id — Requires AUTH + ADMIN role', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .put('/auth/toggle-active/507f1f77bcf86cd799439011');
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid/non-admin token is provided', async () => {
            const res = await request(app)
                .put('/auth/toggle-active/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /auth/delete/:id — ADMIN only
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /auth/delete/:id — Requires AUTH + ADMIN role', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .delete('/auth/delete/507f1f77bcf86cd799439011');
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .delete('/auth/delete/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).toBe(401);
        });

        it('should handle injection in ID param without 500', async () => {
            const res = await request(app)
                .delete("/auth/delete/1' OR '1'='1")
                .set('Authorization', `Bearer ${FAKE_JWT}`);
            expect(res.status).not.toBe(500);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /auth/delete-users — ADMIN only (bulk delete)
    // ─────────────────────────────────────────────────────────────────────────
    describe('DELETE /auth/delete-users — Requires AUTH + ADMIN role (bulk)', () => {

        it('should return 401 when no token is provided', async () => {
            const res = await request(app)
                .delete('/auth/delete-users')
                .send({ ids: ['507f1f77bcf86cd799439011'] });
            expect(res.status).toBe(401);
        });

        it('should return 401 when an invalid token is provided', async () => {
            const res = await request(app)
                .delete('/auth/delete-users')
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ ids: ['507f1f77bcf86cd799439011'] });
            expect(res.status).toBe(401);
        });

        it('should handle an empty ids array without crashing', async () => {
            const res = await request(app)
                .delete('/auth/delete-users')
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({ ids: [] });
            expect([400, 401, 403, 422]).toContain(res.status);
            expect(res.status).not.toBe(500);
        });

        it('should handle missing body without crashing', async () => {
            const res = await request(app)
                .delete('/auth/delete-users')
                .set('Authorization', `Bearer ${FAKE_JWT}`)
                .send({});
            expect(res.status).not.toBe(500);
        });
    });
});
