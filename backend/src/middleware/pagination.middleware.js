import ApiError from "../utils/ApiError.js";

const paginationMiddleware = (defaultLimit = 10) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || defaultLimit;
      
      if (page < 1) {
        return next(new ApiError(400, "Page must be greater than 0"));
      }
      
      if (limit < 1 || limit > 100) {
        return next(new ApiError(400, "Limit must be between 1 and 100"));
      }

      req.pagination = {
        page,
        limit,
        skip: (page - 1) * limit
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default paginationMiddleware;

