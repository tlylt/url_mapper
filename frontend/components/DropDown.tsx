import DropDownItem from "./DropDownItem";
interface DropDownProps {
  toggle: boolean;
  sortBy: string;
  orderBy: string;
  onSortByChange: (mySort: string) => void;
  onOrderByChange: (mySort: string) => void;
}

const DropDown = ({
  toggle,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}: DropDownProps) => {
  if (!toggle) {
    return null;
  }
  return (
    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <DropDownItem
          name="Created At"
          onClick={() => onSortByChange("createdAt")}
          isChecked={sortBy === "createdAt"}
        />
        <DropDownItem
          name="Updated At"
          onClick={() => onSortByChange("updatedAt")}
          isChecked={sortBy === "updatedAt"}
        />
        <DropDownItem
          name="External URL"
          onClick={() => onSortByChange("toUrl")}
          isChecked={sortBy === "toUrl"}
        />
        <DropDownItem
          name="Internal URL"
          onClick={() => onSortByChange("fromUrl")}
          isChecked={sortBy === "fromUrl"}
        />
        <DropDownItem
          name="Asc"
          onClick={() => onOrderByChange("asc")}
          isChecked={orderBy === "asc"}
          hasBorderTop={true}
        />
        <DropDownItem
          name="Desc"
          onClick={() => onOrderByChange("desc")}
          isChecked={orderBy === "desc"}
        />
      </div>
    </div>
  );
};

export default DropDown;
