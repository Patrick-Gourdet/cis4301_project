/* Patrick Gourdet CIS4301
	User Profile Controller
	1/31/2018
*/

connectionInfo = require('../cred');
let oracledb = require('oracledb');
let bcrypt = require('bcrypt');
 let jwt = require('jsonwebtoken');
oracledb.outFormat = oracledb.ARRAY;
//GET ALL LISTED USERS
module.exports.usersGetAll = async function (req, res) {
  "use strict";
  oracledb.getConnection(connectionInfo,
    await function (err, connection) {
      if (err) {
        res.set('Content-Type', 'x-www-form-urlencoded');
        res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error connection to DB",
          details: err.message
        }));
        return;
      }
      connection.execute(
        `SELECT * FROM KS_USER`, {}, {
          outFormat: oracledb.ARRAY
        },
        // Outputs a oracledb object
        function (err, result) {
          if (err) {
            res.set('Content-Type', 'x-www-form-urlencoded');
            res.status(500).send(JSON.stringify({
              status: 500,
              message: "Error getting user profiles",
              details: err.message
            }));
            return;
          }
          else {
            res.contentType('x-www-form-urlencoded').status(200);
            res.send(JSON.stringify(result.rows));
          }
          connection.release((err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("GET/profiels : Connection Released");
            }
          })

        });
    });


};
//Authenticate User
module.exports.userAuth = function (req, res) {
  "use strict";
  console.log(req.body.PASSWORD);
  console.log(req.body.USER_ID);
  console.log(req.get('Content-Type'));
  if ("application/json" !== req.get('Content-Type')) {
    res.set('Content-Type', 'x-www-form-urlencoded').status(415).send(JSON.stringify({
      status: 415,
      message: "Wrong content type. Only x-www-form-urlencoded is supported",
      detailed_message: null,
    }));
    return;
  }//pot@go.com sdfghsdgsd
  oracledb.getConnection(connectionInfo,
    function (err, connection) {
      if (err) {
        res.set('Content-Type', 'json');
        res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error connection to DB",
          details: err.message
        }));
        return;
      }
      connection.execute("SELECT * FROM KS_USER WHERE USER_ID = :USER_ID", [req.body.USER_ID], {

          outFormat: oracledb.ARRAY
        }, function (err, result) {
        console.log(result.rows);
          if (err || result.rows.length < 1) {
            res.set('Content-Type', 'application/json');
            let status = err ? 500 : 404;
            res.status(status).send(JSON.stringify({
              status: status,
              message: err ? "ERROR GETING THE USER PROFILE" : "USER DOESNT EXIST",
              detailed_message: err ? err.message : ""
            }));
          } else if (!bcrypt.compareSync(req.body.PASSWORD,result.rows[0][1] )) {

            return res.status(401).json({
              title: 'Login failed',
              error: {message: 'Invalid login credentials'}
            });
          } else {
            let token = jwt.sign({USER_ID: req.body.USER_ID}, 'secret', {expiresIn: 7200});
            res.contentType('application/json').status(200).send(JSON.stringify({
                message: 'You are logged in',
                token: token,
                user_id: req.body.USER_ID
              })
            );
          }
          connection.release((err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("GET ONE USER/profiels : Connection Released");
            }
          })
        }
      )

    })
};
//Remove user
module.exports.userDelete = function (req, res) {
  "use strict";
  oracledb.getConnection(connectionInfo,
    function (err, connection) {


    })
};
//Edit user details
module.exports.userEdit = function (req, res) {
  "use strict";
  if ("application/json" !== req.get('Content-Type')) {
    res.set('Content-Type', 'application/json').status(415).send(JSON.stringify({
      status: 415,
      message: "Wong content-type . Only applicaton/json is supported",
      detailed_message: null,
    }));
    return;
  }
  oracledb.getConnection(connectionInfo,
    function (err, connection) {


    })
};
//Register New User
module.exports.userRegister = async function (req, res) {

  req.body.PASSWORD = bcrypt.hashSync(req.body.PASSWORD, 10);
  console.log(req.body.PASSWORD);
  console.log(req.get('Content-Type'));
  "use strict";
  if ("application/x-www-form-urlencoded" !== req.get('Content-Type')) {
    res.set('Content-Type', 'application/json').status(415).send(JSON.stringify({
      status: 415,
      message: "Wrong content type. Only application/json is supported",
      detailed_message: null,
    }));
    return;
  }
  oracledb.getConnection(connectionInfo,
    await function (err, connection) {
      if (err) {
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error connection to DB",
          details: err.message
        }));
        return;
      }
      connection.execute("INSERT INTO KS_USER VALUES " + "(:USER_ID,:PASSWORD, :COUNTRY," +
        ":FNAME,:LNAME)", [req.body.USER_ID, req.body.PASSWORD, req.body.COUNTRY,
          req.body.FNAME, req.body.LNAME], {
          autoCommit: true,
          outputFormat: oracledb.ARRAY
        },
        function (err, result) {
          if (err) {
            res.set('Content-Type', 'applicaton/json');
            res.status(400).send(JSON.stringify({
              status: 400,
              message: err.message.indexOf("ORA-00001") > -1 ? "user already exists" : "Input ERROR",
              detailed_message: err.message
            }));
          } else {
            res.status(201).set('Location', '#/user_profile/' + req.body.USER_ID).end();
          }
          connection.release((err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("CREATE USER /profiels : Connection Released");
            }
          })
        })

    })
};
