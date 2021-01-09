const { StatusCodes } = require('http-status-codes')


const authorization = (req, res, next) => {
    const { isAdmin } = req.user;
    if (!isAdmin) return res.status(StatusCodes.FORBIDDEN).send("User is not admin, can't Permitted");
    next();
}

module.exports = authorization;