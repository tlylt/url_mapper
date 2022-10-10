import moment from "moment";
import { BsTrash } from "react-icons/bs";
import { Item } from "../types/Item";

type ItemInfoProps = {
  item: Item;
  onDeleteItem: (id: string) => void;
};

const ItemInfo = ({ item, onDeleteItem }: ItemInfoProps) => {
  return (
    <li className="group hover:bg-sku-light grid grid-cols-1 py-4 px-2 hover:shadow-lg sm:grid-cols-3">
      <div className="max-w-prose overflow-auto text-left sm:col-span-2">
        <a
          href={item.fromUrl}
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          {item.fromUrl}
        </a>
        <div>
          <b className="text-sku-darker font-bold">Mapped to:</b> {item.toUrl}
        </div>
      </div>
      <div className="grid content-center items-center justify-items-end">
        <span>{moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>

        <button
          type="button"
          onClick={() => onDeleteItem(item.fromUrl)}
          aria-label="hide Item"
          className="bg-sku-darker hover:bg-sku-light hover:text-sku-darker mr-1.5 mt-1 rounded p-1.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <BsTrash />
        </button>
      </div>
    </li>
  );
};

export default ItemInfo;
