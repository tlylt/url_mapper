import type { NextPage } from "next";
import Search from "../components/Search";
import AddItem from "../components/AddItem";
import ItemInfo from "../components/ItemInfo";
import { useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import { CreateItem, Item } from "../types/Item";
import { deleteItem, fetchItemList, postItem } from "../common/APIs";
import moment from "moment";
import Head from "next/head";

const Home: NextPage = () => {
  let [itemList, setItemList] = useState<Item[]>([] as Item[]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("updatedAt");
  let [orderBy, setOrderBy] = useState("desc");
  console.log(itemList);
  const filteredItem: Item[] = itemList
    .filter((item: Item): boolean => {
      return (
        item.fromUrl.toLowerCase().includes(query.toLowerCase()) ||
        item.toUrl.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a: Item, b: Item): number => {
      let order = orderBy === "asc" ? 1 : -1;
      if (sortBy === "updatedAt") {
        return moment(a[sortBy] + "", "YYYY-MM-DDTHH:mm:ss.SSSSZ").isBefore(
          moment(b[sortBy] + "", "YYYY-MM-DDTHH:mm:ss.SSSSZ")
        )
          ? -1 * order
          : 1 * order;
      } else if (sortBy === "createdAt") {
        return moment(a[sortBy] + "", "YYYY-MM-DDTHH:mm:ss.SSSSZ").isBefore(
          moment(b[sortBy] + "", "YYYY-MM-DDTHH:mm:ss.SSSSZ")
        )
          ? -1 * order
          : 1 * order;
      } else if (sortBy === "toUrl" || sortBy === "fromUrl") {
        return (a[sortBy] + "").toLowerCase() < (b[sortBy] + "").toLowerCase()
          ? -1 * order
          : 1 * order;
      } else {
        throw new Error("Something is wrong");
      }
    });
  const fetchData = useCallback((): void => {
    fetchItemList().then(setItemList);
  }, []);

  const sendData = useCallback(
    async (item: CreateItem): Promise<void> => {
      const result = await postItem(item);
      setItemList([...itemList, result]);
    },
    [itemList]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="font-note container mx-auto max-w-4xl px-5 pt-3 text-center">
      <Head>
        <title>URL Mapper</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="font-futuristic mb-3 text-4xl font-bold">URL Mapper</h1>
      <p className="pb-2">
        Map an external URL to a shorter/custom/friendly URL
      </p>
      <AddItem onSendItem={(item) => sendData(item)} />
      <Search
        query={query}
        onQueryChange={(myQuery: string): void => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(mySort: string): void => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={(mySort: string): void => setSortBy(mySort)}
      />
      <LoadingSpinner shouldShow={itemList.length === 0} />
      <ul className="divide-sku-light divide-y-2">
        {filteredItem.map((item) => (
          <ItemInfo
            key={item.fromUrl}
            item={item}
            onDeleteItem={(fromUrl: string): void => {
              setItemList(
                itemList.filter((item: Item) => item.fromUrl !== fromUrl)
              );
              deleteItem(item);
            }}
          />
        ))}
      </ul>
      <Footer shouldShow={itemList.length !== 0} />
    </div>
  );
};

export default Home;
