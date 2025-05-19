import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { local_cloud_url } from "../utils/connection.utils";

function Stats({ user }) {
  const { pUser } = useParams();
  const finalUser = pUser || user;

  const [getPlayer, setPlayer] = useState({});

  useEffect(() => {
    local_cloud_url
      .get(`/user/get/${finalUser}`)
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
    <div className="w-full h-full overflow-x-hidden flex font-gemu bg-zinc-800 text-gray-300 absolute z-10">
      <div className="w-1/2 h-full bg-zinc-600 p-32 text-xl flex flex-col justify-evenly">
        <p className="text-green-400">Name: {getPlayer.name}</p>
        <p className="text-amber-400">Level: {getPlayer.level}</p>
        <p className="text-amber-400">Progress XP: {getPlayer.p_xp}</p>
        <p className="text-amber-400">Level Up XP: {getPlayer.l_xp}</p>
        <p className="text-red-600">Max HP: {getPlayer.max_hp}</p>
        <p className="text-green-600">Max SP: {getPlayer.max_sp}</p>
        <p className="text-blue-500">Max MP: {getPlayer.max_mp}</p>
        <p className="text-cyan-300">ATK: {getPlayer.atk}</p>
        <p className="text-cyan-300">MGC: {getPlayer.mgc}</p>
        <p className="text-cyan-300">DEF: {getPlayer.def}</p>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <img
          className="w-full h-full object-cover absolute -z-10"
          src={getPlayer.bg}
        />
        <img
          src={getPlayer.sprite}
          className="absolute"
          style={{
            scale: "2",
          }}
        />
      </div>
    </div>
  );
}

export default Stats;
