import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { local_cloud_url } from "../utils/connection.utils";

function Travel() {
  const navigate = useNavigate();

  const u = localStorage.getItem("mc_user");
  const [getPlayer, setPlayer] = useState({});

  useEffect(() => {
    local_cloud_url
      .get(`/user/get/${u}`)
      .then((e) => {
        const r = e.data;
        console.log(r);

        setPlayer(r.payload);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="w-full h-screen flex justify-evenly font-gemu">
      <div className="flex">
        <img
          className="h-full object-cover"
          src="https://terraria.wiki.gg/images/2/20/Corruption_background_3.png?a5cb95"
        />
        <div className="fixed flex flex-col w-1/5 h-1/4 justify-center items-center">
          <p className="text-purple-600 text-2xl">Level</p>
          <p className="text-purple-600 text-2xl">15</p>
        </div>
        <div
          className="h-full w-1/5 bg-white opacity-0 hover:opacity-25 absolute"
          onClick={() => {
            if (getPlayer.level < 15) {
              return;
            }

            navigate("/world/corruption");
          }}
        ></div>
      </div>
      <div className="flex">
        <img
          className="h-full object-cover"
          src="https://terraria.wiki.gg/images/9/9c/Forest_background_1.png?e2477a"
        />
        <div className="fixed flex flex-col w-1/5 h-1/4 justify-center items-center">
          <p className="text-green-600 text-2xl">Level</p>
          <p className="text-green-600 text-2xl">1</p>
        </div>
        <div
          className="h-full w-1/5 bg-white opacity-0 hover:opacity-25 absolute"
          onClick={() => {
            navigate("/world/forest");
          }}
        ></div>
      </div>
      <div className="flex">
        <img
          className="h-full object-cover"
          src="https://terraria.wiki.gg/images/e/e7/Crimson_background_3.png?f75540"
        />
        <div className="fixed flex flex-col w-1/5 h-1/4 justify-center items-center">
          <p className="text-red-600 text-2xl">Level</p>
          <p className="text-red-600 text-2xl">20</p>
        </div>
        <div
          className="h-full w-1/5 bg-white opacity-0 hover:opacity-25 absolute"
          onClick={() => {
            if (getPlayer.level < 20) {
              return;
            }

            navigate("/world/crimson");
          }}
        ></div>
      </div>
      <div className="flex">
        <img
          className="h-full object-cover"
          src="https://terraria.wiki.gg/images/a/aa/Hallow_background_3.png?a61783"
        />
        <div className="fixed flex flex-col w-1/5 h-1/4 justify-center items-center">
          <p className="text-pink-600 text-2xl">Level</p>
          <p className="text-pink-600 text-2xl">35</p>
        </div>
        <div
          className="h-full w-1/5 bg-white opacity-0 hover:opacity-25 absolute"
          onClick={() => {
            if (getPlayer.level < 35) {
              return;
            }

            navigate("/world/hallow");
          }}
        ></div>
      </div>
      <div className="flex">
        <img
          className="h-full object-cover"
          src="https://terraria.wiki.gg/images/f/f9/Jungle_background_2.png?912c44"
        />
        <div className="fixed flex flex-col w-1/5 h-1/4 justify-center items-center">
          <p className="text-lime-600 text-2xl">Level</p>
          <p className="text-lime-600 text-2xl">10</p>
        </div>
        <div
          className="h-full w-1/5 bg-white opacity-0 hover:opacity-25 absolute"
          onClick={() => {
            console.log(getPlayer.level);
            if (getPlayer.level < 10) {
              return;
            }

            navigate("/world/jungle");
          }}
        ></div>
      </div>
    </div>
  );
}

export default Travel;
