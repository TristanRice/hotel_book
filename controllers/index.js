const express     = require("express")
    , error_pages = require("./helpers/errors/error_pages.js")
    , auth        = require("./auth")
    , api         = require("./api")
    , profiles    = require("./profiles")
    , router      = express.Router( );

router.get("/", (req, res) => {
    res.render("main/index");
});

router.use("/", auth);
router.use("/", profiles)
router.use("/api", api);

//at this point, if the page hasn't be rendered above, we will send a 404 error
router.get("*", (req, res) => {
    return error_pages.page_404(req, res);
});

router.post("*", (req, res) => {
    return error_pages.page_404(req, res);
});

module.exports = router;
