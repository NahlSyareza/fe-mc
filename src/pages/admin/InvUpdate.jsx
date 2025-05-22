import { useState } from "react";
import Navbar from "./Navbar";
import { autoCapitalize, formatUnderscore } from "../../utils/inventory.util";
import { local_cloud_url } from "../../utils/connection.utils";
import { ToastContainer, toast } from "react-toastify";

function InvUpdate() {
  const [getRecord, setRecord] = useState(null);
  const [getId, setId] = useState("");
  const [getCount, setCount] = useState(0);

  const render = (e) => {
    if (!e) {
      return <></>;
    }

    return (
      <>
        <div className="w-2/3 h-auto flex flex-col">
          <p>User</p>
          <p>{getRecord.user.name}</p>
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Item</p>
          <p>{getRecord.item.name}</p>
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Count</p>
          <input
            onChange={(e) => {
              setCount(e.target.value);
            }}
            className="text-black"
            type="number"
          />
        </div>
      </>
    );
  };

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden flex flex-col">
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="h-[80%] w-1/3 rounded-xl bg-green-600">
          <div className="w-full h-1/6 flex items-center justify-center">
            <p className="text-2xl">Update Inventory</p>
          </div>
          <div className="w-full h-4/6 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>Inventory ID</p>
              <input
                onChange={(e) => {
                  setId(e.target.value);
                }}
                className="text-black"
                type="text"
              />
            </div>
            {render(getRecord)}
          </div>
          <div className="w-full h-1/6 flex justify-center items-center">
            <button
              className="bg-green-700 p-2 rounded-md hover:bg-green-800"
              onClick={async () => {
                if (getRecord) {
                  await local_cloud_url
                    .put("/inv/set", {
                      id: getRecord._id,
                      count: getCount,
                    })
                    .then((e) => {
                      const r = e.data;
                      console.log(r);
                      if (r.success) {
                        toast.success("Updated Inventory record!", {
                          onClose: () => {
                            window.location.reload();
                          },
                        });
                      }
                    });

                  return;
                }

                await local_cloud_url
                  .get(`/inv/get/id/p/${getId}`)
                  .then((e) => {
                    const r = e.data;
                    console.log(r);
                    setRecord(r.payload);
                  })
                  .catch((e) => {
                    console.error(e);
                  });
              }}
            >
              {!getRecord ? "GET" : "UPDATE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvUpdate;
