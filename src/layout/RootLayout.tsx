import { pageTitle } from "@/utils";
import { Outlet, useLocation } from "react-router";

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="w-[1180px] min-h-screen flex flex-col items-center justify-start gap-5 pt-20 mx-auto">
      <h1 className="text-center font-semibold text-2xl">
        {pageTitle.find((item) => item.path === location.pathname)?.title}
      </h1>
      <div className="flex flex-col w-full gap-5">
        <Outlet />
      </div>
    </div>
  );
}
