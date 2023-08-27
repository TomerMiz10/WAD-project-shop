const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const env = require("custom-env").env();
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:63342',
    credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use("/book", require("./routes/bookRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/admin", require("./routes/adminRoute"));
app.use("/map", require("./routes/mapRoute"));
app.use("/cart", require("./routes/cartRoute"));


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        const port = process.env.PORT;
        app.listen(port, () => console.log('Server has started on port: ' + port));
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));



