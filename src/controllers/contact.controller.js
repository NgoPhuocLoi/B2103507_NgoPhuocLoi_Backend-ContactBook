const contactController = {
  create: (req, res) => {
    res.json({ message: "create handler" });
  },
  findAll: (req, res) => {
    res.json({ message: "findAll handler" });
  },
  findOne: (req, res) => {
    res.json({ message: "findOne handler" });
  },
  update: (req, res) => {
    res.json({ message: "update handler" });
  },
  delete: (req, res) => {
    res.json({ message: "delete handler" });
  },
  deleteAll: (req, res) => {
    res.json({ message: "deleteAll handler" });
  },
  findAllFavorite: (req, res) => {
    res.json({ message: "findAllFavorite handler" });
  },
};

module.exports = contactController;
