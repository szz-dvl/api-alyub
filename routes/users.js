const express = require('express');
const router = express.Router();
const userService = require("../services/userService.js");
const jwt = require('jsonwebtoken');
const { jwt_secret, checkToken } = require("../middlewares/main.js");
const bcrypt = require('bcrypt');
const saltRounds = 15;

/* Register user in the system */
router.post('/register', async function (req, res, next) {

  try {

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 1);

    const created = await userService.insertOne(req.body);
    res.status(201).json({ token: jwt.sign({ _id: created._id, exp: expiration.getTime() }, jwt_secret) });

  } catch(err) {

    next(err);

  }

});

/* Updates a user in the system */
router.put('/editProfile/:id', checkToken, async function (req, res, next) {

  try {

    if (req.user === req.params.id) {
      
      /**
       * Esta es un poco rara Alyub, la comparación anterior no tiene demasiado sentido si la petición está autorizada, 
       * creo haber implementado bien lo del token, en cualquier caso el parámetro "id" es redundante aquí a no ser que 
       * lo que se pretenda es que cualquier usuario pueda modificar a cualquier otro usuario. Lo hablamos el miércoles 
       * si acaso.
       */

      let hash = null;

      if (req.body.password) 
        hash = await bcrypt.hash(req.body.password, saltRounds);
      
      await userService.updateOne(req.params.id, req.body.mail, hash);
      res.status(204).end();

    } else {
      
      res.status(403).send("Bad user provided");

    }

  } catch(err) {

    next(err);

  }
});

module.exports = router;
