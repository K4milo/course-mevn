const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const history = require("connect-history-api-fallback");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Connect to database
const mongoose = require("mongoose");

// Environment
const uri = "mongodb://localhost:27017/mevn";
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, options).then(
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    () => {
        console.log("Connected to db");
    },
    /** handle initial connection error */
    err => {
        console.log(err);
    }
);

// Set request config
app.use('/api', require('./routes/note'));

app.use(history());
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
    console.log("listening " + app.get("port"));
});