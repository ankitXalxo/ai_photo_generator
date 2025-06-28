import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  createRoutesStub,
} from "react-router-dom";

import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header className="w-full flex  justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebbf4]">
          <Link to="/">
            <h1 className="font-bold text-[#222328] text-[26px]">
              Black-Forest-Labs
            </h1>
            {/* <img src={logo} alt="" className="w-28 object-contain" /> */}
          </Link>
          <Link
            to="/create-post"
            className="font-inter fond-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
        </header>
        <main className="sm:p-8 px-4 py-8 w-full  min-h-[calc(100vh-73px)] bg-slate-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
