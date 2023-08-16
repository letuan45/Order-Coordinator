import React from "react";
import { MutatingDots } from "react-loader-spinner";

const LoadingSpinner = ({ height, width, color = "#3498db" }) => {
  return (
    <div className="relative w-full">
      <div className="relative left-1/2 w-fit -translate-x-1/2">
        <MutatingDots
          height={height}
          width={width}
          color={color}
          secondaryColor={color}
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
