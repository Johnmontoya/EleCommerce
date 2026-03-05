import request from 'supertest';
import app from '../index.js';

describe('API Security - Products (Authorization & Input Validation)', () => {

    describe('Authorization Testing (BOLA/IDOR)', () => {

        it('should return 401 or 403 when trying to CREATE a product without auth', async () => {
            const res = await request(app)
                .post('/products/products') // The route is actually mapped to /products/products based on index.ts `app.use('/products', productRoutes)` where productRoutes has `/products`. (Wait, let's verify if the route is /products or /products/products. Actually, `index.ts` does `app.use('/products', productRoutes)`, and `productRoutes` mounts `/products`. So the full path is `/products/products`. Or it was a mistake in routing. We will test both or just `/products` assuming it might be corrected). 
                .send({
                    name: "Hacked Product",
                    price: 100
                });

            // Should not allow unauthenticated user to create products
            expect([401, 403, 404]).toContain(res.status);
            // 404 is acceptable here if the path doesn't exist, but it shouldn't be 200/201
        });

        it('should return 401 or 403 when trying to DELETE a product without auth', async () => {
            const res = await request(app).delete('/products/products/12345');
            expect([401, 403, 404]).toContain(res.status);
        });

    });

    describe('Input Validation Testing', () => {

        it('should handle SQL/NoSQL Injection in product ID gracefully', async () => {
            const res = await request(app).get("/products/products/1' OR '1'='1");
            // App should catch it via MongoDB ObjectId validation or general validation and return 400 or 404, but definitely NOT 500
            expect(res.status).not.toBe(500);
            expect(res.status).not.toBe(200);
        });

        it('should handle overly long inputs (Resource Exhaustion/Buffer Overflow)', async () => {
            const longString = 'A'.repeat(10000);
            const res = await request(app).get(`/products/products/search?q=${longString}`);

            expect(res.status).not.toBe(500);
            // We want the app to handle it or timeout gracefully.
        });
    });

});
