const jwt = require("jsonwebtoken");
const middleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decode = jwt.verify(token, process.env.JWT_PASSWORD);
        if (!decode) {
            return res.status(400).json({
                status: false,
                message: "Token expired!"
            })
        }
        req.users = {
            id: decode.id,
            fullName: decode.fullName
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Token expired!"
        })
    }
}

module.exports = middleware;