const express     = require("express")
    , error_pages = require("./helpers/errors/error_pages.js")
    , router      = express.Router( );

router.get("/", (req, res) => {
    res.render("index");
});

//at this point, if the page hasn't be rendered above, we will send a 404 error
router.get("*", (req, res) => {
    return error_pages.page_404(req, res);
});

router.post("*", (req, res) => {
    return error_pages.page_404(req, res);
});

module.exports = router;
