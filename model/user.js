/*jshint esversion :  6 */

// @root/model/user.js

const userModel = function userModel(connection) {

  const create = function createUser(clbk, data) {
    const q = "INSERT INTO user (name, lastname, email) VALUES (?, ?, ?)";
    const payload = [data.name, data.lastname, data.email];

    connection.query(q, payload, (err, res, cols) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const remove = function deleteUser(clbk, ids) {
    // la clause SQL IN permet de chercher une valeur dans un tableau
    const q = "DELETE FROM user WHERE id IN (?)";

    connection.query(q, [ids], function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(res, null);
      return clbk(null, res);
    });
  };

  const update = function editUser(clbk, user) {
    const q = "UPDATE user SET name = ?, lastname = ?, email = ? WHERE id = ?";
    const payload = [user.name, user.lastname, user.email, user.id];
    connection.query(q, payload, function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const get = function getUser(clbk, id) {
    var sql;

    if (id && !isNaN(id)) {
      sql = "SELECT * FROM user WHERE id = ?";
    } else {
      sql = "SELECT * FROM user";
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

module.exports = userModel;
