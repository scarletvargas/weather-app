import { Svg } from "./svg";

export const SearchIcon = (props: PropsIcons) => {
  return (
    <Svg {...props}>
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </Svg>
  );
};
