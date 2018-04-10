/* Patrick Gourdet CIS4301
	User Profile Controller
	1/31/2018
*/

connectionInfo = require('../cred');
let oracledb = require('oracledb');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
oracledb.outFormat = oracledb.ARRAY;
//GET ALL LISTED USERS
module.exports.usersGetAll =function(req,res){
"use strict"
oracledb.getConnection(connectionInfo,
  function(err, connection)
  {
    if (err) {
      res.set('Content-Type','application/json');
      res.status(500).send(JSON.stringify({
        status: 500,
        message: "Error connection to DB",
        details: err.message
      }));
      return;
    }
    connection.execute(
      `SELECT * FROM USERS`,{},{
        outFormat: oracledb.ARRAY
      },
      // Outputs a oracledb object
      function(err, result)
      {
        if (err) {
      res.set('Content-Type','application/json');
        res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error getting user profiles",
          details: err.message
        }));
          return;
      }
      else{
          res.contentType('application/json').status(200);
          res.send(JSON.stringify(result.rows));
        //The commented out is a basic way recomended is bu use of the getRow or getRows function call below
      }
      connection.release((err)=>{
        if(err){
          console.log(err.message);
        }else {
          console.log("GET/profiels : Connection Released");
        }
      })

      });
  });


};

module.exports.usersGetOne =function(req,res){
"use strict"

oracledb.getConnection(connectionInfo,
  function(err, connection)
  {
    if (err) {
      res.set('Content-Type','application/json');
      res.status(500).send(JSON.stringify({
        status: 500,
        message: "Error connection to DB",
        details: err.message
      }));
      return;
    }
    connection.execute("SELECT * FROM USERS WHERE USER_NAME = :USER_NAME",[req.params.USER_NAME],{
      outFormat: oracledb.ARRAY
      }, function (err, result){
        if(err || result.rows.lenth < 1){
          res.set('Content-Type', 'application/jason');
          let status = err ? 500 : 404;
          res.status(status).send(JSON.stringify({
            status: status,
            message: err ? "ERROR GETING THE USER PROFILE": "USER DOESNT EXIST",
            detailed_message: err ? err.message : ""
          }));
        }else {
          res.contentType('application/json').status(200).send(JSON.stringify(result.row));
        }
      connection.release((err)=>{
        if(err){
          console.log(err.message);
        }else {
          console.log("GET ONE USER/profiels : Connection Released");
        }
      })
      }

    )

    })
};

module.exports.userDelete =function(req,res){
"use strict"
oracledb.getConnection(connectionInfo,
  function(err, connection)
  {


    })
};

module.exports.userEdit =function(req,res){
"use strict"
  if("application/json" !== req.get('Content-Type')){
  res.set('Content-Type','application/json').status(415).send(JSON.stringify({
    status: 415,
    message: "Wong content-type . ONly applicaton/json is supported",
    detailed_message: null,
  }));
  return;
  }
oracledb.getConnection(connectionInfo,
  function(err, connection)
  {


    })
};
module.exports.userRegister =function(req,res){
"use strict"
  if("application/json" !== req.get('Content-Type')){
  res.set('Content-Type','application/json').status(415).send(JSON.stringify({
    status: 415,
    message: "Wrong content type. Only application/jason is supported",
    detailed_message: null,
  }));
  return;
  }
oracledb.getConnection(connectionInfo,
  function(err, connection)
  {


    })
};
