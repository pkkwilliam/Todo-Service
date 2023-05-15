const request = require("supertest");
const express = require("express");

// Import the router you want to test
const taskRoute = require("../routes/taskRoute");

const mockTaskRepository = {
  getAll: jest.fn().mockReturnValue({
    tasks: [
      { status: "DONE", description: "HELLo" },
      { status: "DONE", description: "HELLO1" },
      { status: "PENDING", description: "HELLO1" },
    ],
  }),
  create: jest
    .fn()
    .mockReturnValue({ status: "PENDING", description: "HELLO1" }),
};

const app = express();
app.use(express.json());

app.use(
  "/task",
  async (req, res, next) => {
    req.taskRepository = mockTaskRepository;
    next();
  },
  taskRoute
);

describe("Task Route", () => {
  test("GET /task/:status response", async () => {
    const response = await request(app).get("/task/DONE?keyword=HELLO&size=5");
    expect(response.status).toBe(200);
    expect(response.body.tasks.length).toEqual(3);
  });

  test("POST /task create a new record", async () => {
    // Make a POST request to the router endpoint with data
    const response = await request(app)
      .post("/task")
      .send({ description: "Testing" });

    // Assert the response status code, body, or any other desired properties
    expect(response.status).toBe(201);
    expect(response.body.description).toEqual("HELLO1");
    expect(response.body.status).toEqual("PENDING");
  });
});
