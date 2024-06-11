import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/app/i18n/config";

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
    },
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = Object.values(LOCALES).some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}
