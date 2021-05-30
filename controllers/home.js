module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getThankYou: (req, res) => {
    res.render("thankYou.ejs");
  },
};
