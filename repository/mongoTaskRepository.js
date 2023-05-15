module.exports = class MongoFiileTaskRepository {
  constructor() {
    // const MONGO_DB_URL =
    //   "mongodb+srv://{username}:{password}@{dbname+address}/?retryWrites=true&w=majority";

    // DB
    // mongoose.connect(MONGO_DB_URL);
    // const mongo = mongoose.connection;
    // mongo.on("error", (error) => console.warn("Mongo Connection Error:", error));
    // mongo.once("open", () => console.log("Connected to MongoDB"));
    throw { message: this.generateErrorMessage() };
  }

  async create(task) {
    throw { message: this.generateErrorMessage() };
  }

  async deleteAll() {
    throw { message: this.generateErrorMessage() };
  }

  async getAll(status, { keyword, size, sort = "DESC" }) {
    throw { message: this.generateErrorMessage() };
  }

  async update(taskId, toUpdateTask) {
    throw { message: this.generateErrorMessage() };
  }

  generateErrorMessage() {
    return "Needed Mongo Implementation! Please use LocalFileTaskRepository";
  }
};
