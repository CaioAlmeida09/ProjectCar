import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="w-full md:px-3 md:py-2 px-2 py-1">{children}</div>;
}
