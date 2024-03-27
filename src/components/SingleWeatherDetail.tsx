export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

export function SingleWeatherDetail({ information, icon, value }: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-start items-start text-xs min-w-32 gap-1">
      <div className="stroke-black flex items-end gap-x-1">
        {icon}
        <p className="text-sm/3 whitespace-nowrap uppercase">{information}</p>
      </div>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
