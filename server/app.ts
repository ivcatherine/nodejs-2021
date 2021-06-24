export {}
const express = require('express');
const app = express();
const { userRouter } = require("./routers/userRouter")
const { groupRouter } = require("./routers/groupRouter")

app.use(express.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((err, req, res, next) => {
    const { details } = err.error;
    
    const errorMessages = details.map(item => item.message)
    res.status(500).json({"errors": errorMessages})
});

module.exports = {
    app
}