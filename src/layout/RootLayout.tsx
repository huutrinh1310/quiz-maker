import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="w-[1180px] min-h-screen flex flex-col items-center justify-start gap-5 mt-5 mx-auto">
      <h1 className="text-center font-semibold text-2xl">QUIZ MAKER</h1>
      <div className="flex w-full gap-2">
        <Outlet />
      </div>
    </div>
  );
}
