import React from "react";

const Button = (props) => {
  return (
    <button className="bg-primary text-white font-clicker text-lg px-6 py-2 mt-4 rounded-full hover:bg-pink-950 duration-500">
      {props.children}
    </button>
  );
};

export default Button;
