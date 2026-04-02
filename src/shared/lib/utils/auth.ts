import { AUTH_ROUTE_PATHS, PROTECTED_ROUTE_PREFIXES } from "@/shared/constants";

const authPathSet = new Set(AUTH_ROUTE_PATHS);

export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1) || "/";
  }
  return pathname;
}

export function isAuthRoute(pathname: string): boolean {
  return authPathSet.has(normalizePathname(pathname));
}

export function isProtectedRoute(pathname: string): boolean {
  const p = normalizePathname(pathname);
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => p === prefix || p.startsWith(`${prefix}/`),
  );
}
