const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error("ERROR:", error.message);
        next(error);
        
    }
};

export default asyncHandler;