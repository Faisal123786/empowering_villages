import { redisClient } from "../config/redis.js";

export const cache = (key) => async (req, res, next) => {
  try {
    const data = await redisClient.get(key);
    if (data) {
      return res.json(JSON.parse(data));
    }
    res.sendResponse = res.json;
    res.json = (body) => {
      redisClient.setEx(key, 60, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  } catch (err) {
    next(err);
  }
};
