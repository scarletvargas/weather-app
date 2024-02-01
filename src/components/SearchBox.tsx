import { SearchIcon } from "@/icons";
import { cn } from "@/utils/cn";

interface Props {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const SearchBox = ({ value, onChange, onSubmit, className }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex items-center justify-center h-10", className)}
    >
      <input
        type="text"
        placeholder="Search location..."
        onChange={onChange}
        value={value}
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
        <SearchIcon />
      </button>
    </form>
  );
};
