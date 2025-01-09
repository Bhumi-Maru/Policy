const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const path = require("path");
const authRouter = require("./Routes/Auth");
const clientRoutes = require("./Routes/clientRoutes");
const policyRouter = require("./Routes/policyRoute");
const userCreationRouter = require("./Routes/userCreationRoute");
const agentRouter = require("./Routes/AgentRoutes");
const companyRouter = require("./Routes/CompanyRoutes");
const mainCategoryRouter = require("./Routes/mainCategoryRoute");
const subCategoryRouter = require("./Routes/subCategoryRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRouter);
app.use("/api", clientRoutes);
app.use("/api", policyRouter);
app.use("/api", userCreationRouter);
app.use("/api", agentRouter);
app.use("/api", companyRouter);
app.use("/api", mainCategoryRouter);
app.use("/api", subCategoryRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1 >");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
