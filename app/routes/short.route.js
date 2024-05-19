const express = require("express");
const { createShortLink, getTotalClicks } = require("../controller/short.controller");

const shortlinkRoutes = express.Router();

shortlinkRoutes.post("/short", createShortLink);
shortlinkRoutes.get("/detail/:shortId", getTotalClicks)

module.exports = shortlinkRoutes;

