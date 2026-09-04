export const ADMIN_COOKIE_NAME = "mm_admin_session";

export function isValidAdminSession(cookieValue) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  return Boolean(cookieValue) && cookieValue === secret;
}
