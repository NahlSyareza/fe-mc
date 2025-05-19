import { useEffect, useState } from "react";
import { local_cloud_url } from "../utils/connection.utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [getBg, setBg] = useState(0);
  const images = [
    "https://terraria.wiki.gg/images/2/20/Corruption_background_3.png?a5cb95",
    "https://terraria.wiki.gg/images/9/9c/Forest_background_1.png?e2477a",
    "https://terraria.wiki.gg/images/e/e7/Crimson_background_3.png?f75540",
    "https://terraria.wiki.gg/images/a/aa/Hallow_background_3.png?a61783",
    "https://terraria.wiki.gg/images/f/f9/Jungle_background_2.png?912c44",
  ];

  const navigate = useNavigate();
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  useEffect(() => {
    const change = setInterval(() => {
      setBg((p) => (p + 1) % images.length);
    }, 2500);

    return () => clearInterval(change);
  });

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
      <div className="h-3/5 w-1/4 bg-green-600 rounded-xl flex flex-col items-center">
        <div className="w-full h-1/3 flex justify-center items-center">
          <p className="text-2xl font-bold">LOGIN</p>
        </div>
        <div className="w-full h-1/3 flex flex-col items-center justify-center">
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
        </div>
        <div className="w-full h-1/3 flex items-center justify-center">
          <button
            className="bg-green-700 hover:bg-green-900 p-4 rounded-xl"
            onClick={async () => {
              await local_cloud_url
                .post("/user/login", {
                  email: getEmail,
                  password: getPassword,
                })
                .then((e) => {
                  const r = e.data;
                  console.log(r);

                  if (r.success) {
                    console.log("New user logged in!");
                    localStorage.setItem("mc_user", r.payload._id);
                    toast.success("Login succesful!", {
                      onClose: () => {
                        navigate("/home");
                      },
                    });
                  }
                })
                .catch((e) => console.error(e));
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
