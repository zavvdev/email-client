import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/domain/auth/session";
import { DEFAULT_LOCALE, LOCALES } from "@/app/i18n/config";
import { appUrl, isAuthRoute } from "@/app/routes";
import { getLangFromPathname } from "./app/i18n/utils";

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
    },
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lang = getLangFromPathname(pathname);

  try {
    // Session

    const session = await getSession();

    if (isAuthRoute(pathname) && session) {
      return NextResponse.redirect(appUrl("/emails", lang));
    }

    if (!isAuthRoute(pathname) && !session) {
      throw new Error("Unauthorized");
    }

    // I18n

    const pathnameHasLocale = Object.values(LOCALES).some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (pathnameHasLocale) {
      return;
    }

    request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
  } catch {
    return NextResponse.redirect(appUrl("/", lang));
  }
}
