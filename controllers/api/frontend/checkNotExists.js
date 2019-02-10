const express = require("express")
    , User    = require("../../../models/user")
    , Hotel   = require("../../../models/hotel")
	, router  = express.Router( );

/*
This is used in the register screen so that if they enter a username, I can
immediately check if it exists.
*/

const models = {
    "user": User,
    "hotel": Hotel,
};

router.post("/checkAvailable", (req, res) => {
    //first, get the key nad values that the user is trying to enter
    const value  = req.body.value;
    const item   = req.body.item;
    const model  = req.body.model;

    //make sure that if anything is defined we send back an error
    if (!(item || value || model || models[model]))
        return res.json({error: "errror"});

    //I have to do this becausse variables can't be used as keys.
    json = {}; json[item] = value;

    //now we find a docuemnt that mathces the data that the user entered
    models[model].find(json, (err, User) => {
        //if there is no user returned, we send back that that is taken.
        if (User && User.length)
            return res.json({"taken": true});

        //finally, if no user is found, we send back that the item isn't taken
        return res.json({"taken": false});
    });
});

module.exports = router;
