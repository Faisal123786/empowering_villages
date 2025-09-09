// src/middlewares/rbac.middleware.js
import ApiError from "../utils/ApiError.js";

/**
 * Middleware to enforce role-based access control (RBAC).
 * Usage:
 *   router.post('/some-route', authMiddleware, rbacMiddleware(['Admin']), controllerFn);
 *
 * @param {string[]} roles - Array of roles allowed to access the route.
 */
export const rbacMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return next(new ApiError(401, "Unauthorized: No user context"));
      }

      const { role } = req.user;

      if (!roles.includes(role)) {
        return next(new ApiError(403, "Forbidden: You do not have access"));
      }

      next();
    } catch (err) {
      next(new ApiError(500, "RBAC middleware error"));
    }
  };
};
