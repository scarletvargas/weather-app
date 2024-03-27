import { MapPinIcon, SearchIcon } from "@/icons";
import { cn } from "@/utils/cn";

interface Props {
  className?: string;
  value: string;
  location: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export const SearchBox = ({ value, onChange, onSubmit, className, location }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "w-full sm:w-fit gap-2 rounded-full text-gravel-950 dark:text-gravel-50 bg-gravel-200 dark:bg-gravel-700 group relative flex items-center overflow-hidden px-4 py-1",
        className
      )}
    >
      <MapPinIcon width={30} height={30} strokeWidth={1.5} />
      <input
        type="text"
        placeholder={location}
        onChange={onChange}
        value={value}
        className="transition-all group-hover:me-4 text-gravel-950 dark:text-gravel-50 bg-transparent px-4 py-2 w-[230px] focus:outline-none focus:border-none h-full"
      />

      <button className="absolute -end-full py-[9px] transition-all group-hover:end-4 focus:outline-none">
        <SearchIcon />
      </button>
    </form>
  );
};
