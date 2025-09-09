import argon2 from "argon2";
import jwt from "jsonwebtoken";

/**
 * Hash a plain password
 */
export const hashPassword = async (password) => {
  return argon2.hash(password);
};

/**
 * Compare plain password with hashed password
 */
export const comparePassword = async (hash, password) => {
  return argon2.verify(hash, password);
};

/**
 * Generate a JWT token
 */
export const generateToken = (payload, expiresIn = "1d") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT token
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
