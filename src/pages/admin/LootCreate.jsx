import { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import { local_cloud_url } from "../../utils/connection.utils";
import { formatUnderscore } from "../../utils/inventory.util";

function LootCreate() {
  const [getLevel, setLevel] = useState(1);
  const [getItemId, setItemId] = useState("");
  const [getBiome, setBiome] = useState("");
  const [getDisplay, setDisplay] = useState("");
  const [getMerchant, setMerchant] = useState("");
  const [getType, setType] = useState("enemy_loot");
  const lootType = ["enemy_loot", "merchant_loot"];

  const renderOptions = () => {
    switch (getType) {
      case "enemy_loot":
        return (
          <>
            <p>Biome</p>
            <input
              className="text-black"
              onChange={(e) => {
                setBiome(e.target.value);
              }}
              type="text"
            />
          </>
        );

      default:
        return (
          <>
            <p>Merchant</p>
            <input
              className="text-black"
              onChange={(e) => {
                setMerchant(e.target.value);
              }}
              type="text"
            />
          </>
        );
    }
  };

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden flex flex-col">
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="h-5/6 w-1/3 rounded-xl bg-green-600">
          <div className="w-full h-1/5 flex items-center justify-center">
            <p className="text-2xl">Create Loot</p>
          </div>
          <div className="w-full h-3/5 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>Level</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                type="number"
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
              <p>Type</p>
              <select
                className="text-black"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                {lootType.map((e, i) => {
                  return <option value={e}>{formatUnderscore(e)}</option>;
                })}
              </select>
            </div>
            <div className="w-2/3 h-auto flex flex-col">{renderOptions()}</div>
          </div>
          <div className="w-full h-1/5 flex justify-center items-center">
            <button
              className="bg-green-700 p-2 rounded-md hover:bg-green-800"
              onClick={async () => {
                await local_cloud_url
                  .post("/loot/create", {
                    level: getLevel,
                    item: getItemId,
                    type: getType,
                    extra: {
                      biome: getBiome,
                      merchant: getMerchant,
                    },
                  })
                  .then((e) => {
                    const r = e.data;
                    console.log(r);
                    if (r.success) {
                      toast.success("Created Loot record!", {
                        onClose: () => {
                          window.location.reload();
                        },
                      });
                    }
                  });
              }}
            >
              CREATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LootCreate;
