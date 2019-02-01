const express   = require("express")
	, err_pages = require("../helpers/errors/error_pages")
	, mongoose  = require("mongoose")
	, router    = express.Router( );

router.get("/:userame", (req, res) => {
	const username = req.params.username;
	if (!username)
		return err_pages.page_404(req, res)

	mongoose.find({username: username}, (err, User) => {
		if (!User || !User.length)
			return err_pages.page_404(req, res)
	});
});