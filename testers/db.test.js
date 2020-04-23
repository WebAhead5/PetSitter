const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const reserveCRUD = require("../src/queries/reserveCRUD");
const sittersCRUD = require("../src/queries/sittersCRUD");


tape("db tape is working", t => {
    t.equals(1, 1, "one equals one");
    t.end();
  });


  tape('first test', (t) => {
      runDbBuild(function(err, res) {
          reserveCRUD.readAll(function(err, res) {
            t.equals(res.rowCount, )
          })
          
      })
  })