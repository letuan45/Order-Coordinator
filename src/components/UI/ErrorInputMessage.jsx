import React from 'react';
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

const ErrorInputMessage = ({value}) => {
  return (
    <div className="my-1">
      <Typography
        variant="small"
        color="red"
        className="flex items-center gap-1 font-normal"
      >
        <InformationCircleIcon className="-mt-px h-4 w-4" />
        {value}
      </Typography>
    </div>
  );
}

export default ErrorInputMessage