import { errorHandler } from '../src/middleware/Error-handler';
import { Request, Response, NextFunction } from 'express';

describe('errorHandler middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;
    let consoleErrorSpy: jest.SpyInstance;

    const setNodeEnv = (env: string) => {
        Object.defineProperty(process, 'env', {
            value: { ...process.env, NODE_ENV: env },
            writable: true,
        });
    };

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();

        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should return generic error message in production', () => {
        setNodeEnv('production');
        const error = new Error('Test error');

        errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
        });
    });

    it('should return detailed error in development', () => {
        setNodeEnv('development');
        const error = new Error('Test error');

        errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Test error',
        });
    });

    it('should handle non-Error objects gracefully', () => {
        setNodeEnv('development');
        const error = 'String error';

        errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'String error',
        });
    });
});
