"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface AddNewProps {
  onClose: () => void;
}

export const AddNew: React.FC<AddNewProps> = ({ onClose }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    onClose(); // Close the sheet
  };

  return (
    <>
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Add New Task</div>}
        onClick={openSheet}
      />
      {isSheetOpen && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <FloatButton
                  icon={<PlusOutlined />}
                  tooltip={<div>Add New Task</div>}
                />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Add New Task</SheetTitle>
                  <SheetDescription>Make your new task. </SheetDescription>
                </SheetHeader>
                <form className="mt-8">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="task-name">Task Name</Label>
                      <Input id="task-name" placeholder="Name of your Task" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="description">Task Description</Label>
                      <Textarea
                        placeholder="Type your content here."
                        id="description"
                      />
                    </div>
                  </div>
                </form>
                <SheetFooter className="mt-4">
                  <SheetClose>
                    <Button type="submit">Add New</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </>
  );
};
