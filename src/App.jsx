import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Stats from "./pages/Stats";
import Inventory from "./pages/Inventory";
import Duel from "./pages/Duel";
import Travel from "./pages/Travel";
import World from "./pages/World";
import Transfer from "./pages/Transfer";
import Login from "./pages/Login";
import Result from "./pages/Result";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Shop from "./pages/Shop";

import Admin from "./pages/admin/Admin";
import Item from "./pages/admin/Item";
import Inv from "./pages/admin/Inv";
import Enemy from "./pages/admin/Enemy";
import Loot from "./pages/admin/Loot";

import ItemCreate from "./pages/admin/ItemCreate";
import ItemUpdate from "./pages/admin/ItemUpdate";
import ItemDelete from "./pages/admin/ItemDelete";

import InvAdd from "./pages/admin/InvAdd";
import InvDelete from "./pages/admin/InvDelete";

import EnemyCreate from "./pages/admin/EnemyCreate";
import EnemyDelete from "./pages/admin/EnemyDelete";

import LootCreate from "./pages/admin/LootCreate";
import LootDelete from "./pages/admin/LootDelete";

function App() {
  const loggedUser = localStorage.getItem("mc_user");
  console.log(loggedUser);

  const jObj = {
    _id: "Name",
    name: "Name",
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/world/:biome" element={<World />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/:pUser" element={<Inventory />} />
        <Route path="/duel" element={<Duel />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/dummy" element={<Result something={jObj} />} />
        <Route path="/stats/:pUser" element={<Stats />} />
        <Route path="/shop/:pMerchant" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/item" element={<Item />} />
        <Route path="/inv" element={<Inv />} />
        <Route path="/enemy" element={<Enemy />} />
        <Route path="/loot" element={<Loot />} />
        <Route path="/item/create" element={<ItemCreate />} />
        <Route path="/item/update" element={<ItemUpdate />} />
        <Route path="/item/delete" element={<ItemDelete />} />
        <Route path="/inv/add" element={<InvAdd />} />
        <Route path="/inv/delete" element={<InvDelete />} />
        <Route path="/enemy/create" element={<EnemyCreate />} />
        <Route path="/enemy/delete" element={<EnemyDelete />} />
        <Route path="/loot/create" element={<LootCreate />} />
        <Route path="/loot/delete" element={<LootDelete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
