const jwt = require("jsonwebtoken");

const User = require("../models/User");

const middleware = () => {
    return (req, res, next) => {
        if (req.body.token) {
            jwt.verify(req.body.token, process.env.SECRET, async (err, decoded) => {
                if (err) return next();

                req.user = await User.findOne({ _id: decoded.id });
                next();
            });
        } else {
            return next();
        }
    };
};

module.exports = middleware;
