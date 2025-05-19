import { useEffect, useState } from "react";
import { autoCapitalize, getType } from "../utils/inventory.util";
import { local_cloud_url } from "../utils/connection.utils";
import { useParams } from "react-router-dom";

function Inventory({ user }) {
  const [getInventory, setInventory] = useState([]);

  const [getIndex, setIndex] = useState(0);

  const { pUser } = useParams();

  const final = pUser || user;

  useEffect(() => {
    local_cloud_url
      .get(`/inv/get/p/${final}`)
      .then((e) => {
        console.log(e.data);
        const payload = e.data.payload;

        setInventory(payload);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="flex flex-col font-gemu w-full h-full bg-zinc-800 overflow-x-hidden justify-between text-gray-300 absolute">
      <div className="grid grid-cols-12">
        {!getInventory.length ? (
          <p>No items found!</p>
        ) : (
          getInventory.map((e, i) => {
            return (
              <div className="flex w-full justify-center">
                <div
                  className="bg-gray-700 m-4 rounded-xl flex justify-center items-center w-20 h-20"
                  onMouseOver={() => {
                    setIndex(i);
                  }}
                  onMouseLeave={() => {
                    console.log(getIndex);
                  }}
                >
                  <img src={e.item.sprite} className="absolute" />
                  <p className="absolute translate-x-full translate-y-full w-8">
                    {e.count}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="bg-gray-800 rounded-t-xl h-1/2 p-5 w-full">
        {!getInventory.length ? (
          <p>No information displayed!</p>
        ) : (
          <div className="flex flex-col w-full justify-between h-full">
            <div className="flex h-1/2">
              <div>
                <p className="m-2">
                  {getInventory[getIndex].item.name} {"("}
                  {getInventory[getIndex].count}
                  {")"}
                </p>
                <p className="m-2">
                  {autoCapitalize(getInventory[getIndex].item.__t)}
                </p>
                {getType(
                  getInventory[getIndex].item.__t,
                  getInventory[getIndex].item
                )}
              </div>
            </div>
            <div className="flex h-1/2 items-end">
              <button
                onClick={async () => {
                  // getInventory.splice(getIndex, 1);
                  const temp = [...getInventory];
                  temp.splice(getIndex, 1);
                  const invId = getInventory[getIndex]._id;
                  setInventory(temp);
                  setIndex(0);
                  await local_cloud_url
                    .delete(`/inv/delete/${invId}`)
                    .then((e) => {
                      const r = e.data;
                      console.log(r);
                    })
                    .catch((e) => {
                      console.error(e);
                    });
                }}
                className="bg-red-600 p-2 rounded-md"
              >
                DELETE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;
