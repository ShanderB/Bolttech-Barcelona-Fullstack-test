import { errorHandler } from '../src/middleware/Error-handler';
import { Request, Response, NextFunction } from 'express';

describe('errorHandler middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it('should log the error and return a 500 status with a generic message in production', () => {
        process.env.NODE_ENV = 'production';
        const error = new Error('Test error');

        errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
        });
    });

    it('should log the error and return a 500 status with detailed error in development', () => {
        process.env.NODE_ENV = 'development';
        const error = new Error('Test error');

        errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Test error',
        });
    });

    it('should handle non-Error objects gracefully', () => {
        process.env.NODE_ENV = 'development';
        const error = 'String error';

        errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'String error',
        });
    });
});