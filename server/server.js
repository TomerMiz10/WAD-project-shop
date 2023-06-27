const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const env = require("custom-env").env();


//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routing
app.use("/", require("./routes/bookRoute/getAllBooks"));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const port = process.env.PORT;
        app.listen(port, () => console.log('Server has started on port: ' + port));
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));