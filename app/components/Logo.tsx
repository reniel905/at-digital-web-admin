import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col justify-center items-start">
      <h1 className="text-2xl font-bold text-white select-none p-4 pl-0 text-nowrap">
        AT DIGITAL
      </h1>
    </div>
  );
};

export function AdminLogo() {
  return (
    <div className="flex flex-col justify-center items-start">
      <h1 className="text-2xl font-bold text-white select-none p-4 pl-0 text-nowrap">
        AT DIGITAL
        <span className="text-sm font-light text-neutral-300"> Admin</span>
      </h1>
    </div>
  );
}

export default Logo;
