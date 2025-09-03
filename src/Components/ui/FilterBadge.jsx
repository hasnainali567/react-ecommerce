import React, { memo } from "react";

const FilterBadge = ({ onClick, Label, className }) => {
  return (
    <button
      className={`cursor-pointer flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#2a273a] p-4 ${className}`}
      onClick={onClick}
    >
      <p className='text-white text-sm font-medium leading-normal'>{Label}</p>
    </button>
  );
};

export default memo(FilterBadge);
