import { Loader2 } from "lucide-react";

export function LoadingSpin(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90 z-50"
      {...props}
    >
      <Loader2 className="animate-spin " />
    </div>
  );
}
