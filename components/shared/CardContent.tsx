import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";


export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div
      {...props}
      className={cn(
        'flex w-full flex-col gap-3 rounded-xl border p-5 shadow',
        className
      )}
    />
  );