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

      connection.execute(
        'SELECT count(*) FROM KS_PROJECT',
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
module.exports.percentSFC = async function (req, res) {
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
        'select distinct ((select count(*) from ks_project where state = \'successful\')/(select count(*) from ks_project)) as Success_Percent,\n' +
        '((select count(*) from ks_project where state = \'failed\')/(select count(*) from ks_project))\n' +
        'as fail_percent,((select count(*) from ks_project where state = \'canceled\')/(select count(*) from ks_project))\n' +
        'as Canceled\n' +
        'from ks_project',
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
module.exports.overTime = async function (req, res) {
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
      "select distinct (select count(key) from ks_project where launched between to_date('01-jan-2009','dd-mon-yyyy') and \n" +
      "to_date('01-jan-2010','dd-mon-yyyy')) as A2009,(select count(key) from ks_project where launched between to_date('01-jan-2010','dd-mon-yyyy') and \n" +
      "to_date('01-jan-2011','dd-mon-yyyy'))as A2010,(select count(key) from ks_project where launched between to_date('01-jan-2011','dd-mon-yyyy') and \n" +
      "to_date('01-jan-2012','dd-mon-yyyy'))as A2011,(select count(key) from ks_project where launched between to_date('01-jan-2012','dd-mon-yyyy') and \n" +
      "to_date('01-jan-2013','dd-mon-yyyy')) as A2012,(select count(key) from ks_project where launched between to_date('01-jan-2013','dd-mon-yyyy') and \n" +
      "to_date('01-jan-2014','dd-mon-yyyy')) as A2013,(select count(key)from ks_project where launched between to_date('01-jan-2014','dd-mon-yyyy') and \n" +
      "to_date('01-jan-2015','dd-mon-yyyy')) as A2014,(select count(key) from ks_project where launched between to_date('01-jan-2015','dd-mon-yyyy') and \n" +
      "to_date('01-jan-2016','dd-mon-yyyy')) as A2015 from ks_project",
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

module.exports.sfcOvertime = async function (req, res) {
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
      "select distinct (select count(key) from ks_project where launched between to_date('01-jan-2009','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2010','dd-mon-yyyy')and  state = 'failed' ) as A2009,(select count(key) from ks_project where launched between to_date('01-jan-2010','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2011','dd-mon-yyyy')and  state = 'failed' )as A2010,(select count(key) from ks_project where launched between to_date('01-jan-2011','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2012','dd-mon-yyyy')and  state = 'failed' )as A2011,(select count(key) from ks_project where launched between to_date('01-jan-2012','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2013','dd-mon-yyyy')and  state = 'failed' ) as A2012,(select count(key) from ks_project where launched between to_date('01-jan-2013','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2014','dd-mon-yyyy')and  state = 'failed' ) as A2013,(select count(key)from ks_project where launched between to_date('01-jan-2014','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2015','dd-mon-yyyy')and  state = 'failed' ) as A2014,(select count(key) from ks_project where launched between to_date('01-jan-2015','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2016','dd-mon-yyyy')and  state = 'failed' ) as A2015,(select count(key) from ks_project where launched between to_date('01-jan-2009','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2010','dd-mon-yyyy')and  state = 'successful' ) as B2009,(select count(key) from ks_project where launched between to_date('01-jan-2010','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2011','dd-mon-yyyy')and  state = 'successful' )as B2010,(select count(key) from ks_project where launched between to_date('01-jan-2011','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2012','dd-mon-yyyy')and  state = 'successful' )as B2011,(select count(key) from ks_project where launched between to_date('01-jan-2012','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2013','dd-mon-yyyy')and  state = 'successful' ) as B2012,(select count(key) from ks_project where launched between to_date('01-jan-2013','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2014','dd-mon-yyyy')and  state = 'successful' ) as B2013,(select count(key)from ks_project where launched between to_date('01-jan-2014','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2015','dd-mon-yyyy')and  state = 'successful' ) as B2014,(select count(key) from ks_project where launched between to_date('01-jan-2015','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2016','dd-mon-yyyy')and  state = 'successful' ) as B2015,(select count(key) from ks_project where launched between to_date('01-jan-2009','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2010','dd-mon-yyyy')and  state = 'canceled' ) as C2009,(select count(key) from ks_project where launched between to_date('01-jan-2010','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2011','dd-mon-yyyy')and  state = 'canceled' )as C2010,(select count(key) from ks_project where launched between to_date('01-jan-2011','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2012','dd-mon-yyyy')and  state = 'canceled' )as C2011,(select count(key) from ks_project where launched between to_date('01-jan-2012','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2013','dd-mon-yyyy')and  state = 'canceled' ) as C2012,(select count(key) from ks_project where launched between to_date('01-jan-2013','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2014','dd-mon-yyyy')and  state = 'canceled' ) as C2013,(select count(key)from ks_project where launched between to_date('01-jan-2014','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2015','dd-mon-yyyy')and  state = 'canceled' ) as C2014,(select count(key) from ks_project where launched between to_date('01-jan-2015','dd-mon-yyyy') and \n" +
        "to_date('01-jan-2016','dd-mon-yyyy')and  state = 'canceled' ) as C2015 from ks_project",
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

module.exports.mostIncimeCat = async function (req, res) {
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
        "select distinct main_category, max(pleged) from ks_project group by main_category",
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
