import React from "react";

const ProductLoading = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Title + Description */}
      <div className="mb-4">
        <div className="h-6 w-1/3 bg-dark-secondary rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-dark-secondary rounded mb-2"></div>
        <div className="h-4 w-20 bg-dark-secondary rounded"></div>
      </div>

      {/* Images Section */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-5 w-full">
        {/* Main big image */}
        <div className="sm:w-3/4">
          <div className="w-full h-full min-h-80 bg-dark-secondary rounded-lg"></div>
        </div>

        {/* Small preview images */}
        <div className="sm:w-1/4 flex sm:flex-col gap-2 sm:gap-4 md:gap-5">
          <div className="w-full min-w-1/3 h-40 bg-dark-secondary rounded-lg"></div>
          <div className="w-full min-w-1/3 h-40 bg-dark-secondary rounded-lg"></div>
          <div className="w-full min-w-1/3 h-40 bg-dark-secondary rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
