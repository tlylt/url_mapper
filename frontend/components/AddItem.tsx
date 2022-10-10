import { useState } from "react";
import { CreateItem } from "../types/Item";

type AddItemProps = {
  onSendItem: (item: CreateItem) => void;
};
const AddItem = ({ onSendItem }: AddItemProps) => {
  const clearData = {
    fromUrl: "",
    toUrl: "",
    contact: "", // honeypot
  };
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState(clearData);
  const [hasSubmitted, setSubmitted] = useState(false);
  const formDataPublish = () => {
    if (formData.toUrl.trim() === "" || formData.contact === null) {
      return;
    }
    const ItemInfo = {
      toUrl: formData.toUrl,
    } as CreateItem;
    if (formData.fromUrl && formData.fromUrl.trim() !== "") {
      ItemInfo.fromUrl = formData.fromUrl;
    }
    onSendItem(ItemInfo);
    setFormData(clearData);
    setToggleForm(!toggleForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1000);
  };
  return (
    <div>
      <button
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
        className={`w-full rounded-t-md bg-slate-600 px-2 py-3 text-left text-white hover:bg-slate-700 ${
          toggleForm ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <div>Create new URL mapping</div>
      </button>
      {toggleForm && (
        <div className="border-light-blue-500 rounded-b-md border-x-2 border-b-2 px-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
            <label
              htmlFor="toUrl"
              className="block text-left text-sm font-medium text-gray-700"
            >
              The external URL you want to map to
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, toUrl: event.target.value });
                }}
                value={formData.toUrl}
                type="text"
                name="toUrl"
                required
                id="toUrl"
                placeholder="e.g. https://google.com"
                maxLength={100}
                className="sm:text-md mt-1 block w-full rounded-md border-gray-300 p-1  shadow-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
            <label
              htmlFor="fromUrl"
              className="block text-left text-sm font-medium text-gray-700"
            >
              The identifier to use to map to the above (optional, randomized if
              not specified)
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, fromUrl: event.target.value });
                }}
                value={formData.fromUrl}
                id="fromUrl"
                name="fromUrl"
                maxLength={30}
                required
                className="sm:text-md mt-1 block w-full rounded-md border-gray-300 p-1 shadow-sm"
                placeholder="e.g. search"
              ></input>
            </div>
          </div>
          <div className="invisible hidden sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact
            </label>
            <input
              id="contact"
              name="contact"
              size={40}
              type="text"
              value={formData.contact}
              maxLength={10}
              onChange={(event) => {
                setFormData({ ...formData, contact: event.target.value });
              }}
            />
          </div>
          <div>
            <div className="flex justify-end">
              <button
                onClick={formDataPublish}
                disabled={hasSubmitted || formData.toUrl.length === 0}
                type="submit"
                className={`disabled:opacitiy-50 ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm  ${
                  hasSubmitted || formData.toUrl.length === 0
                    ? ""
                    : "hover:bg-slate-700"
                } focus:ring-sku-dark focus:outline-none focus:ring-2 focus:ring-offset-2 
                                ${
                                  formData.toUrl.length > 0 && !hasSubmitted
                                    ? "text-sku-light bg-sku-darker"
                                    : "text-sku-dark bg-sku-light"
                                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem;
