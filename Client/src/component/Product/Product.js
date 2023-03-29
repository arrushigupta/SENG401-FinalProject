import React, { useEffect, useContext, useState } from "react";
import { DINOSGet, DINOSPost } from "../../scripts/backend-functions";
import LoadingContext from "../../context/LoadingContext";
import Input from "../Login/Input";
import ProductModal from "./ProductModal";
import img from "../../img/dinosM.png";

export default function Product({
  name,
  description,
  price,
  userID,
  category,
  images,
  _id,
}) {
  let url = [img];
  const { setLoading } = useContext(LoadingContext);

  // loops through image array
  for (let i = 0; i < images.length; i++) {
    // since url only has one item in it, we need to push images accordingly
    try {
      // converts images to url
      url[i] = "data:image/png;base64," + images[i];
    } catch (error) {
      url.push("data:image/png;base64," + images[i]);
    }
  }

  //product use state for testing
  const [product, setProduct] = useState({
    name: "Kendama",
    description:
      "Used it during all of grade 6, decided it was time to move on",
    price: 20,
    image: null,
  });

  //use state for modal
  const [showModal, setShowModal] = React.useState(false);
  //function to load modal
  const loadModal = () => {
    setShowModal(true);
  };

  //   let newDesc =
  //     description.length > 30
  //       ? description.substring(0, 27) + "..."
  //       : description;
  //   let newName = name.length > 30 ? name.substring(0, 27) + "..." : name;
  return (
    <>
      <div onClick={loadModal}>
        <div class="relative max-w-sm rounded overflow-hidden shadow-lg ">
          <span class="absolute top-1 right-1 inline-block group-hover:bg-red-600 bg-gray-100 opacity-60 group-hover:opacity-100 rounded-full px-3 py-1 mx-2 text-lg font-semibold group-hover:text-gray-100 text-gray-700 mr-2 mb-2">
            ${price}
          </span>
          <img
            className="object-cover w-96 h-72"
            src={url[0]}
            alt="Dinos Marketplace Picture"
          />
          <div class="px-6 py-4 ">
            <div class="font-bold text-xl mb-2 overflow-hidden">{name}</div>
            <span class="inline-block group-hover:bg-gray-200 bg-red-500 rounded-full px-3 py-1 mx-2 text-sm font-semibold group-hover:text-gray-700 text-gray-100 mr-2 mb-2">
              {category}
            </span>
            <p class="text-gray-700 text-base overflow-hidden">{description}</p>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <ProductModal
            userID={userID}
            category={category}
            name={name}
            description={description}
            price={price}
            ProductID={_id}
            setShowModal={setShowModal}
            images={url}
          />
        </>
      ) : null}
    </>
  );
}
