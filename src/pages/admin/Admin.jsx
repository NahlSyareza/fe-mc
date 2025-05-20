import Navbar from "./Navbar";
import { local_cloud_url } from "../../utils/connection.utils";
import { useEffect, useState } from "react";
import { autoCapitalize, formatUnderscore } from "../../utils/inventory.util";

function Admin() {
  const [getPlayers, setPlayers] = useState([]);
  const [getItems, setItems] = useState([]);
  const [getInventories, setInventories] = useState([]);
  const [getEnemies, setEnemies] = useState([]);
  const [getLoots, setLoots] = useState([]);

  useEffect(() => {
    local_cloud_url
      .get("/user/getAll")
      .then((e) => {
        const r = e.data;
        console.log(r);
        setPlayers(r.payload);
      })
      .catch((e) => {
        console.error(e);
      });

    local_cloud_url
      .get("/item/getAll")
      .then((e) => {
        const r = e.data;
        console.log(r);
        setItems(r.payload);
      })
      .catch((e) => {
        console.error(e);
      });

    local_cloud_url
      .get("/inv/getAll/p")
      .then((e) => {
        const r = e.data;
        console.log(r);
        setInventories(r.payload);
      })
      .catch((e) => {
        console.error(e);
      });

    local_cloud_url
      .get("/enemy/getAll")
      .then((e) => {
        const r = e.data;
        console.log(r);
        setEnemies(r.payload);
      })
      .catch((e) => {
        console.error(e);
      });

    local_cloud_url
      .get("/loot/getAll/p")
      .then((e) => {
        const r = e.data;
        console.log(r);
        setLoots(r.payload);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const attributeColor = (e) => {
    switch (e) {
      case "MP":
        return "text-blue-400";

      case "SP":
        return "text-green-400";

      default:
        return "text-red-400";
    }
  };

  const renderExtra = (e) => {
    switch (e.__t) {
      case "weapon":
        return (
          <>
            <p className="text-red-400">{e.atk} ATK</p>
            <p className="text-green-400">{e.cost} SP</p>
          </>
        );

      case "spell":
        return (
          <>
            <p className="text-red-400">{e.mgc} MGC</p>
            <p className="text-blue-400">{e.cost} MP</p>
          </>
        );

      case "potion":
        return (
          <>
            <p className="text-amber-400">{e.restore}</p>
            <p className={`${attributeColor(e.attribute)}`}>{e.attribute}</p>
          </>
        );

      case "armor":
        return (
          <>
            <p className="text-zinc-400">{e.def} DEF</p>
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden">
      <Navbar />
      <div className="bg-sky-950 p-20">
        <p className="text-white">Players</p>
        <ul className="text-white space-y-4 mt-2">
          {!getPlayers.length ? (
            <>
              <li>No items!</li>
              <div className="w-full h-0.5 bg-white"></div>
            </>
          ) : (
            getPlayers.map((e, i) => {
              return (
                <>
                  <li className="flex space-x-4 items-center w-auto h-10">
                    <div className="w-8 flex justify-center">
                      <img
                        src={e.sprite}
                        title={e._id}
                        onClick={() => {
                          navigator.clipboard.writeText(e._id);
                        }}
                      />
                    </div>
                    <p>{e.name}</p>
                  </li>
                  <div className="w-full h-0.5 bg-white"></div>
                </>
              );
            })
          )}
        </ul>

        <p className="text-white mt-12">Items</p>
        <ul className="text-white space-y-4 mt-2">
          {!getItems.length ? (
            <>
              <li>No items!</li>
              <div className="w-full h-0.5 bg-white"></div>
            </>
          ) : (
            getItems.map((e, i) => {
              return (
                <>
                  <li className="flex space-x-4 items-center w-auto h-10">
                    <div className="w-8 flex justify-center">
                      <img
                        src={e.sprite}
                        title={e._id}
                        onClick={() => {
                          navigator.clipboard.writeText(e._id);
                        }}
                      />
                    </div>
                    <p>{e.name}</p>
                    <p className="text-purple-400">Max Stack {e.max_stack}</p>
                    {renderExtra(e)}
                    <p>{e.desc ? "'" + e.desc + "'" : ""}</p>
                  </li>
                  <div className="w-full h-0.5 bg-white"></div>
                </>
              );
            })
          )}
        </ul>

        <p className="text-white mt-12">Inventory</p>
        <ul className="text-white space-y-4 mt-2">
          {!getInventories.length ? (
            <>
              <li>No items!</li>
              <div className="w-full h-0.5 bg-white"></div>
            </>
          ) : (
            getInventories.map((e, i) => {
              return (
                <>
                  <li className="flex space-x-4 items-center w-auto h-12">
                    <div className="w-8 flex items-center">
                      <img
                        title={e._id}
                        onClick={() => {
                          navigator.clipboard.writeText(e._id);
                        }}
                        src={e.user.sprite}
                      />
                    </div>
                    <p>{e.user.name}</p>
                    <div className="w-8 flex items-center">
                      <img src={e.item.sprite} />
                      <p>{e.count}</p>
                    </div>
                    <p></p>
                  </li>
                  <div className="w-full h-0.5 bg-white"></div>
                </>
              );
            })
          )}
        </ul>

        <p className="text-white mt-12">Enemy</p>
        <ul className="text-white space-y-4 mt-2">
          {!getEnemies.length ? (
            <>
              <li>No info!</li>
              <div className="w-full h-0.5 bg-white"></div>
            </>
          ) : (
            getEnemies.map((e, i) => {
              return (
                <>
                  <li className="flex space-x-4 items-center w-auto h-12">
                    <div className="w-8 flex items-center">
                      <img
                        title={e._id}
                        onClick={() => {
                          navigator.clipboard.writeText(e._id);
                        }}
                        src={e.sprite}
                      />
                    </div>
                    <p>{e.name}</p>
                    {/* <div className="h-full w-0.5 bg-white"></div> */}
                    <p className="text-red-400">Level {e.level}</p>
                    {/* <div className="h-full w-0.5 bg-white"></div> */}
                    <p className="text-green-400">
                      {autoCapitalize(e.biome)} biome
                    </p>
                  </li>
                  <div className="w-full h-0.5 bg-white"></div>
                </>
              );
            })
          )}
        </ul>

        <p className="text-white mt-12">Loot</p>
        <ul className="text-white space-y-4 mt-2">
          {!getLoots.length ? (
            <>
              <li>No info!</li>
              <div className="w-full h-0.5 bg-white"></div>
            </>
          ) : (
            getLoots.map((e, i) => {
              return (
                <>
                  <li className="flex w-auto h-auto space-x-4 items-center">
                    <div className="w-8">
                      <img
                        title={e._id}
                        onClick={() => {
                          navigator.clipboard.writeText(e._id);
                        }}
                        src={e.item.sprite}
                      />
                    </div>
                    <p className={e.biome ? "text-green-400" : "text-zinc-400"}>
                      {e.biome
                        ? autoCapitalize(e.biome) + " biome"
                        : formatUnderscore(e.merchant)}{" "}
                    </p>
                    <p className="text-red-400">Level {e.level}</p>
                  </li>
                  <div className="w-full h-0.5 bg-white"></div>
                </>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
