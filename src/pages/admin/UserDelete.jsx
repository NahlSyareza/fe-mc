import Navbar from "./Navbar";
import { local_cloud_url } from "../../utils/connection.utils";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function UserDelete() {
  const [getId, setId] = useState("");

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden flex flex-col">
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="h-5/6 w-1/3 rounded-xl bg-green-600">
          <div className="w-full h-1/4 flex items-center justify-center">
            <p className="text-2xl">Delete User</p>
          </div>
          <div className="w-full h-1/2 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>User ID</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setId(e.target.value);
                }}
                type="text"
              />
            </div>
          </div>
          <div className="w-full h-1/4 flex justify-center items-center">
            <button
              className="bg-green-700 p-2 rounded-md hover:bg-green-800"
              onClick={async () => {
                await local_cloud_url
                  .delete(`/user/delete/${getId}`)
                  .then((e) => {
                    const r = e.data;
                    console.log(r);
                    if (r.success) {
                      toast.success("Deleted User record!", {
                        onClose: () => {
                          window.location.reload();
                        },
                      });
                    }
                  });
              }}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDelete;
