const bcrypt = require("bcrypt");
const User = require("../models/user");

//salt rounds - amount of times encrypted
const saltRounds = 10;

async function hashPassword(req, res, next) {
    try {
        if (!req.body.password) {
            res.status(500).json({
                message : "password missing"
            })
            return;
        }
        // --- plain text password
        // var plainTextPassword = req.body.password
        // --- hash into salt rounds
        // var hashedPassword = await bcrypt(req.body.password, saltRounds)
        // --- reassign it
        // req.body.password = hashedPassword
        // --- OR ...
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        next();
       
    } catch (error) {
        res.status(500).json({
            errormessage : error.message
        })
        console.log(error)
    }
}

//FUNCTION TO COMPARE THE PASSWORD
async function comparePassword(req, res, next) {
    try {
        //email from request to find the user details from the db
        const user = await User.findOne({
            where : {
                email : req.body.email
            }
        })
        // if not on db
        if (!user) {
            res.status(500).json({
                message : "username or password do not match"
            })
            return;
        }
        // if on db, compare password
        const response = await bcrypt.compare(req.body.password, user.password);
            if (!response) {
                res.status(500).json({
                    message : "username or password do not match"
                })
                return;
            }
        // if password matches:
            req.user = user;
            next();

    } catch (error) {
        res.status(500).json({
            errormessage : error.message
        })
        console.log(error)
    }
}

module.exports = {
    hashPassword,
    comparePassword
}