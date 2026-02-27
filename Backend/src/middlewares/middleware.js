import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized: Token missing"
            });
        }

        const token = authHeader.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = payload;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token"
        });
    }
};

export default auth;
