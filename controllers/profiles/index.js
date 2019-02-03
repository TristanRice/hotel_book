const express = require("express")
	, routes_user = require("./user")
	, routes_profile = require("./profile")
	, router  = express.Router( );


router.use("/user", routes_user);
router.use("/profile", routes_profile);

module.exports = router;
