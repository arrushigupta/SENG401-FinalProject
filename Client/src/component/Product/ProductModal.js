import React, { useEffect, useContext, useState, useRef } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import UserContext from "../../context/UserContext";

import img from '../../img/Gorilla.jpg';
import axios from 'axios';
import { addMessageRoute, host } from "../../utils/Routes";
import Button from '../Additional/Button'
import { io } from 'socket.io-client';

function ImageCarousel(props) {
  return (
    <div
      class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      data-te-carousel-item
      style={{ backfaceVisibility: "hidden" }}>
      <img
        src={props.image}
        class="block w-full"
        alt="img not loading" />
    </div>
  );
}

function CarouselButton(props) {
  let classAttribute = "absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
  let shape = "M15.75 19.5L8.25 12l7.5-7.5";
  if (props.slide == "next") {
    classAttribute = "absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    shape = "M8.25 4.5l7.5 7.5-7.5 7.5";
  }
  return (
    <button
      className={classAttribute}
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide={props.slide}>
      <span class="inline-block h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="h-6 w-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={shape} />
        </svg>
      </span>
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >{props.name}</span>
    </button>
  );

}
export default function ProductModal({ userID, name, description, price, category, setShowModal, images, ProductID }) {

  const { setLoading } = useContext(LoadingContext);
  const loggedInUserID = useContext(UserContext);
  console.log(loggedInUserID);
  console.log(loggedInUserID.userID);
  console.log(userID);
  const [message, setMessage] = useState('');
  const [seller, setSeller] = useState(undefined);
  const [product, setProduct] = useState(undefined);

  const socket = useRef();

  useEffect(() => {
    DINOSGet("http://localhost:4000/api/specificUser/" + userID, setLoading, setSeller);
  }, []);
  useEffect(() => {
    if (seller !== undefined) {
      console.log(seller);
    }
  }, [seller]);

  const handleChange = (event) => {
    setMessage(event.target.value);
    console.log(message)
  };


  const handleClick = async () => {
    const data = await axios.post(addMessageRoute, {
      from: JSON.parse(localStorage.getItem("chat-app-user"))._id,
      to: userID,
      message: message,
    });
    socket.current = io(host);
    socket.current.emit("add-user", localStorage.getItem("chat-app-user")._id);

    socket.current.emit("send-msg", {
      from: JSON.parse(localStorage.getItem("chat-app-user"))._id,
      to: userID,
      message: message,
    });

    setShowModal(false);
    console.log("Message Sent.")
  }


  return (
    <>
      <div
        className="justify-center items-center mt-5 mb-5 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-fit h-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex justify-start bg-red-700 p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="grow text-3xl text-neutral-50 ">
                {name}
              </h3>
              <span class="shrink inline-block h-fit self-end justify-self-start  ml-3 mr-20 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ">
                {category}
              </span>
              <button
                className=" shrink text-black self-start justify-self-end background-transparent font-bold uppercase  text-sm outline-none focus:outline-none mb-1 "
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex justify-center bg-zinc-300">
              <div className="w-fit">
                <div
                  id="carouselExampleCaptions"
                  class="relative"
                  data-te-carousel-init
                  data-te-carousel-slide
                >

                  <div
                    class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">

                    {images.map((img, index) => {
                      if (index === 0) {
                        return (
                          <div
                            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                            data-te-carousel-active
                            style={{ backfaceVisibility: "hidden" }}>
                            <img
                              src={images[0]}
                              className="block w-full"
                              alt="img not loading" />
                          </div>);
                      }
                      return <ImageCarousel key={index} image={img} />
                    })}
                  </div>
                  {images.length > 1 ?
                    (<>

                      <CarouselButton key={0} name="Previous" slide="prev" />
                      <CarouselButton key={1} name="Next" slide="next" />

                    </>)
                    : null}



                </div>
                {/* </div> */}
                {/* End of Carousel */}
                <div className="flex items-start justify-start p-1 rounded-t">
                  <p className="my-2 text-slate-500 text-lg leading-relaxed">
                    Seller
                  </p>

                  {seller !== undefined && seller[0] !== undefined && seller[0].username !== undefined && <p class="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 my-2 ">{seller[0].username}</p>}
                  {seller === undefined && <p class="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 my-2 ">placeholder</p>}
                </div>
                <div className="flex items-start justify-start p-1 rounded-t">
                  <p className="my-2 text-slate-500 text-lg leading-relaxed">
                    Price
                  </p>
                  <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 my-2 ">
                    ${price}
                  </p>
                </div>
                <div className="flex items-start justify-start p-1 rounded-t">
                  <p className="my-2 text-slate-500 text-lg leading-relaxed">
                    Details
                  </p>
                  <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2 my-2 ">
                    {description}
                  </p>
                </div>

              </div>


            </div>
            {/*footer*/}
            {loggedInUserID.userID !== userID && (
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b bg-zinc-700">
                <input type="text" onChange={handleChange}
                  value={message} placeholder="Write a message to seller" class="px-3 py-3 mr-7  placeholder-slate-400 text-slate-600 relative bg-slate-200 rounded text-sm border-0 shadow outline-slate-200 focus:outline-slate-300 focus:ring w-full">
                </input>
                <Button onClick={handleClick} label="Message Seller" />
              </div>
            )}

          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <script src="./TW-ELEMENTS-PATH/dist/js/index.min.js">
      </script>
    </>
  )

}
