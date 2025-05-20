import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [getBg, setBg] = useState(0);
  const images = [
    "https://terraria.wiki.gg/images/2/20/Corruption_background_3.png?a5cb95",
    "https://terraria.wiki.gg/images/9/9c/Forest_background_1.png?e2477a",
    "https://terraria.wiki.gg/images/e/e7/Crimson_background_3.png?f75540",
    "https://terraria.wiki.gg/images/a/aa/Hallow_background_3.png?a61783",
    "https://terraria.wiki.gg/images/f/f9/Jungle_background_2.png?912c44",
  ];

  const navigate = useNavigate();

  const u = localStorage.getItem("mc_user");

  useEffect(() => {
    const change = setInterval(() => {
      setBg((p) => (p + 1) % images.length);
    }, 2500);

    return () => clearInterval(change);
  });

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
      <div className="h-full w-full flex flex-col">
        <div className="w-full h-1/4 flex justify-center items-center">
          <p className="text-4xl text-amber-500 font-bold">Proyek SBD</p>
        </div>
        <div className="text-2xl w-full h-3/4 p-52 justify-between items-center flex flex-col">
          <button
            onClick={() => {
              console.log(u);

              if (!u) {
                toast.error("No logged in account!");

                return;
              }

              const biome = localStorage.getItem("mc_biome") || "forest";

              toast.success("Welcome back!", {
                onClose: () => {
                  navigate(`/world/${biome}`);
                },
              });
            }}
            className="p-4 bg-green-600 hover:bg-green-800 rounded-md"
          >
            Play
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="p-4 bg-green-600 hover:bg-green-800 rounded-md"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="p-4 bg-green-600 hover:bg-green-800 rounded-md"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
