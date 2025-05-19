import { useState } from "react";
import Navbar from "./Navbar";
import { autoCapitalize } from "../../utils/inventory.util";
import { local_cloud_url } from "../../utils/connection.utils";
import { ToastContainer, toast } from "react-toastify";

function ItemCreate() {
  const [getType, setType] = useState("misc");
  const typeOptions = ["misc", "spell", "weapon", "armor", "potion"];

  const [getName, setName] = useState("");
  const [getSprite, setSprite] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getMaxStack, setMaxStack] = useState("");
  const [getAtk, setAtk] = useState(0);
  // const [getSkill, setSkill] = useState("");
  const [getCost, setCost] = useState(0);
  const [getMgc, setMgc] = useState(0);
  const [getDef, setDef] = useState(0);
  const [getRestore, setRestore] = useState(0);
  const [getAttribute, setAttribute] = useState("");

  const renderTypes = () => {
    switch (getType) {
      case "potion":
        return (
          <>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Attribute</p>
              <input
                onChange={(e) => {
                  setAttribute(e.target.value);
                }}
                className="text-black"
                type="text"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Restore</p>
              <input
                onChange={(e) => {
                  setRestore(e.target.value);
                }}
                className="text-black"
                type="number"
              />
            </div>
          </>
        );

      case "weapon":
        return (
          <>
            <div className="w-2/3 h-auto flex flex-col">
              <p>ATK</p>
              <input
                onChange={(e) => {
                  setAtk(e.target.value);
                }}
                className="text-black"
                type="number"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Cost</p>
              <input
                onChange={(e) => {
                  setCost(e.target.value);
                }}
                className="text-black"
                type="number"
              />
            </div>
          </>
        );

      case "spell":
        return (
          <>
            <div className="w-2/3 h-auto flex flex-col">
              <p>MGC</p>
              <input
                onChange={(e) => {
                  setMgc(e.target.value);
                }}
                className="text-black"
                type="number"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Cost</p>
              <input
                onChange={(e) => {
                  setCost(e.target.value);
                }}
                className="text-black"
                type="number"
              />
            </div>
          </>
        );

      case "armor":
        return (
          <>
            <div className="w-2/3 h-auto flex flex-col">
              <p>DEF</p>
              <input
                onChange={(e) => {
                  setDef(e.target.value);
                }}
                className="text-black"
                type="number"
              />
            </div>
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden flex flex-col">
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="h-5/6 w-1/3 rounded-xl bg-green-600">
          <div className="w-full h-1/5 flex items-center justify-center">
            <p className="text-2xl">Create Item</p>
          </div>
          <div className="w-full h-3/5 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>Name</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Sprite</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setSprite(e.target.value);
                }}
                type="text"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Desc</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setDef(e.target.value);
                }}
                type="text"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Max Stack</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setMaxStack(e.target.value);
                }}
                type="number"
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
                {typeOptions.map((e, i) => {
                  return <option value={e}>{autoCapitalize(e)}</option>;
                })}
              </select>
            </div>
            <>{renderTypes()}</>
          </div>
          <div className="w-full h-1/5 flex justify-center items-center">
            <button
              className="bg-green-700 p-2 rounded-md hover:bg-green-800"
              onClick={async () => {
                console.log(getType);
                await local_cloud_url
                  .post("/item/create", {
                    name: getName,
                    sprite: getSprite,
                    desc: !getDesc.length ? null : getDesc,
                    max_stack: getMaxStack,
                    type: getType,
                    extra: {
                      atk: getAtk,
                      def: getDef,
                      mgc: getMgc,
                      cost: getCost,
                      attribute: getAttribute,
                      restore: getRestore,
                    },
                  })
                  .then((e) => {
                    const r = e.data;
                    console.log(r);
                    if (r.success) {
                      toast.success("Created Item record!", {
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

export default ItemCreate;
