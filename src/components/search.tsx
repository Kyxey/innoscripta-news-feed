import type { KeyboardEventHandler } from "react";
import Icon from "components/icon";
import { Tooltip } from "react-tooltip";

type Props = {
  searchQuery: string;
  searchQueryOnChange: (searchQuery: string) => void;
  handleSearchQuerySubmit: KeyboardEventHandler<HTMLInputElement>;
};

function Search({
  searchQuery,
  searchQueryOnChange,
  handleSearchQuerySubmit,
}: Props) {
  return (
    <div className="relative text-gray-400 w-3/4 lg:w-1/3 h-fit py-4">
      <Tooltip
        id="search-bar"
        openEvents={{
          mouseenter: true,
          focus: true,
          click: true,
          dblclick: true,
          mousedown: true,
        }}
        closeEvents={{
          blur: true,
          click: false,
          dblclick: false,
          mouseleave: false,
          mouseup: false,
        }}
      />
      <div className="absolute ml-2 h-full w-7 flex justify-center top-0">
        <Icon type="Search" />
      </div>
      <input
        className="w-full bg-white text-left pl-11 p-2 text-gray-600 border border-gray-400"
        type="text"
        value={searchQuery}
        onChange={(el) => searchQueryOnChange(el.target.value)}
        onKeyUp={handleSearchQuerySubmit}
        placeholder="Search..."
        title="Press enter after typing to search."
        data-tooltip-id="search-bar"
        data-tooltip-content="Press enter after typing to search."
      />
    </div>
  );
}

export default Search;
