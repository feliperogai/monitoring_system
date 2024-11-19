const statusModel = require('../models/statusModel');

// Rota para obter os status de recarga
const getStatus = (req, res) => {
  statusModel.getStatus((status) => {
    res.json(status);
  });
};

// Rota para adicionar um novo status de recarga
const addStatus = (req, res) => {
  const { nome, status, fonteEnergia, horaInicio } = req.body;
  statusModel.addStatus(nome, status, fonteEnergia, horaInicio, (newStatus) => {
    res.status(201).json(newStatus);
  });
};

module.exports = { getStatus, addStatus };