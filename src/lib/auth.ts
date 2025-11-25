// src/lib/auth.ts
export function getUserFromRequest(req: Request): string | null {
  // For now, we'll get user from a custom header
  // In production, you should use proper JWT tokens or session cookies
  const userHeader = req.headers.get('x-user-id');
  return userHeader;
}