const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { connectDatabase } = require("./app/db");
const shortlinkRoutes = require("./app/routes/short.route");
const { getShortUrl } = require("./app/controller/short.controller");

const PORT = process.env.PORT || 3000;
const { SHORTLY_DOMAIN } = process.env;
console.log("white listing", SHORTLY_DOMAIN);
const whitelist = [SHORTLY_DOMAIN];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
const app = express();

app.use(cors(corsOptions));

app.get("/_healthz", async (req, res) => {
  try {
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ status: "Error", message: error });
  }
});
connectDatabase();
app.use(express.json());
app.use("/api", shortlinkRoutes);
app.get("/:shortId", getShortUrl);

app.listen(PORT, () => {
  console.log("Server running on port :" + PORT);
});
