import React, { ReactNode, useRef, useState } from "react";
import { Image } from "@/base/components/common/image";
import { Box, DropdownList, DropdownListOptions } from "../layout";
import { useDetectOutside } from "@/base/components/hooks";
import { motion } from "framer-motion";
import { Select } from "../select";
import SelectItem, { SelectItemProps } from "../select/SelectItem";
import { v4 as uuidv4 } from "uuid";

const Check = motion(DropdownList);
const DropdownHeader = () => {
  const options: DropdownListOptions[] = [
    {
      label: "Settings",
      action: () => {
        console.log("onClick Settings");
      },
    },
    {
      label: "Logout",
      action: () => {
        console.log("onClick Logout");
      },
    },
  ];
  const [isShowDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef();
  useDetectOutside({
    ref: dropdownRef,
    onOutsideClick: () => {
      setShowDropdown(false);
    },
  });
  const langOptions: { label: ReactNode; value: string }[] = [
    {
      label: "English",
      value: "en",
    },
    {
      label: "Korean",
      value: "ko",
    },
    {
      label: "Vietnamese",
      value: "vi",
    },
  ];
  return (
    <header className="h-header-sm flex justify-between bg-red-400 absolute inset-x-0 py-1 px-3 items-center">
      <Image url="/image/mango.png" className="w-10" ratio="square"></Image>
      <Box flex className="">
        <Select
          className="font-semibold "
          label="Language"
          onChange={(value) => console.log(value)}>
          {langOptions.map(({ label, value }) => (
            <SelectItem key={uuidv4()} value={value}>
              {label}
            </SelectItem>
          ))}
        </Select>
        <Box ref={dropdownRef} className="w-[10rem]">
          <span
            className="cursor-pointer"
            onClick={() => setShowDropdown(!isShowDropdown)}>
            Thanh Phong
          </span>
          {isShowDropdown && (
            <DropdownList options={options} className="absolute"></DropdownList>
          )}
        </Box>
      </Box>
    </header>
  );
};

export default DropdownHeader;
