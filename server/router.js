const express = require('express')
const router = express.Router()

//route handler 
router.get('/', (req, res) => {
    res.send('server is up and running')
})

//export the router so we can use it in server/index.js
module.exports = router











