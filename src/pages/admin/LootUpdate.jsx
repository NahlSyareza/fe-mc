import { useState } from "react";
import Navbar from "./Navbar";
import { autoCapitalize, formatUnderscore } from "../../utils/inventory.util";
import { local_cloud_url } from "../../utils/connection.utils";
import { ToastContainer, toast } from "react-toastify";

function LootUpdate() {
  const [getRecord, setRecord] = useState(null);
  const [getId, setId] = useState("");
  const [getLevel, setLevel] = useState("");

  const render = (e) => {
    if (!e) {
      return <></>;
    }

    return (
      <>
        <div className="w-2/3 h-auto flex flex-col">
          <p>{getRecord.biome ? "Biome" : "Merchant"}</p>
          <p>
            {getRecord.biome
              ? getRecord.biome
              : formatUnderscore(getRecord.merchant)}
          </p>
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Item</p>
          <p>{getRecord.item.name}</p>
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Level</p>
          <input
            onChange={(e) => {
              setLevel(e.target.value);
            }}
            className="text-black"
            type="text"
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
            <p className="text-2xl">Update Loot</p>
          </div>
          <div className="w-full h-4/6 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>Loot ID</p>
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
                    .put("/loot/update", {
                      id: getRecord._id,
                      level: getLevel,
                    })
                    .then((e) => {
                      const r = e.data;
                      console.log(r);
                      if (r.success) {
                        toast.success("Updated User record!", {
                          onClose: () => {
                            window.location.reload();
                          },
                        });
                      }
                    });

                  return;
                }

                await local_cloud_url
                  .get(`/loot/get/p/${getId}`)
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

export default LootUpdate;
