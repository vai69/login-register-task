const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
const mongodbutil = require('../../config/database');
// var mongoUtil = require('mongoUtil');
var UserRegistration = require('../../handler/DataBaseModel/UserSchema');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require('../../config/auth.config')
// var db = mongodbutil.getDb();

const login = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        // var db = mongodbutil.getDb();
        let data;
        try {
            UserRegistration.find({ email: req.body.email }, function (err, docs) {
                if (err) throw err;
                if (docs.length > 0) {
                    console.log(docs);
                    var passwordIsValid = bcrypt.compareSync(
                        req.body.password,
                        docs[0].password
                    );
                    if (!passwordIsValid) {
                        return res.status(203).send({
                            accessToken: null,
                            message: "Invalid Password! try again"
                        });
                    } else {
                        if(docs[0].verified == false){
                            res.status(403).send("Account is Not Verified");
                        }
                        var token = jwt.sign({ id: docs[0].id }, config.secret, {
                            expiresIn: 86400 // 24 hours
                        });
                        res.status(200).send({
                            id: docs[0].id,
                            fullName: docs[0].fullName,
                            mobileno: docs[0].mobileno,
                            email: docs[0].email,
                            roles: 'users',
                            firstTime:docs[0].firstTime,
                            accessToken: token
                        });
                    }

                } else {
                    res.status(203).send({ message: "Invalid Email Id or Invalid Role" });
                }
                // console.log("Hello");

            });
        } catch (err) {
            console.log('Error catched in login: ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.status(500).send({ message: "This error is from our side" });
        }
    })
}

module.exports.login = login;