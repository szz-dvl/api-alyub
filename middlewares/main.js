const jwt = require('jsonwebtoken');
const jwt_secret = "u02l5qo4we3fzvnt";

module.exports = {
    jwt_secret: jwt_secret,
    checkToken: (req, res, next) => {

        if (req.headers["authorization"]) {

            try {
                
                const decoded = jwt.verify(req.headers["authorization"].split(" ").pop(), jwt_secret);
                req.user = decoded._id;

                if (decoded.exp) {

                    /** La propia libreria ya se encarga de esto, no debiera hacer falta */

                    const diff = decoded.exp - Date.now();

                    if (diff < 0)
                        res.status(401).send("Expired token");
                }

                next();

            } catch (err) {
                res.status(401).send("Bad token");
            }

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