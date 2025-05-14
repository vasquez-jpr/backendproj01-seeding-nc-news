/* Set up your test imports here */
const request = require("supertest");
const app = require("../app.js");
const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.endpoints).toEqual(endpointsJson);
      });
  });
});

// ==== TOPICS ====
describe("GET /api/topics", () => {
  test("200: Responds with an object with a key of topics and a value of an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("topics");
        expect(Array.isArray(body.topics)).toBe(true);
        expect(body.topics).toHaveLength(3);
        for (let i = 0; i < body.topics.length; i++) {
          expect(body.topics[i]).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        }
      });
  });
});

describe("GET ");
