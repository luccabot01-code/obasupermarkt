/**
 * Geçici panel kullanıcısı — Supabase Auth bağlandığında kaldırılacak.
 */
export const DEMO_ADMIN_USERNAME = "obasupermarkt";
export const DEMO_ADMIN_PASSWORD = "123456789";

export function validateDemoAdminCredentials(username: string, password: string): boolean {
  const u = username.trim().toLowerCase();
  return u === DEMO_ADMIN_USERNAME.toLowerCase() && password === DEMO_ADMIN_PASSWORD;
}

export const ADMIN_SESSION_COOKIE = "oba_admin_session";
/** Oturum açık cookie değeri (demo). */
export const ADMIN_SESSION_VALUE = "1";
