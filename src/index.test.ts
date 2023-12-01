// src/index.test.ts
import request from "supertest";
import fs from "fs";
import app from "./index";

describe("Express App", () => {
  test('should respond with "Backend Connected" when / is requested', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Backend Connected");
  });
});

describe("GET /todos", () => {
  it("should return an array of todos", async () => {
    const response = await request(app).get("/todos");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it("should return specific todo data", async () => {
    const testData = {
      title: "New Todo",
      description: "A new todo item",
    };

    // Write the test data to the file before making the request
    fs.writeFileSync("./toDos.json", JSON.stringify([testData]));

    const response = await request(app).get("/todos");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([testData]);
  });
});
