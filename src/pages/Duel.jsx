import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { local_cloud_url } from "../utils/connection.utils";
import { ToastContainer, toast } from "react-toastify";
import Result from "./Result";

function Duel() {
  const navigate = useNavigate();
  const [getAnim, setAnim] = useState(0);
  const [getEOpacity, setEOpacity] = useState(1.0);
  const [getPOpacity, setPOpacity] = useState(1.0);
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [getPlayer, setPlayer] = useState({});
  const [getEnemy, setEnemy] = useState({});
  const [getInventory, setInventory] = useState([]);
  const [getIndex, setIndex] = useState(0);
  const [isDuelEnd, setDuelEnd] = useState(false);
  const [isVictory, setVictory] = useState(false);
  const [getTempDef, setTempDef] = useState(0);

  const u = localStorage.getItem("mc_user");
  const biome = localStorage.getItem("mc_biome");
  const timeout = 1000;

  useEffect(() => {
    local_cloud_url
      .get(`/inv/get/p/${u}`)
      .then((e) => {
        const r = e.data;
        console.log(r);
        setInventory(r.payload);
        // setSelected(r.payload[0]);
        // setCanAct(r.payload[0].item.cost < getPlayer.sp)
        console.log(r.payload[0]);
      })
      .catch((e) => console.error(e));

    local_cloud_url
      .get(`/user/get/${u}`)
      .then((e) => {
        const r = e.data;
        console.log(r);
        setPlayer({
          ...r.payload,
          hp: r.payload.max_hp,
          sp: r.payload.max_sp,
          mp: r.payload.max_mp,
        });

        local_cloud_url
          .get(`/enemy/getLevelled/?level=${r.payload.level}&biome=${biome}`)
          .then((e) => {
            const res = e.data;
            console.log("Retrieved enemy!");
            console.log(res);
            setEnemy({
              ...e.data.payload,
              hp: res.payload.max_hp,
              // mp: res.payload.max_mp,
              // sp: res.payload.max_sp,
            });
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    if (isDuelEnd) {
      return;
    }

    if (isPlayerTurn) {
      console.log("Player turn. Do nothing...");
      return;
    }

    setTimeout(() => {
      console.log("Doing enemy turn");
      setPlayer((e) => ({
        ...e,
        hp: Math.max(0, e.hp - (getEnemy.atk - (getPlayer.def + getTempDef))),
        sp: Math.min(e.max_sp, Math.ceil(e.sp + 0.05 * e.max_sp)),
        mp: Math.min(e.max_mp, Math.ceil(e.mp + 0.05 * e.max_mp)),
      }));
      handleAnim(true);

      if (getEnemy.atk > getPlayer.hp) {
        setTimeout(() => {
          setVictory(false);
          setDuelEnd(true);
          toast.info("YOU LOSE!", {});
        }, 10);
      }
      setPlayerTurn(true);
      return;
    }, 1500);
  }, [isPlayerTurn, isDuelEnd]);

  const handleAnim = (isPlayer) => {
    if (isPlayer) {
      setPOpacity(0.25);
      setTimeout(() => {
        setPOpacity(1.0);
        // setTempDef(0);
      }, 600);
    } else {
      setAnim(1);
      setEOpacity(0.25);
      setTimeout(() => {
        setAnim(0);
        setEOpacity(1);
      }, 600);
    }
  };

  const determineType = () => {
    const primaryType =
      getInventory[getIndex].item.__t === "weapon" ? true : false;

    return primaryType;
  };

  const calculateDmg = () => {
    const primaryType = determineType();
    const totalDmg = primaryType
      ? getInventory[getIndex].item.atk + getPlayer.atk
      : getInventory[getIndex].item.mgc + getPlayer.mgc;

    return totalDmg;
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-700 flex flex-col font-gemu">
      <ToastContainer position="top-center" autoClose={timeout} />
      {isDuelEnd && (
        <Result
          playerLevel={getPlayer.level}
          enemyLevel={getEnemy.level}
          state={isVictory}
          something={{
            _id: "10",
          }}
        />
      )}
      <div className="w-full h-4/6 bg-gray-400 flex">
        <div className="w-full h-full bg-blue-600 flex flex-col justify-center items-center">
          <div className="w-full h-1/4 bg-blue-900 text-white flex flex-col">
            <div className="w-full flex items-center m-1">
              <p className="m-2">HP</p>
              <div className="w-1/2 h-4 bg-red-950">
                <div
                  className="h-full bg-red-600 flex items-center justify-center"
                  style={{
                    width: `${(getPlayer.hp / getPlayer.max_hp) * 100}%`,
                  }}
                >
                  {getPlayer.hp < 1 ? <></> : <p>{getPlayer.hp}</p>}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center m-1">
              <p className="m-2">SP</p>
              <div className="w-1/2 h-4 bg-green-950">
                <div
                  className="h-full bg-green-600 flex items-center justify-center"
                  style={{
                    width: `${(getPlayer.sp / getPlayer.max_sp) * 100}%`,
                  }}
                >
                  {getPlayer.sp < 1 ? <></> : <p>{getPlayer.sp}</p>}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center m-1">
              <p className="m-2">MP</p>
              <div className="w-1/2 h-4 bg-blue-950">
                <div
                  className="h-full bg-blue-600 flex items-center justify-center"
                  style={{
                    width: `${(getPlayer.mp / getPlayer.max_mp) * 100}%`,
                  }}
                >
                  {getPlayer.mp < 1 ? <></> : <p>{getPlayer.mp}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-3/4 flex justify-center items-center">
            <img src={getPlayer.bg} className="object-cover w-full h-full" />

            <img
              src={getPlayer.sprite}
              style={{
                transform: "scaleX(-1) scale(1.5)",
                opacity: getPOpacity,
              }}
              className="absolute"
              onClick={() => {
                setPlayer((e) => ({
                  ...e,
                  hp: e.hp - 10,
                  max_hp: e.max_hp,
                }));
              }}
            />
          </div>
        </div>
        <div className="w-full h-full bg-green-600 flex flex-col justify-center items-center">
          <div className="w-full h-1/4 flex flex-col bg-green-900 text-white">
            <div className="w-full flex items-center m-1">
              <p className="m-2">HP</p>
              <div className="w-1/2 h-4 bg-red-950">
                <div
                  className="h-full bg-red-600 flex justify-center items-center"
                  style={{
                    width: `${(getEnemy.hp / getEnemy.max_hp) * 100}%`,
                  }}
                >
                  {getEnemy.hp < 1 ? <></> : <p>{getEnemy.hp}</p>}
                </div>
              </div>
            </div>
            {/* <div className="w-full flex items-center m-1">
              <p className="m-2">SP</p>
              <div className="w-1/2 h-4 bg-green-950">
                <div
                  className="h-full bg-green-600 flex justify-center items-center"
                  style={{
                    width: `${(getEnemy.sp / getEnemy.max_sp) * 100}%`,
                  }}
                >
                  {getEnemy.sp < 1 ? <></> : <p>{getEnemy.sp}</p>}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center m-1">
              <p className="m-2">MP</p>
              <div className="w-1/2 h-4 bg-blue-950">
                <div
                  className="h-full bg-blue-600 flex justify-center items-center"
                  style={{
                    width: `${(getEnemy.mp / getEnemy.max_mp) * 100}%`,
                  }}
                >
                  {getEnemy.mp < 1 ? <></> : <p>{getEnemy.mp}</p>}
                </div>
              </div>
            </div> */}
          </div>
          <div className="w-full h-3/4 flex items-center justify-center">
            <img
              // src="https://calamitymod.wiki.gg/images/a/af/Astral_Surface_Background.png?4f55a3"
              src={getEnemy.bg}
              className="object-cover w-full h-full"
            />
            <img
              src={getEnemy.sprite}
              className="absolute"
              style={{
                transform: "scale(1.5)",
                opacity: getEOpacity,
              }}
            />
            {getInventory.length && getAnim ? (
              <img
                src={getInventory[getIndex].item.sprite}
                className="absolute animate-ping"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 text-white h-full flex">
        <div className="h-full w-1/2 flex flex-col justify-evenly items-center text-xl">
          <button
            className="hover:text-yellow-300 bg-gray-800 w-32 p-3 rounded-xl"
            style={{
              opacity: `${getInventory.length && isPlayerTurn ? 1 : 0.5}`,
            }}
            onClick={async () => {
              console.log(`Temp def: ${getTempDef}`);

              if (!isPlayerTurn) {
                return;
              }

              switch (getInventory[getIndex].item.__t) {
                case "potion":
                  console.log("Should use");
                  break;

                case "armor":
                  console.log("Should defend");
                  console.log(getInventory[getIndex].item.def);
                  setTempDef(getInventory[getIndex].item.def);
                  setPlayerTurn(false);
                  return;

                default:
                  console.log("Should damage");
                  if (
                    (getInventory[getIndex].item.cost > getPlayer.sp &&
                      getInventory[getIndex].item.__t === "weapon") ||
                    (getInventory[getIndex].item.cost > getPlayer.mp &&
                      getInventory[getIndex].item.__t === "spell")
                  ) {
                    return;
                  }
                  break;
              }

              if (getInventory[getIndex].item.__t === "potion") {
                await local_cloud_url.put("/inv/remove", {
                  user: u,
                  count: 1,
                  item: getInventory[getIndex].item._id,
                });

                setInventory((e) =>
                  e.map((ec) =>
                    ec._id === getInventory[getIndex]._id
                      ? {
                          ...ec,
                          count: ec.count - 1,
                        }
                      : ec
                  )
                );

                switch (getInventory[getIndex].item.attribute) {
                  case "HP":
                    setPlayer((e) => ({
                      ...e,
                      hp: Math.min(
                        e.max_hp,
                        e.hp + getInventory[getIndex].item.restore
                      ),
                    }));
                    break;

                  case "MP":
                    setPlayer((e) => ({
                      ...e,
                      mp: Math.min(
                        e.max_mp,
                        e.mp + getInventory[getIndex].item.restore
                      ),
                    }));
                    break;

                  case "SP":
                    setPlayer((e) => ({
                      ...e,
                      sp: Math.min(
                        e.max_sp,
                        e.sp + getInventory[getIndex].item.restore
                      ),
                    }));
                    break;

                  default:
                    break;
                }
                return;
              }

              handleAnim(false);
              const totalDmg = calculateDmg();
              const primaryType = determineType();

              console.log(
                `Total ATK ${totalDmg} ${primaryType ? "ATK" : "MGC"}`
              );
              setPlayer((e) => ({
                ...e,
                ...(primaryType
                  ? { sp: e.sp - getInventory[getIndex].item.cost }
                  : { mp: e.mp - getInventory[getIndex].item.cost }),
              }));

              setEnemy((e) => ({
                ...e,
                hp: Math.max(e.hp - (totalDmg - e.def), 0),
              }));

              if (totalDmg > getEnemy.hp) {
                setTimeout(() => {
                  setVictory(true);
                  setDuelEnd(true);
                  toast.info("YOU WIN!", {});
                }, 10);
              } else {
                setPlayerTurn(false);
              }

              console.log(getPlayer);
            }}
          >
            {/* {getInventory.length &&
            (getInventory[getIndex].item.__t === "armor" ||
              getInventory[getIndex].item.__t === "potion")
              ? "Use"
              : "Damage"} */}
            {getInventory.length &&
              (() => {
                switch (getInventory[getIndex].item.__t) {
                  case "armor":
                    return "Defend";

                  case "potion":
                    return "Consume";

                  default:
                    console.log(getInventory[getIndex].item.cost);

                    if (
                      getInventory[getIndex].item.cost > getPlayer.sp &&
                      getInventory[getIndex].item.__t === "weapon"
                    ) {
                      return "Low SP";
                    }

                    if (
                      getInventory[getIndex].item.cost > getPlayer.mp &&
                      getInventory[getIndex].item.__t === "spell"
                    ) {
                      return "Low MP";
                    }

                    return "Damage";
                }
              })()}
          </button>
          <button
            onClick={() => {
              setPlayerTurn(false);
            }}
            style={{
              opacity: `${isPlayerTurn ? 1 : 0.5}`,
            }}
            className="hover:text-yellow-300 bg-gray-800 w-32 p-3 rounded-xl"
          >
            Pass
          </button>
          <button
            style={{
              opacity: `${isPlayerTurn ? 1 : 0.5}`,
            }}
            className="hover:text-yellow-300 bg-gray-800 w-32 p-3 rounded-xl"
            onClick={async () => {
              navigate(`/world/${biome}`);
            }}
          >
            Run
          </button>
        </div>
        <div className="h-full w-1/2 flex">
          <div className="grid grid-cols-6 grid-rows-2 w-full">
            {!getInventory.length ? (
              <p>Loading...</p>
            ) : (
              getInventory.map((e, i) => {
                if (
                  e.count < 1 ||
                  (e.item.__t !== "weapon" &&
                    e.item.__t !== "potion" &&
                    e.item.__t !== "spell" &&
                    e.item.__t != "armor")
                ) {
                  return <></>;
                }

                return (
                  <div
                    key={i}
                    className="flex w-full justify-center"
                    onClick={() => {
                      setIndex(i);
                      // setSelected(getInventory[i]);
                    }}
                  >
                    <div
                      className={`m-4 rounded-xl flex justify-center items-center w-20 h-20 ${
                        getIndex == i ? "bg-yellow-600" : "bg-gray-500"
                      }`}
                    >
                      <img src={e.item.sprite} />
                      <p className="fixed translate-y-full translate-x-full w-8">
                        {e.count}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Duel;
