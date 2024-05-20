import { Logger } from '@nestjs/common';

export function extractError(error: any): string | null {
  if (typeof error === 'string') return error;
  if (Array.isArray(error)) return error.length > 0 ? error[0] : null;
  if (error instanceof Error) return error.message;
  if (typeof error === 'object') {
    const errorMessage = error.message || (error.error && error.error.message);
    if (errorMessage) return errorMessage;
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return error.toString?.();
  }
  return error?.toString?.() || null;
}

export function logError(error: any) {
  const errorMessage = extractError(error);
  let filePath = null;

  try {
    const stackLines = error.stack.split('\n');
    const firstLine = stackLines[1];
    filePath = firstLine.substring(firstLine.lastIndexOf('(') + 1, firstLine.lastIndexOf(':'));
  } catch (e) {
    console.log('Error occurred while processing stack trace:', extractError(e));
  }

  Logger.error({
    error: errorMessage,
    stack: filePath,
  });
}
