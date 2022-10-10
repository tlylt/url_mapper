import { Item, CreateItem } from "../types/Item";
import { BACKEND_URL } from "./Constants";
import { getFromUrlIdentifier } from "./Utils";
import moment from "moment";

export const fetchItemList = async (): Promise<Item[]> => {
  const response = await fetch(BACKEND_URL);
  const data = await response.json();
  return data.data;
};

export const postItem = async (item: CreateItem): Promise<Item> => {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  console.log(moment(data.data.updatedAt + "", "YYYY-MM-DDTHH:mm:ss.SSSSZ"));
  return data.data as Item;
};

export const deleteItem = async (item: Item): Promise<void> => {
  await fetch(BACKEND_URL + "/" + getFromUrlIdentifier(item.fromUrl), {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
