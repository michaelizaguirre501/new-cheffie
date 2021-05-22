module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getCreateForm: (req, res) => {
    res.render("createItem.ejs");
  },
};
