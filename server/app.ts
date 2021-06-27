export {}
const express = require('express');
const app = express();
const logger = require("./utils/logger")
const exceptionHandlers = require("./utils/exceptionHandlers")
const { userRouter } = require("./routers/userRouter")
const { groupRouter } = require("./routers/groupRouter")

app.use(express.json());

app.use((req, res, next) => {
    logger.info(`time: ${new Date().toISOString()}`)
    logger.info(`route: ${req.originalUrl}`)
    logger.info(`body params: ${JSON.stringify(req.body)}`)
    
    next();
});
app.use('/users', userRouter);
app.use('/groups', groupRouter);

exceptionHandlers();

app.use((err, req, res, next) => { 
    if (err.messages) {
        const { messages, status = 500 } = err
        next({ status, messages })
    }

    if (err && !err.error) {
        next({ status: err.status, err })
    }

    if (err && err.error) { 
        const { details } = err.error;
        const errorMessages = details.map(item => item.message)
    
        if (err.error.isJoi) {
            next({ status: 400, messages: errorMessages })
        } else {
            next({ status: err.error.status, messages: errorMessages });
        }
    }

});

app.use(({status = 500, messages = ["Internal Server Error"]}, req, res, next) => {
    res.status(status).json({"errorMessages": messages})
});

module.exports = {
    app
}