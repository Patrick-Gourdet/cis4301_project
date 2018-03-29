/* Patrick Gourdet CIS4301
	User Profile Controller
	1/31/2018
*/

connectionInfo = require('../cred');
var oracledb = require('oracledb');

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
        outFormat: oracledb.OBJECT
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
          console.log("GET /profiels : Connection Released");
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
    if(err){

    }

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
oracledb.getConnection(connectionInfo,
  function(err, connection)
  {


    })
};
module.exports.userRegister =function(req,res){
"use strict"
oracledb.getConnection(connectionInfo,
  function(err, connection)
  {


    })
};
