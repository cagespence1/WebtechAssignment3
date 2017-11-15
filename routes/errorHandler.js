var errorHandler = function (err, req, res, next) {
    if (err){
        res
            .status(err.status || 500)
            .json({
            message : err.message
        })
    }
};

module.exports = errorHandler;
