import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export function SelectStatus() {
  return (
    <Select defaultValue="false">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select the Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="true">
            <CheckOutlined /> Completed
          </SelectItem>
          <SelectItem value="false">
            <CloseOutlined /> Unfinished
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
