const errorMiddleware = async (err, req, res, next) => {
    try {
        let error = { ...err }

        error.message = err.message;

        console.error(error);

        //Mongoose bad ObjectID
        if (err.name === 'CastError') {
            const message = 'Resource not found';

            error = new Error(message);
            error.statusCode=404;
        }

        //Mongoose Duplicate Key
        if (err.code === 11000) {
            const error = new Error('Duplicate field value entered');
            error.statusCode=400;
            throw error;
        }

        //Mongoose validation error
        if (err.name === 'Validation Error') {
            const message = Object.values(err.errors).map(val => val.message);
            error.statusCode=400;
        }

        res.status(error.statusCode || 500).json({
            success:false,
            error: error.message || 'Server Error'
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;