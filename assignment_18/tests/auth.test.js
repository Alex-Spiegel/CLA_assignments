const mongoose = require("mongoose");
const request = require("supertest");
const { app, server } = require("../backend/server");
const Coder = require("../backend/app/models/coderSchema");
const Manager = require("../backend/app/models/managerSchema");
const Challenge = require("../backend/app/models/challengeSchema");
const Submission = require("../backend/app/models/submissionSchema");
const bcrypt = require("bcryptjs");

let testData = {}; // Speichert IDs für spätere Tests

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("testpassword", 10); // Echtes Hashing

  // 1. Coder & Manager erstellen
  const coder = await Coder.create({
    first_name: "Test",
    last_name: "Coder",
    email: "coder@example.com",
    password: hashedPassword,
    role: "coder",
    is_verified: true,
  });

  const manager = await Manager.create({
    first_name: "Test",
    last_name: "Manager",
    email: "manager@example.com",
    password: "hashedpassword",
    role: "manager",
    is_verified: true,
  });

  // 2. Challenges vom Manager erstellen
  const challenge1 = await Challenge.create({
    title: "Challenge 1",
    category: "Algorithms",
    description: "Solve a problem",
    level: "Easy",
    manager: manager._id,
    code: {
      function_name: "sum",
      code_text: {
        language: "js",
        text: "function sum(a, b) { return a + b; }",
      },
      inputs: [
        { name: "a", type: "number" },
        { name: "b", type: "number" },
      ],
    },
    tests: [
      {
        weight: 1,
        inputs: [
          { name: "a", value: 2 },
          { name: "b", value: 3 },
        ],
        output: 5,
      },
    ],
    status: [{ coder_id: coder._id, status: "COMPLETED" }], // Direkt setzen ✅
  });

  const challenge2 = await Challenge.create({
    title: "Challenge 2",
    category: "Data Structures",
    description: "Solve another problem",
    level: "Moderate",
    manager: manager._id,
    code: {
      function_name: "reverseString",
      code_text: {
        language: "js",
        text: 'function reverseString(str) { return str.split("").reverse().join(""); }',
      },
      inputs: [{ name: "str", type: "string" }],
    },
    tests: [
      {
        weight: 1,
        inputs: [{ name: "str", value: "hello" }],
        output: "olleh",
      },
    ],
    status: [{ coder_id: coder._id, status: "ATTEMPTED" }], // Direkt setzen ✅
  });

  // 3. Submissions vom Coder
  const submission1 = await Submission.create({
    coder_id: coder._id,
    challenge_id: challenge1._id,
    code: "function sum(a, b) { return a + b; }",
    lang: "js",
    passed: true,
    score: 10,
  });

  const submission2 = await Submission.create({
    coder_id: coder._id,
    challenge_id: challenge2._id,
    code: "function reverseString(str) { return str; }",
    lang: "js",
    passed: false,
    score: 0,
  });

  testData = {
    coder,
    manager,
    challenge1,
    challenge2,
    submission1,
    submission2,
  };
});

afterAll(async () => {
  // 4. Test-Daten löschen
  await Coder.deleteMany({});
  await Manager.deleteMany({});
  await Challenge.deleteMany({});
  await Submission.deleteMany({});

  await mongoose.connection.close();
  server.close();
});

describe("Auth API Tests", () => {
  test("Dummy-Test läuft", () => {
    expect(1).toBe(1);
  });

  //=========================================
  //                TESTS
  //=========================================
  test("Accessing guarded Route should return an unauthorized error when the user is not logged in", async () => {
    const res = await request(app).get("/coders/profile");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Token is missing or invalid.");
  });

  test("Accessing guarded Route should return an unauthorized error when the user passes an invalid token", async () => {
    const res = await request(app)
      .get("/coders/profile")
      .set("Authorization", "Bearer invalid_token"); // Ungültiges Token senden

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Token is invalid.");
  });

  test("Login should return a valid token when the correct credentials are passed to the login endpoint", async () => {
    const res = await request(app).post("/coders/login").send({
      email: "coder@example.com",
      password: "testpassword",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  test("Get-Request return all the challenges for the coder after login.", async () => {
    // 1. Coder einloggen und Token holen
    const loginRes = await request(app).post("/coders/login").send({
      email: "coder@example.com",
      password: "testpassword",
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
    const token = loginRes.body.token; // Token speichern

    // 2. Challenges abrufen mit Token
    const challengesRes = await request(app)
      .get("/challenges") // Stelle sicher, dass dies die richtige Route ist!
      .set("Authorization", `Bearer ${token}`);

    expect(challengesRes.status).toBe(200);
    expect(Array.isArray(challengesRes.body.challenges)).toBe(true);
    expect(challengesRes.body.challenges.length).toBe(2);
  });
});
