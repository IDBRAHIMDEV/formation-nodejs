const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "mon premier titre",
        message: "salam les amis"
    });
})

module.exports = router;