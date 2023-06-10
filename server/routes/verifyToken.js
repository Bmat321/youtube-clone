import { createError } from "./err.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Invalid Token"));
    req.user = user;
    next();
  });
};

//  const jwt = require("jsonwebtoken");

// const verify = (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, process.env.SECRETE_KEY, (err, user) => {
//       if (err) {
//         return res.status(403).json("Invalid token");
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json("You are not authenticated");
//   }
// };

// module.exports = verify;
