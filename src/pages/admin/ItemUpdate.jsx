import { useState } from "react";
import Navbar from "./Navbar";
import { autoCapitalize } from "../../utils/inventory.util";
import { local_cloud_url } from "../../utils/connection.utils";
import { ToastContainer, toast } from "react-toastify";

function ItemUpdate() {
  const [getItem, setItem] = useState(null);
  const [getId, setId] = useState("");
  const [getDesc, setDesc] = useState("");
  const [getAtk, setAtk] = useState(0);
  const [getMaxStack, setMaxStack] = useState(1);
  const [getCost, setCost] = useState(0);
  const [getMgc, setMgc] = useState(0);
  const [getDef, setDef] = useState(0);
  const [getRestore, setRestore] = useState(0);
  const [getAttribute, setAttribute] = useState("");

  const renderTypes = (e) => {
    switch (e) {
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

  const render = (e) => {
    if (!e) {
      return <></>;
    }

    return (
      <>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Name</p>
          <p>{getItem.name}</p>
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Type</p>
          <p>{getItem.__t}</p>
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Max Stack</p>
          <input
            onChange={(e) => {
              setMaxStack(e.target.value);
            }}
            className="text-black"
            type="number"
          />
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Desc</p>
          <input
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            className="text-black"
            type="text"
          />
        </div>
        {renderTypes(e.__t)}
      </>
    );
  };

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden flex flex-col">
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="h-5/6 w-1/3 rounded-xl bg-green-600">
          <div className="w-full h-1/4 flex items-center justify-center">
            <p className="text-2xl">Update Item</p>
          </div>
          <div className="w-full h-1/2 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>Item ID</p>
              <input
                onChange={(e) => {
                  setId(e.target.value);
                }}
                className="text-black"
                type="text"
              />
            </div>
            {render(getItem)}
          </div>
          <div className="w-full h-1/4 flex justify-center items-center">
            <button
              className="bg-green-700 p-2 rounded-md hover:bg-green-800"
              onClick={async () => {
                if (getItem) {
                  await local_cloud_url
                    .put("item/update", {
                      id: getItem._id,
                      type: getItem.__t,
                      desc: getDesc,
                      max_stack: getMaxStack,
                      extra: {
                        def: getDef,
                        atk: getAtk,
                        cost: getCost,
                        mgc: getMgc,
                        retore: getRestore,
                        attribute: getAttribute,
                      },
                    })
                    .then((e) => {
                      const r = e.data;
                      console.log(r);
                      if (r.success) {
                        toast.success("Updated Item record!", {
                          onClose: () => {
                            window.location.reload();
                          },
                        });
                      }
                    });

                  return;
                }

                await local_cloud_url
                  .get(`/item/get/${getId}`)
                  .then((e) => {
                    const r = e.data;
                    console.log(r);
                    setItem(r.payload);
                  })
                  .catch((e) => {
                    console.error(e);
                  });
              }}
            >
              {!getItem ? "GET" : "UPDATE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemUpdate;
