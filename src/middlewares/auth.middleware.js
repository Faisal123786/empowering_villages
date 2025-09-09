import { verifyToken } from "../utils/crypto.js";
import { errorResponse } from "../utils/response.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return errorResponse(res, 'Not Token Provided' , 401);

    const decoded = verifyToken(token);
     req.user = decoded;
    next();
  } catch (err) {
   errorResponse(res, 'Invalid Token' , 401);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 'Access Denied' , 403);
    }
    next();
  };
};
