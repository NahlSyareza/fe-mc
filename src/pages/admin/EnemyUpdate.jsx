import { useState } from "react";
import Navbar from "./Navbar";
import { autoCapitalize } from "../../utils/inventory.util";
import { local_cloud_url } from "../../utils/connection.utils";
import { ToastContainer, toast } from "react-toastify";

function EnemyUpdate() {
  const [getRecord, setRecord] = useState(null);
  const [getId, setId] = useState("");
  const [getAtk, setAtk] = useState(0);
  const [getMgc, setMgc] = useState(0);
  const [getDef, setDef] = useState(0);
  const [getMaxHp, setMaxHp] = useState(1);
  const [getLevel, setLevel] = useState(1);

  const render = (e) => {
    if (!e) {
      return <></>;
    }

    return (
      <>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Name</p>
          <p>{getRecord.name}</p>
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Biome</p>
          <p>{getRecord.biome}</p>
        </div>
        <div className="w-2/3 h-auto flex flex-col">
          <p>Max HP</p>
          <input
            onChange={(e) => {
              setMaxHp(e.target.value);
            }}
            className="text-black"
            type="number"
          />
        </div>
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
          <p>DEF</p>
          <input
            onChange={(e) => {
              setDef(e.target.value);
            }}
            className="text-black"
            type="number"
          />
        </div>
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
          <p>Level</p>
          <input
            onChange={(e) => {
              setLevel(e.target.value);
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
            <p className="text-2xl">Update Enemy</p>
          </div>
          <div className="w-full h-4/6 items-center flex flex-col space-y-2">
            <div className="w-2/3 h-auto flex flex-col">
              <p>Enemy ID</p>
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
                    .put("enemy/update", {
                      id: getRecord._id,
                      max_hp: getMaxHp,
                      atk: getAtk,
                      def: getDef,
                      mgc: getMgc,
                      level: getLevel,
                    })
                    .then((e) => {
                      const r = e.data;
                      console.log(r);
                      if (r.success) {
                        toast.success("Updated Enemy record!", {
                          onClose: () => {
                            window.location.reload();
                          },
                        });
                      }
                    });

                  return;
                }

                await local_cloud_url
                  .get(`/enemy/get/${getId}`)
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

export default EnemyUpdate;
