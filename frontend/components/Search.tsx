import { BiSearch, BiCaretDown } from "react-icons/bi";
import { useState } from "react";
import DropDown from "./DropDown";
interface SearchProps {
  query: string;
  sortBy: string;
  orderBy: string;
  onSortByChange: (mySort: string) => void;
  onOrderByChange: (mySort: string) => void;
  onQueryChange: (mySort: string) => void;
}

const Search = ({
  query,
  onQueryChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}: SearchProps) => {
  let [toggleSort, setToggleSort] = useState(false);
  return (
    <div className="py-5">
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          type="text"
          name="query"
          id="query"
          value={query}
          maxLength={50}
          autoComplete="off"
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          className="block w-full rounded-md border-gray-300 py-2 pl-8 focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              type="button"
              onClick={() => setToggleSort(!toggleSort)}
              className="border-1 flex items-center justify-center px-4 py-2 text-sm hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sort By
              <div className="ml-2">
                <BiCaretDown />
              </div>
            </button>
            <DropDown
              toggle={toggleSort}
              sortBy={sortBy}
              onSortByChange={(mySort) => onSortByChange(mySort)}
              orderBy={orderBy}
              onOrderByChange={(mySort) => onOrderByChange(mySort)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
