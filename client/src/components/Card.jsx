import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
  if (!_id || !name || !prompt || !photo) {
    console.error("Error: Card received undefined props", {
      _id,
      name,
      prompt,
      photo,
    });
    return null; // Prevent rendering if data is missing
  }

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        src={photo}
        alt={prompt}
        className="w-full h-auto object-cover rounded-xl"
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-md overflow-y-auto">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name ? name[0] : "?"}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent"
          >
            <img
              src={download}
              alt="Download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
