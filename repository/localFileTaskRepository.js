const fs = require("fs");

const FILE_NAME = "json_data.json";
const ENCODING = "utf8";
const DEFAULT_OBJECT = {
  tasks: [],
};

module.exports = class LocalFiileTaskRepository {
  constructor() {
    // check local file
    if (!fs.existsSync(FILE_NAME)) {
      console.log(
        "data file not exist, application will attempt to create a default file"
      );
      fs.writeFile(FILE_NAME, JSON.stringify(DEFAULT_OBJECT), ENCODING, () =>
        console.log("file created")
      );
    }
  }

  async create(task) {
    const data = await this.readFile();
    const nextTaskId = data.tasks.length + 1;
    const toCreateTask = { ...task, id: nextTaskId };
    data.tasks = [...data.tasks, toCreateTask];
    await this.writeFile(data);
    return toCreateTask;
  }

  async deleteAll() {
    await this.writeFile(DEFAULT_OBJECT);
  }

  async getAll(status, { keyword, size, sort = "DESC" }) {
    const data = await this.readFile();
    let filteredTasks = data.tasks
      .filter((task) => task.description.includes(keyword))
      .filter((task) => task.status === status);

    if (sort === "DESC") {
      filteredTasks = filteredTasks.sort((t1, t2) => t2.id - t1.id);
    }
    // prepare response
    let result;
    if (size == -1) {
      // return all records
      result = filteredTasks;
    } else {
      // return only certain size
      result = filteredTasks.splice(0, size);
    }

    const response = {
      tasks: result,
      totalElement: filteredTasks.length,
    };
    return response;
  }

  async update(taskId, toUpdateTask) {
    const data = await this.readFile();
    const index = data.tasks.findIndex((task) => task.id == taskId);

    // if taskId is not existed
    if (index === -1) {
      throw { message: `Task ID: ${taskId} not existed` };
    }

    // insert new data
    data.tasks[index] = {
      ...toUpdateTask,
      id: taskId,
    };

    await this.writeFile(data);
    return data.tasks[index];
  }

  async readFile() {
    const data = await fs.promises.readFile(FILE_NAME, ENCODING);
    console.debug("successfully read file");
    return JSON.parse(data);
  }

  async writeFile(tasks) {
    await fs.promises.writeFile(FILE_NAME, JSON.stringify(tasks));
    console.debug("sucessully write to file");
  }
};
