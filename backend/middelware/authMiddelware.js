const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    const token = authHeader.split(" ")[1];
    console.log(token)

   try {
        if (!token) {
            return res.status(401).send("Unauthorized request");
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decode;
        next();

    } catch (err) {
        return res.status(401).send("Unauthorized user");
    }
};

module.exports = authMiddleware;