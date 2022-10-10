import request from 'supertest';
import { app } from '../index.js';
import { expect } from 'chai';
const BASE_URL = '/api/v1';

describe('GET /status', function () {
    it('responds successfully', function (done) {
        request(app)
            .get(`${BASE_URL}/status`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                message: 'Hello World from URL Mapping Service'
            }, done);
    });
});

// POST
describe('POST /urls', function () {
    it('responds successfully for self defined fromURL', async function () {
        // Clear all URLs
        await request(app).delete(`${BASE_URL}/urls`)
        const response = await request(app)
            .post(`${BASE_URL}/urls`)
            .set('Accept', 'application/json')
            .send({
                fromUrl: 'selfDefined',
                toUrl: 'https://www.google.com'
            })
        expect('Content-Type', /json/)
        expect(201)
        expect(response.body.message).equal('Created new URL mapping successfully!');
        expect(response.body.data.toUrl).equal('https://www.google.com');
        expect(response.body.data.fromUrl).to.be.a('string');
        expect(response.body.data.fromUrl).to.equal('http://localhost:8000/r/selfDefined');
        expect(response.body.data.status).to.be.a('string');
        expect(response.body.data.status).to.equal('active');
        expect(response.body.data.createdAt).to.be.a('string');
        expect(response.body.data.updatedAt).to.be.a('string');
    });

    it('responds successfully for auto generated fromURL', async function () {
        // Clear all URLs
        await request(app).delete(`${BASE_URL}/urls`)
        const response = await request(app)
            .post(`${BASE_URL}/urls`)
            .set('Accept', 'application/json')
            .send({
                toUrl: 'https://www.google.com'
            })
        expect('Content-Type', /json/)
        expect(201)
        expect(response.body.message).equal('Created new URL mapping successfully!');
        expect(response.body.data.toUrl).equal('https://www.google.com');
        expect(response.body.data.fromUrl).to.be.a('string');
        expect(response.body.data.fromUrl).to.match(/^http:\/\/localhost:8000\/r\/[\w]{8}$/);
    });
});

// DELETE
describe('DELETE /urls', function () {
    it('responds successfully', function (done) {
        request(app)
            .delete(`${BASE_URL}/urls`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                message: 'Deleted all URL mappings successfully!'
            }, done);
    });
});

// GET
describe('GET /urls', function () {
    it('responds successfully with all URLs', async function () {
        // Clear all URLs
        await request(app).delete(`${BASE_URL}/urls`)
        // Create one new URL
        await request(app)
            .post(`${BASE_URL}/urls`)
            .set('Accept', 'application/json')
            .send({
                fromUrl: 'selfDefined',
                toUrl: 'https://www.google.com'
            })
        // Get all URLs
        const response = await request(app)
            .get(`${BASE_URL}/urls`)
            .set('Accept', 'application/json');

        expect(response.body.message).equal('List all URL mappings successfully!');
        expect(response.body.data).to.be.a('array');
        expect(response.body.data).to.have.lengthOf(1);
    });

    it('responds successfully with one URL', async function () {
        // Clear all URLs
        await request(app).delete(`${BASE_URL}/urls`)
        // Create one new URL
        await request(app)
            .post(`${BASE_URL}/urls`)
            .set('Accept', 'application/json')
            .send({
                fromUrl: 'selfDefined',
                toUrl: 'https://www.google.com'
            })
        // Get one URL
        const response = await request(app)
            .get(`${BASE_URL}/urls/selfDefined`)
            .set('Accept', 'application/json');

        expect(response.body.message).equal('Found URL mapping successfully!');
        expect(response.body.data).to.be.a('object');
        expect(response.body.data.fromUrl).equal('http://localhost:8000/r/selfDefined');
        expect(response.body.data.toUrl).equal('https://www.google.com');
    });
});

// PUT
describe('PUT /urls', function () {
    it('responds successfully', async function () {
        // Clear all URLs
        await request(app).delete(`${BASE_URL}/urls`)
        // Create one new URL
        await request(app)
            .post(`${BASE_URL}/urls`)
            .set('Accept', 'application/json')
            .send({
                fromUrl: 'selfDefined',
                toUrl: 'https://www.google.com'
            })
        // Update one URL
        const response = await request(app)
            .put(`${BASE_URL}/urls/selfDefined`)
            .set('Accept', 'application/json')
            .send({
                toUrl: 'https://www.facebook.com'
            });

        expect(response.body.message).equal('Updated URL mapping successfully!');
        expect(response.body.data).to.be.a('object');
        expect(response.body.data.fromUrl).equal('http://localhost:8000/r/selfDefined');
        expect(response.body.data.toUrl).equal('https://www.facebook.com');
    });
});

// Redirect
describe('Redirect', function () {
    it('redirects successfully', async function () {
        // Clear all URLs
        await request(app).delete(`${BASE_URL}/urls`)
        // Create one new URL
        await request(app)
            .post(`${BASE_URL}/urls`)
            .set('Accept', 'application/json')
            .send({
                fromUrl: 'selfDefined',
                toUrl: 'https://www.google.com'
            })
        // Redirect
        const response = await request(app)
            .get('/r/selfDefined')
            .set('Accept', 'application/json');
        expect(response.status).equal(302);
        expect(response.header.location).equal('https://www.google.com');
    });
});