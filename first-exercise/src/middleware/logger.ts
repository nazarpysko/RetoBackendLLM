import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  let responseBody: any;

  // Intercept res.send
  const originalSend = res.send;
  res.send = function (body?: any): Response {
    responseBody = body;
    return originalSend.call(this, body);
  };

  // Intercept res.json
  const originalJson = res.json;
  res.json = function (body?: any): Response {
    responseBody = body;
    return originalJson.call(this, body);
  };

  // Log request start
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Request started`);
  
  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any): Response {
    const duration = Date.now() - start;
    let bodyToLog = responseBody;
    if (typeof bodyToLog === 'object') {
      try {
        bodyToLog = JSON.stringify(bodyToLog);
      } catch {
        bodyToLog = '[Unserializable object]';
      }
    }
    if (bodyToLog && bodyToLog.length > 300) {
      bodyToLog = bodyToLog.slice(0, 300) + '... [truncated]';
    }
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms) | Response: ${bodyToLog}`);
    return originalEnd.call(this, chunk, encoding);
  };
  
  next();
}; 