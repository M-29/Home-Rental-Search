import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import statusCodes from '../constTextKeys/constantKeys.js';
import textMessages from '../constTextKeys/constMessages.js';


dotenv.config();


function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    res.status(statusCodes.NOT_FOUND).send({ message: textMessages.authTextKeys.tokenNotFound });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.message === textMessages.authTextKeys.jwtExpired) {
          res.status(statusCodes.UNAUTHORIZED).send({ message: textMessages.authTextKeys.tokenExpired });
        }
        if (err.message === textMessages.authTextKeys.invalidSignature) {
          res.status(statusCodes.UNAUTHORIZED).send({ message: textMessages.authTextKeys.invalidToken });
        }
        res.status(statusCodes.UNAUTHORIZED).send({ message: err.message });
      }
      req.loggedUserId = user.id;
      
      next()
    })
  }
  catch (e) {
    console.log("error occur");
  }
}
export default authMiddleware;