const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function subAdminVerify(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: 'Failed', data:"none" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
        console.log(err)
      return res.status(401).json({ message: 'Failed' });
    }
    if(decoded.role == 'admin' || decoded.role == 'super') {
      next();
    }
    else {
      return res.status(401).json({ message: "You don't have super admin permission." });
    }
  });
}


module.exports = subAdminVerify;