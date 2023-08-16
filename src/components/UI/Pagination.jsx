import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export const Pagination = ({pageSize, onChangePage}) => {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  useEffect(() => {
    onChangePage(active-1);
  }, [active])

  const next = () => {
    if (active === pageSize) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  let pageButtons = [];
  if(pageSize > 0) {
    for (let i = 0; i < pageSize; i++) {
      pageButtons.push(<IconButton key={i} {...getItemProps(i+1)}>{i+1}</IconButton>);
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Trước
      </Button>
      <div className="flex items-center gap-2">{pageButtons}</div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === 5}
      >
        Sau
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};