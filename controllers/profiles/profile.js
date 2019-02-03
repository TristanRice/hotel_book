const express = require("express")
	, is_authenticated = require("../middlewares/authentication/is_authenticated")
	, router  = express.Router( );

router.use(is_authenticated);

router.get("/", (req, res) => {
	return res.render("main/profile");
});

router.post("/", (req, res) => {

});

module.exports = router;
