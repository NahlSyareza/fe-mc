import { local_cloud_url } from "../utils/connection.utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { autoCapitalize, getType } from "../utils/inventory.util";
import { useNavigate } from "react-router-dom";

function Shop({ merchant }) {
  const [getMerchantItems, setMerchantItems] = useState([]);
  const [getMerchantIndex, setMerchantIndex] = useState(0);
  const [getPlayerItems, setPlayerItems] = useState([]);
  const [getPlayerIndex, setPlayerIndex] = useState(0);
  const [getPlayer, setPlayer] = useState({});
  const { pMerchant } = useParams();

  const finalMerchant = pMerchant || merchant;
  const u = localStorage.getItem("mc_user");
  const biome = localStorage.getItem("mc_biome");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
          navigate(`/world/${biome}`);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

    local_cloud_url
      .get(`/loot/getMerchant/p/${finalMerchant}`)
      .then((e) => {
        const r = e.data;
        console.log(r);
        setMerchantItems(r.payload);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    local_cloud_url
      .get(`/inv/get/p/${u}`)
      .then((e) => {
        const r = e.data;
        console.log(r);
        setPlayerItems(r.payload);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-600 flex absolute font-gemu">
      <div className="w-1/2 h-full bg-gray-500">
        <div className="w-full h-2/3">
          <div className="grid grid-cols-6">
            {!getMerchantItems.length ? (
              <p>No items</p>
            ) : (
              getMerchantItems.map((e, i) => {
                if (e.level > getPlayer.level) {
                  return <></>;
                }

                return (
                  <div className="w-full h-full justify-center items-center flex m-2">
                    <div
                      onClick={async () => {
                        console.log(getMerchantItems[i].item._id);
                        await local_cloud_url
                          .post("/inv/add", {
                            user: u,
                            item: getMerchantItems[i].item._id,
                            count: 1,
                          })
                          .then((e) => {
                            const r = e.data;
                            console.log(r);
                            // const temp = [...getPlayerItems];
                            // temp.push(e.data.payload);
                            // setPlayerItems(temp);
                            // console.log(temp);
                            window.location.reload();
                          })
                          .catch((e) => {
                            console.error(e);
                          });
                      }}
                      className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded-md"
                      onMouseEnter={() => {
                        setMerchantIndex(i);
                      }}
                    >
                      <img src={e.item.sprite} className="absolute"></img>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="w-full h-1/3 bg-slate-700 p-4 text-white">
          {!getMerchantItems.length ? (
            <p>No information</p>
          ) : (
            <>
              <p className="m-2">
                {getMerchantItems[getMerchantIndex].item.name}
              </p>
              <p className="m-2">
                {autoCapitalize(getMerchantItems[getMerchantIndex].item.__t)}
              </p>
              {getType(
                getMerchantItems[getMerchantIndex].item.__t,
                getMerchantItems[getMerchantIndex].item
              )}
            </>
          )}
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-2/3">
          <div className="grid grid-cols-6">
            {!getPlayerItems.length ? (
              <p>No items</p>
            ) : (
              getPlayerItems.map((e, i) => {
                return (
                  <div className="w-full h-full flex items-center justify-center m-2">
                    <div
                      className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded-md"
                      onMouseEnter={() => {
                        setPlayerIndex(i);
                      }}
                    >
                      <img src={e.item.sprite} className="absolute"></img>
                      <p className="text-white absolute translate-x-full translate-y-full w-8">
                        {e.count}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="w-full h-1/3 bg-slate-800 p-4 text-white">
          {!getPlayerItems.length ? (
            <p>No item info</p>
          ) : (
            <>
              {" "}
              <p className="m-2">
                {getPlayerItems[getPlayerIndex].item.name} {"("}
                {getPlayerItems[getPlayerIndex].count}
                {")"}
              </p>
              <p className="m-2">
                {autoCapitalize(getPlayerItems[getPlayerIndex].item.__t)}
              </p>
              {getType(
                getPlayerItems[getPlayerIndex].item.__t,
                getPlayerItems[getPlayerIndex].item
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
