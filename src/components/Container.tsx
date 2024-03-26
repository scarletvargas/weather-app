import { cn } from "@/utils/cn";

export const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full text-sienna-50 bg-gravel-700/80 dark:bg-[#2f2f31] rounded-xl flex py-4 shadow-sm",
        props.className
      )}
    />
  );
};
