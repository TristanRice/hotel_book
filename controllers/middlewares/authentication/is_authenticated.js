const url = require("url");
module.exports = (req, res, next) => {
    const next_page = url.parse(req.originalUrl).pathname;

    if (!req.session || !req.session.current_user)
        return res.redirect(`/login?not_logged_in=true&next_page=${next_page}`);

    next( );
}
