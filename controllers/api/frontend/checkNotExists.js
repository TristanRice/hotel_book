const express = require("express")
    , user    = require("../../../models/user")
	, router  = express.Router( );

router.post("/checkusername", (req, res) => {
    if (!req.body.username)
        return res.json({
            "error": "Not enough data sent"
        });

	user.findOne({username: req.body.usrname}, (err, User) => {
		if (User && User.length)
			return res.json({ "taken" : true })
	})
	return res.json({ "taken" : false });
});

router.post("/checkEmail", (req, res) => {

})

module.exports = router;
