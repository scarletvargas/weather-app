import { LoaderIcon } from "@/icons";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <LoaderIcon className="animate-spin h-10 w-10" />
    </div>
  );
};
