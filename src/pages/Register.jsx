import { useEffect, useState } from "react";
import { local_cloud_url } from "../utils/connection.utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [getBg, setBg] = useState(0);
  const images = [
    "https://terraria.wiki.gg/images/2/20/Corruption_background_3.png?a5cb95",
    "https://terraria.wiki.gg/images/9/9c/Forest_background_1.png?e2477a",
    "https://terraria.wiki.gg/images/e/e7/Crimson_background_3.png?f75540",
    "https://terraria.wiki.gg/images/a/aa/Hallow_background_3.png?a61783",
    "https://terraria.wiki.gg/images/f/f9/Jungle_background_2.png?912c44",
  ];

  const imageOptions = [
    {
      display: "Forest",
      bg: "https://terraria.wiki.gg/images/9/9c/Forest_background_1.png?e2477a",
    },
    {
      display: "Jungle",
      bg: "https://terraria.wiki.gg/images/f/f9/Jungle_background_2.png?912c44",
    },
    {
      display: "Corruption",
      bg: "https://terraria.wiki.gg/images/2/20/Corruption_background_3.png?a5cb95",
    },
    {
      display: "Crimson",
      bg: "https://terraria.wiki.gg/images/e/e7/Crimson_background_3.png?f75540",
    },
    {
      display: "Hallow",
      bg: "https://terraria.wiki.gg/images/a/aa/Hallow_background_3.png?a61783",
    },
  ];

  const spriteOptions = [
    {
      display: "Guider",
      sprite: "https://terraria.wiki.gg/images/7/7f/Guide.png?eebef6",
    },
    {
      display: "Old Man",
      sprite:
        "https://terraria.wiki.gg/images/9/9c/Guide_%28Shimmered%29.png?cd416c",
    },
    {
      display: "Fabulous Guy",
      sprite:
        "https://terraria.wiki.gg/images/1/1b/Clothier_%28Shimmered%29.png?4e0d40",
    },
    {
      display: "Eastern Traveller",
      sprite:
        "https://terraria.wiki.gg/images/6/6a/Dye_Trader_%28Shimmered%29.png?48d2a7",
    },
    {
      display: "Shady Dude",
      sprite:
        "https://terraria.wiki.gg/images/a/a5/Wizard_%28Shimmered%29.png?30da07",
    },
    {
      display: "Strongman",
      sprite:
        "https://terraria.wiki.gg/images/5/5c/Tavernkeep_%28Shimmered%29.png?d81b60",
    },
  ];

  const navigate = useNavigate();
  const [getName, setName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getPlayerBg, setPlayerBg] = useState(imageOptions[0].bg);
  const [getPlayerSprite, setPlayerSprite] = useState(spriteOptions[0].sprite);

  useEffect(() => {
    const change = setInterval(() => {
      setBg((p) => (p + 1) % images.length);
    }, 2500);

    return () => clearInterval(change);
  });

  const inputName = (e) => {
    setName(e.target.value);
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-screen h-screen flex overflow-x-hidden overflow-y-auto items-center justify-center font-gemu text-white">
      <ToastContainer position="bottom-center" autoClose={1000} />
      {images.map((e, i) => {
        return (
          <img
            src={e}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === getBg ? "opacity-100 -z-10" : "opacity-0 -z-10"
            }`}
          />
        );
      })}
      <div className="h-4/5 w-1/4 bg-green-600 rounded-xl flex flex-col items-center">
        <div className="w-full h-1/4 flex justify-center items-center">
          <p className="text-2xl font-bold">REGISTER</p>
        </div>
        <div className="w-full h-1/2 flex flex-col items-center justify-center">
          <div className="w-3/4 m-2">
            <p>Name</p>
          </div>
          <input
            className="w-3/4 m-2 bg-green-800 rounded-md px-2"
            type="text"
            onChange={inputName}
          />
          <div className="w-3/4 m-2">
            <p>Email</p>
          </div>
          <input
            className="w-3/4 m-2 bg-green-800 rounded-md px-2"
            type="text"
            onChange={inputEmail}
          />
          <div className="w-3/4 m-2">
            <p>Password</p>
          </div>
          <input
            className="w-3/4 m-2 bg-green-800 rounded-md px-2"
            type="text"
            onChange={inputPassword}
          />
          <div className="w-3/4 m-2">
            <p>Theme</p>
          </div>
          <select
            className="w-3/4 bg-green-800"
            onChange={(e) => {
              setPlayerBg(e.target.value);
            }}
          >
            {imageOptions.map((e, i) => {
              return (
                <option key={i} value={e.bg}>
                  {e.display}
                </option>
              );
            })}
          </select>
          <div className="w-3/4 m-2">
            <p>Character Style</p>
          </div>
          <select
            className="w-3/4 bg-green-800"
            onChange={(e) => {
              setPlayerSprite(e.target.value);
            }}
          >
            {spriteOptions.map((e, i) => {
              return (
                <option key={i} value={e.sprite}>
                  {e.display}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full h-1/4 flex items-center justify-center">
          <button
            className="bg-green-700 hover:bg-green-900 p-4 rounded-xl"
            onClick={async () => {
              console.log(getPassword);
              await local_cloud_url
                .post("/user/create", {
                  name: getName,
                  email: getEmail,
                  password: getPassword,
                  bg: getPlayerBg,
                  sprite: getPlayerSprite,
                })
                .then((e) => {
                  const r = e.data;
                  console.log(r);

                  if (r.success) {
                    console.log("New user registered!");
                    localStorage.setItem("mc_user", r.payload._id);
                    toast.success("Register success!", {
                      onClose: () => {
                        navigate("/home");
                      },
                    });
                  }
                })
                .catch((e) => console.error(e));
            }}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
