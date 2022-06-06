const jwt = require('jsonwebtoken');
const jwt_secret = "u02l5qo4we3fzvnt";

module.exports = {
    jwt_secret: jwt_secret,
    checkToken: (req, res, next) => {

        if (req.headers["authorization"]) {

            const decoded = jwt.verify(req.headers["authorization"].split(" ").pop(), jwt_secret);
            req.user = decoded._id;

            next();
        } else 
            next(new Error("No \"authorization\" header found"));
    },
    checkPopulation: (req, res, next) => {
        try {

            req.threshold = parseInt(req.params.threshold);

            if (isNaN(req.threshold))
                res.status(400).send("Bad threshold provided");
            else next();

        } catch (err) {

            next(err);

        }
    }
}