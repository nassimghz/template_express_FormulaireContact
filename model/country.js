/* jshint esversion : 6 */

// @root/model/country.js

const countryModel = function countryModel(connection) {

  const create = function createCountry(clbk, data) {
    const q = "INSERT INTO country (name, lastname, email) VALUES (?, ?, ?)";
    const payload = [data.name, data.lastname, data.email];

    connection.query(q, payload, (err, res, cols) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const remove = function deleteCountry(clbk, ids) {

    const q = "DELETE FROM country WHERE id IN (?)";

    connection.query(q, [ids], function (err, res, fields) {
      // console.log(this.sql);
      if (err) return clbk(res, null);
      return clbk(null, res);
    });
  };

  const update = function editCountry(clbk, payload) {
    const q = "UPDATE country SET name = ?, lastname = ?, email = ? WHERE id = ?";
    const queryData = [payload.name, payload.lastname, payload.email, payload.id];
    console.log(q);
    console.log(queryData);
    // connection.query(q, payload, function (err, res, fields) {
    //   // console.log(this.sql);
    //   if (err) return clbk(err, null);
    //   return clbk(null, res);
    // });
  };

  const get = function getCountry(clbk, id) {
    var sql;

    if (id) {
      sql = "SELECT * FROM country WHERE id = ?";
    } else {
      sql = "SELECT * FROM country";
    }

    connection.query(sql, [id], (error, results, fields) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (error) return clbk(error, null);
      return clbk(null, results);
    });
  };

  return {
    create,
    remove,
    update,
    get
  };
};

module.exports = countryModel;
