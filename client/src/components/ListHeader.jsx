/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

function ListHeader({ listName, getData }) {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");

    window.location.reload();
  };

  // console.log("render");
  return (
    <div className="flex items-center border-b-2 pb-3 mb-8 border-green-200">
      <div className="text-2xl font-medium font-serif w-full text-nowrap mr-4">
        {listName}
      </div>

      <div className=" h-full mt-5 text-sm font-medium flex  w-full justify-end">
        <button
          className="m-1 p-1 border border-black shadow-lg border-b-2 h-full rounded-l-lg rounded-r-lg  bg-transparent bg-orange-200"
          onClick={() => setShowModal(true)}
        >
          ADD NEW
        </button>
        <button
          className=" m-1 p-1 rounded-l-lg rounded-r-lg  border border-black shadow-lg border-b-2 h-full rounded bg-transparent bg-red-400"
          onClick={signOut}
        >
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
}

export default ListHeader;
