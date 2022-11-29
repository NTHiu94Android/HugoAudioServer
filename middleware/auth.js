const jwt = require("jsonwebtoken");

exports.checkToken = function (request, response, next) {
  let token = null;
  if (
    request.headers.authorization &&
    request.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    token = request.headers.authorization.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
      if (error) {
        response.json({ status: false });
      } else {
        console.log(decoded);
        request.user = decoded;
        next();
      }
    });
  } else {
    response.json({ status: false });
  }
};
