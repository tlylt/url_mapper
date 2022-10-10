import { BiCheck } from "react-icons/bi";

interface DropDownItemProps {
  onClick: () => void;
  name: string;
  isChecked: boolean;
  hasBorderTop?: boolean;
}

const DropDownItem = ({
  name,
  onClick,
  isChecked,
  hasBorderTop = false,
}: DropDownItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 ${
        hasBorderTop && "border-t-2 border-gray-300"
      }`}
      role="menuitem"
    >
      {name} {isChecked && <BiCheck />}
    </div>
  );
};
export default DropDownItem;
