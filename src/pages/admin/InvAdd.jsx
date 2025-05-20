import { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import { local_cloud_url } from "../../utils/connection.utils";

function InvAdd() {
  const [getUserId, setUserId] = useState("");
  const [getItemId, setItemId] = useState("");
  const [getCount, setCount] = useState("");

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden flex flex-col">
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="h-5/6 w-1/3 rounded-xl bg-green-600">
          <div className="w-full h-1/5 flex items-center justify-center">
            <p className="text-2xl">Add Inventory</p>
          </div>
          <div className="w-full h-3/5 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>User ID</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                type="text"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Item ID</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setItemId(e.target.value);
                }}
                type="text"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Count</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setCount(e.target.value);
                }}
                type="text"
              />
            </div>
          </div>
          <div className="w-full h-1/5 flex justify-center items-center">
            <button
              className="bg-green-700 p-2 rounded-md hover:bg-green-800"
              onClick={async () => {
                await local_cloud_url
                  .post("/inv/add", {
                    user: getUserId,
                    item: getItemId,
                    count: getCount,
                  })
                  .then((e) => {
                    const r = e.data;
                    console.log(r);
                    if (r.success) {
                      toast.success("Added Inventory record!", {
                        onClose: () => {
                          window.location.reload();
                        },
                      });
                    }
                  });
              }}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvAdd;
