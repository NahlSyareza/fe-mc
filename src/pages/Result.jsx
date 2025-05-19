import { useNavigate } from "react-router-dom";
import { local_cloud_url } from "../utils/connection.utils";
import { useEffect, useState } from "react";
import random from "random";

function Result({ state, playerLevel, enemyLevel }) {
  const navigate = useNavigate();
  const biome = localStorage.getItem("mc_biome");
  const [getLoot, setLoot] = useState({});
  const [getCount, setCount] = useState(1);
  const u = localStorage.getItem("mc_user");

  useEffect(() => {
    local_cloud_url
      .get(`loot/getLevelled/p?biome=${biome}&level=${playerLevel}`)
      .then((e) => {
        const r = e.data;
        console.log(r);
        setLoot(r.payload.item);
        const n = random.int(1, 6);
        switch (r.payload.item.__t) {
          case "potion":
            console.log("For potions only!");
            setCount(n);
            break;

          default:
            setCount(1);
            break;
        }

        console.log(n);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="font-gemu text-white">
      <div className="fixed w-full h-full bg-black opacity-50 z-10"></div>
      <div
        onClick={async () => {
          console.log(getLoot._id);
          console.log(getLoot.name);
          console.log(getCount);

          if (state) {
            await local_cloud_url.post("/inv/add", {
              user: u,
              item: getLoot._id,
              count: parseInt(getCount),
            });

            await local_cloud_url.post("/user/progressXP", {
              user: u,
              xp: Math.max(1, enemyLevel - playerLevel) * 10,
            });
          }

          navigate(`/world/${biome}`);
        }}
        className="fixed bg-slate-600 p-4 w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-xl items-center flex flex-col"
      >
        <div className="w-full h-1/6 flex justify-center">
          <p>{state ? "Victory! You gained" : "Defeat!"}</p>
        </div>
        {/* <p>{level}</p> */}
        {state && (
          <div className="flex w-full h-1/6 items-center justify-center">
            <div className="w-20 h-20 flex items-center justify-center bg-gray-700 rounded-md">
              <img className="" src={getLoot.sprite} />
              <p className="w-8 absolute translate-x-full translate-y-full">
                {getCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
