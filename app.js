const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const history = require("connect-history-api-fallback");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(history());
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("listening 2000");
});
