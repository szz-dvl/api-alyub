const jwt = require('jsonwebtoken');
const jwt_secret = "u02l5qo4we3fzvnt";

module.exports = {
    jwt_secret: jwt_secret,
    checkToken: (req, res, next) => {

        if (req.headers["authorization"]) {

            const decoded = jwt.verify(req.headers["authorization"].split(" ").pop(), jwt_secret);
            req.user = decoded._id;

            if (decoded.exp) {
                
                const diff = decoded.exp - Date.now();
                
                if (diff < 0)
                    res.status(401).send("Expired token");
            }

            next();
        } else 
            next(new Error("No \"Authorization\" header found"));
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