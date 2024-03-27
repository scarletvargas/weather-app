interface SuggestionsBoxProps {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}

export function SuggestionsBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: SuggestionsBoxProps) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2">
          {error && suggestions.length < 1 && <li className="text-sienna-500 p-1">{error}</li>}
          {suggestions?.map((item, index) => (
            <li
              onClick={() => handleSuggestionClick(item)}
              key={index}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
