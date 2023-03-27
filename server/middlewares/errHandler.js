async function errHandler(err, req, res, next) {
    let status = 500
    let message = 'Internal server error'

    switch (err.name) {
        case "Unauthenticated":
            status = 401;
            message = "Unauthenticated";
            break;

       case "JsonWebTokenError":
            status = 401;
            message = "Invalid token";
            break;

       case "NotFound":
            status = 404;
            message = "Data Not Found";
            break;
    
        default:
            break;
    }

    res.status(status).json({message})
}

module.exports = errHandler