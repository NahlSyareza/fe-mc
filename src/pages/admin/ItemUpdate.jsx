import { useState } from "react";
import Navbar from "./Navbar";
import { autoCapitalize } from "../../utils/inventory.util";

function ItemUpdate() {
  const [getType, setType] = useState("misc");
  const typeOptions = ["misc", "spell", "weapon", "armor", "potion"];

  const renderTypes = () => {
    switch (getType) {
      case "potion":
        return (
          <>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Attribute</p>
              <input className="text-black" type="text" />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Restore</p>
              <input className="text-black" type="number" />
            </div>
          </>
        );

      case "weapon":
        return (
          <>
            <div className="w-2/3 h-auto flex flex-col">
              <p>ATK</p>
              <input className="text-black" type="number" />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Cost</p>
              <input className="text-black" type="number" />
            </div>
          </>
        );

      case "spell":
        return (
          <>
            <div className="w-2/3 h-auto flex flex-col">
              <p>MGC</p>
              <input className="text-black" type="number" />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>Cost</p>
              <input className="text-black" type="number" />
            </div>
          </>
        );

      case "armor":
        return (
          <>
            <div className="w-2/3 h-auto flex flex-col">
              <p>DEF</p>
              <input className="text-black" type="number" />
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
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="h-5/6 w-1/3 rounded-xl bg-green-600">
          <div className="w-full h-1/4 flex items-center justify-center">
            <p className="text-2xl">Update Item</p>
          </div>
          <div className="w-full h-1/2 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>Item ID</p>
              <input type="text" />
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
          <div className="w-full h-1/4 flex justify-center items-center">
            <button
              className="bg-green-700 p-2 rounded-md hover:bg-green-800"
              onClick={() => {
                console.log(getType);
              }}
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemUpdate;
