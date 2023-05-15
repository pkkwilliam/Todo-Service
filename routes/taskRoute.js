const express = require("express");
const Task = require("../model/task");
const fs = require("fs");

const Router = express.Router();

const TASK_STATUS_DONE = "DONE";
const TASK_STATUS_PENDING = "PENDING";

// GET
Router.get("/:status", async (req, res) => {
  const status = req.params.status;
  const keyword = req.query.keyword;
  const size = req.query.size;
  console.debug("attempt to get all tasks");
  try {
    const response = await req.taskRepository.getAll(status, {
      keyword: keyword ? keyword : "",
      size: size ? size : -1,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// POST
Router.post("/", async (req, res) => {
  console.log("attempt to create a new task");
  const task = req.body;
  if (!task) {
    res.status(400).json({ message: "Invalid Request Body" });
    return;
  }

  // set default values
  task.createTime = new Date();
  task.status = TASK_STATUS_PENDING;

  try {
    const response = await req.taskRepository.create(task);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// POST
Router.put("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const task = req.body;
  if (!taskId) {
    res.status(400).json({ message: "Invalid Task ID" });
    return;
  }
  if (!task) {
    res.status(400).json({ message: "Invalid Request Body" });
    return;
  }
  if (!task.status) {
    res.status(400).json({ message: "Invalid Task Status" });
    return;
  }
  if (task.status === TASK_STATUS_DONE) {
    task.completeTime = new Date();
  }
  console.debug("attempt to update id: ", taskId);
  try {
    const response = await req.taskRepository.update(taskId, task);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// DELETE
Router.delete("/all", async (req, res) => {
  console.debug("attempt to delete all task");
  try {
    await req.taskRepository.deleteAll();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = Router;
