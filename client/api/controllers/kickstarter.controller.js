/* Patrick Gourdet CIS4301
	User Profile Controller
	1/31/2018
*/

connectionInfo = require('../cred');
let oracledb = require('oracledb');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
oracledb.outFormat = oracledb.ARRAY;


module.exports.KSprojects = async function (req, res) {
  "use strict";

  oracledb.getConnection(connectionInfo,
    await function (err, connection) {
      if (err) {
        res.set('Content-Type', 'json');
        res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error connection to DB",
          details: err.message
        }));
        return;
      }
      let offset1 = 0;
      let maxRows1 = 20;
      connection.execute(
        'SELECT * FROM PROJECT , FINANCED',
        {}, {
          outFormat: oracledb.ARRAY
        },
        // Outputs a ARRAY
        function (err, result) {
          if (err) {
            res.set('Content-Type', 'json');
            res.status(500).send({
              status: 500,
              message: "Error getting user profiles",
              details: err.message
            });
            return;
          }
          else {
            res.contentType('json').status(200);
            res.send(JSON.stringify(result.rows));
          }
          connection.release((err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("GET/PROFILES LIMIT 10 : Connection Released");
            }
          })

        });
    });


};

module.exports.maxBackers = async function (req, res) {
  "use strict";
  oracledb.getConnection(connectionInfo,
    await function (err, connection) {
      if (err) {
        res.set('Content-Type', 'json');
        res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error connection to DB",
          details: err.message
        }));
        return;
      }
      connection.execute(
        'SELECT p.* FROM PROJECT p, FINANCED f WHERE f.LAUNCH_DATE = p.LAUNCHDATE' +
        'AND f.END_DATE = p.END_DATE' +
        'AND p.Nr_Investors = (SELECT MAX(Nr_Investors) FROM FINANCED',
        {}, {
          outFormat: oracledb.ARRAY
        },
        // Outputs a ARRAY
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
            res.contentType('json').status(200);
            res.send(JSON.stringify(result.rows));
          }
          connection.release((err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("GET/MOST BACKERS : Connection Released");
            }
          })

        });
    });


};
