exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenicated: req.isLoggenIn
  });
};

exports.postLogin = (req, res, next) => {
  req.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect("/");
};
