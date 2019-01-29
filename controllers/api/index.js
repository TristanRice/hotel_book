const express = require("express")
    , frontend = require("./frontend")
	, router  = express.Router( );

router.use("/frontend", frontend)

module.exports = router;
