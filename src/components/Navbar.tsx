import { CurrentLocationIcon, MapPinIcon, SunIcon } from "@/icons";
import { SearchBox } from "./SearchBox";

type Props = {};

export const Navbar = ({}: Props) => {
  return (
    <div className="shadow-sm sticky top-0 left-0 z-50">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <SunIcon
            width={30}
            height={30}
            className=" fill-yellow-300"
            strokeWidth={0}
          />
        </div>
        <div className="flex gap-2 items-center">
          <CurrentLocationIcon
            width={30}
            height={30}
            className="stroke-gray-400 hover:opacity-80 cursor-pointer"
          />
          <MapPinIcon width={30} height={30} />
          <p className="text-slate-900/80 text-sm">USA</p>
        <SearchBox />
        </div>
      </div>
    </div>
  );
};
