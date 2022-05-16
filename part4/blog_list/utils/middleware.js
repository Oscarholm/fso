const req = require("express/lib/request");
const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "Unauthorized",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "TypeError") {
    return response.status(400).send({ error: "unknown id" });
  }
  logger.error(error.message);
  next(error);
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    req.token = token;
    return next();
  }
  req.token = null;
  return next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();
  } catch (exception) {
    next(exception);
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
