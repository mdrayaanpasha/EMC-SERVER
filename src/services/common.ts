import { Response } from "express";

interface ApiSucess<T> {
    success: true,
    message: string;
    data: T;
    error: null;
}

interface ApiError {
    success: false;
    data: null;
    error: {
        code: HttpStatus;
        message: string;
    };
}

type ApiResponse<T> = ApiSucess<T> | ApiError;

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
    // Add any other status codes you need
}

export function sendResponse<T>(res: Response, statuscode: HttpStatus, body: ApiResponse<T>) {
    return res.status(statuscode).json(body);
}

export function sendErrorResponse(res: Response, status: number, message: string): void {
    sendResponse(res, status, {
        success: false,
        data: null,
        error: { code: status, message },
    });
};