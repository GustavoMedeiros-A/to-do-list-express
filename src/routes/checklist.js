const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    console.log("passamos aqui")
    res.send();
})

module.exports = router;    