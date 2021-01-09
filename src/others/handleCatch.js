const { StatusCodes } = require('http-status-codes');


const handleCatch = (res, ex) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Error. Reason: ", ex.message);
}

module.exports = handleCatch;