import random from "random";
import { useEffect, useRef, useState } from "react";
import { local_cloud_url } from "../utils/connection.utils";

import RenderBiome from "./RenderBiome";
import Inventory from "./Inventory";
import Stats from "./Stats";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function World() {
  const [getPos, setPos] = useState({ x: 950, y: 740 });
  const [getDirection, setDirection] = useState(1);
  const [getOpInv, setOpInv] = useState(false);
  const [getOpSt, setOpSt] = useState(false);
  const [getPlayer, setPlayer] = useState({});

  const navigate = useNavigate();
  const { biome } = useParams();
  const u = localStorage.getItem("mc_user");
  let localPos = { x: 950, y: 740 };

  useEffect(() => {
    console.log(localStorage.getItem("mc_biome"));
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

  useEffect(() => {
    const speed = 10;
    localStorage.setItem("mc_biome", biome);

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
          setOpInv(false);
          setOpSt(false);
          break;
        case "w":
          if (localPos.y < 610) {
            break;
          }

          localPos.y = localPos.y - speed;

          setPos((e) => ({
            y: e.y - speed,
            x: e.x,
          }));
          break;
        case "a":
          if (localPos.x < speed) {
            break;
          }

          localPos.x = localPos.x - speed;

          setDirection(1);
          setPos((e) => ({
            x: e.x - speed,
            y: e.y,
          }));
          break;
        case "s":
          if (localPos.y > 880) {
            break;
          }

          localPos.y = localPos.y + speed;

          setPos((e) => ({
            y: e.y + speed,
            x: e.x,
          }));
          break;
        case "d":
          if (localPos.x > 1880) {
            break;
          }

          localPos.x = localPos.x + speed;

          setDirection(-1);
          setPos((e) => ({
            x: e.x + speed,
            y: e.y,
          }));
          break;

        case "e":
          console.log("Open inventory!");
          setOpSt((e) => false);
          setOpInv((e) => !e);
          break;

        case "i":
          console.log("Open Stats!");
          setOpInv((e) => false);
          setOpSt((e) => !e);
          break;

        case "m":
          // setOMap((e) => !e);
          navigate("/travel");

          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      const enc = random.int(0, 40);

      console.log(enc);

      switch (event.key) {
        case "w":
          break;
        case "a":
          break;
        case "s":
          break;
        case "d":
          break;
        case "m":
          break;
        default:
          break;
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  localStorage.setItem("logged_in_user", "abc");
  const user = localStorage.getItem("logged_in_user");

  if (!user) {
    return <p>No</p>;
  }

  return (
    <div className="w-screen h-screen flex flex-col font-gemu text-white">
      <RenderBiome biome={biome} />

      {getPlayer && (
        <img
          src={getPlayer.sprite}
          style={{
            transform: `scaleX(${getDirection})`,
            left: `${getPos.x}px`,
            top: `${getPos.y}px`,
          }}
          className="absolute"
        />
      )}

      <p className="absolute ">
        Player Position: ({getPos.x}, {getPos.y})
      </p>

      {getOpInv && <Inventory user={u} />}
      {getOpSt && <Stats user={u} />}
    </div>
  );
}

export default World;
