var express = require('express');
var router = express.Router();
const cityService = require("../services/cityService");
const { checkPopulation } = require("../middlewares/main.js");

/* List cities in the database */
router.get('/list', async function (req, res, next) {
    try {
        res.status(200).json(await cityService.get());
    } catch (err) {
        next(err);
    }
});

/* Save cities in the database */
router.post('/saveList', async function (req, res, next) {

    try {

        await cityService.insertMany(req.body.list);
        res.status(201).end();

    } catch (err) {
        next(err);
    }

});

/* Get cities with population above a given threshold */
router.get('/minPopulation/:threshold', checkPopulation, async function (req, res, next) {
    try {

        res.status(200).json(await cityService.get(req.params.threshold));

    } catch (err) {
        next(err);
    }
});

/* Get cities with a name like a given query param */
router.get('/nameContains', async function (req, res, next) {
    try {

        res.status(200).json(await cityService.get(0, req.query.name));

    } catch (err) {
        next(err)
    }

});

module.exports = router;