const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('<h3>Welcome to the Sample Express App.</h3>');
});

module.exports = router;