import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { DBConnection } from "./database/DBConfig.js";
import router from "./routes/route.js";

const PORT = 8000;
DBConnection();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
