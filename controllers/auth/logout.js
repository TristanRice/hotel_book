const express = require("express")
	, router  = express.Router( );

router.get("/", (req, res) => {
	req.session.destroy( );

	return res.render("/");
});

module.exports = router;