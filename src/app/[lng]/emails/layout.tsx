import { PropsWithChildren } from "react";

export default async function EmailsLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen flex justify-center align-middle">{children}</div>
  );
}
