const express = require('express');
const SecureRouter = express.Router();

SecureRouter.use('/', (req, res, next) => {
    const userApiKey = req.header("authorization");
    if (!userApiKey || userApiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: "Unauthorized: Invalid API key" });
    }
    next();
}
)

module.exports = { SecureRouter };