import { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import { local_cloud_url } from "../../utils/connection.utils";
import { autoCapitalize } from "../../utils/inventory.util";

function EnemyCreate() {
  const [getName, setName] = useState("");
  const [getMaxHp, setMaxHp] = useState(0);
  const [getLevel, setLevel] = useState(1);
  const [getAtk, setAtk] = useState(0);
  const [getDef, setDef] = useState(0);
  const [getMgc, setMgc] = useState(0);
  const [getSprite, setSprite] = useState(0);
  const [getIndex, setIndex] = useState(0);
  const getBiomes = [
    {
      biome: "forest",
      bg: "https://terraria.wiki.gg/images/0/0b/Forest_background_4.png?821d0a",
    },
    {
      biome: "jungle",
      bg: "https://terraria.wiki.gg/images/5/5a/Jungle_background_4.png?a5df8d",
    },
    {
      biome: "corruption",
      bg: "https://terraria.wiki.gg/images/c/c4/Corruption_background_5.png?cb1b70",
    },
    {
      biome: "crimson",
      bg: "https://terraria.wiki.gg/images/e/e5/Crimson_background_5.png?ee9c8c=&format=original",
    },
    {
      biome: "hallow",
      bg: "https://terraria.wiki.gg/images/d/df/Hallow_background_4.png?47225b",
    },
  ];

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden flex flex-col">
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={1000} />
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="h-5/6 w-1/3 rounded-xl bg-green-600">
          <div className="w-full h-1/6 flex items-center justify-center">
            <p className="text-2xl">Create Enemy</p>
          </div>
          <div className="w-full h-4/6 items-center flex flex-col space-y-2">
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
              <p>Max HP</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setMaxHp(e.target.value);
                }}
                type="number"
              />
            </div>
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
              <p>ATK</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setAtk(e.target.value);
                }}
                type="number"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>DEF</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setDef(e.target.value);
                }}
                type="number"
              />
            </div>
            <div className="w-2/3 h-auto flex flex-col">
              <p>MGC</p>
              <input
                className="text-black"
                onChange={(e) => {
                  setMgc(e.target.value);
                }}
                type="number"
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
              <p>Biome</p>
              <select
                className="text-black"
                onChange={(e) => {
                  setIndex(e.target.value);
                }}
              >
                {getBiomes.map((e, i) => {
                  return <option value={i}>{autoCapitalize(e.biome)}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="w-full h-1/6 flex justify-center items-center">
            <button
              className="bg-green-700 p-2 rounded-md hover:bg-green-800"
              onClick={async () => {
                console.log(getBiomes[getIndex].bg);
                console.log(getBiomes[getIndex].biome);

                await local_cloud_url
                  .post("/enemy/create", {
                    name: getName,
                    max_hp: getMaxHp,
                    level: getLevel,
                    atk: getAtk,
                    def: getDef,
                    mgc: getMgc,
                    sprite: getSprite,
                    bg: getBiomes[getIndex].bg,
                    biome: getBiomes[getIndex].biome,
                  })
                  .then((e) => {
                    const r = e.data;
                    console.log(r);
                    if (r.success) {
                      toast.success("Created Enemy record!", {
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

export default EnemyCreate;
