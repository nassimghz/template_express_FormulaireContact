/* jshint esversion : 6 */

// @root/api/user.js

const userAPi = function userAPi(connection) {

  const router = require("express").Router();
  const userModel = require("./../model/user")(connection);

  router.post('/user', (req, res) => {
    userModel.create((err, dataset) => {
      res.send(dataset);
    }, req.body); // post datas ici ...
  });

  router.get('/user/:id', (req, res) => {
    userModel.get((err, dataset) => {
      res.send(dataset[0]);
    }, req.params.id);
  });

  router.get('/user', (req, res) => {
    userModel.get( (err, dataset) => {
      res.send(dataset);
    }, null);
  });

  router.delete('/user', (req, res) => {
    userModel.remove((err, dataset) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(dataset);
    }, req.body.ids); // tableau d'ids ici ...
  });

  router.patch('/user', (req, res) => {
    userModel.update((err, dataset) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(dataset);
    }, req.body); // un tableau d'ids ici ...
  });

  return router;
};

module.exports = userAPi;
