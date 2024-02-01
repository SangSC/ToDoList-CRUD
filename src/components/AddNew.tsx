"use client";
import { addTask } from "@/lib/action";
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
import { SelectStatus } from "./create/SelectStatus";

// crud
import { Crud, CrudListComponent } from "./auto-crud/type";

interface AddNewProps {
  onClose: () => void;
  addTask: (FormData: any) => Promise<void>;
}

export const AddNew: React.FC<AddNewProps> = ({ onClose, addTask }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    onClose(); // Close the sheet
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get form data
    const formData = {
      taskName: (event.target as any).elements["taskName"].value,
      description: (event.target as any).elements["description"].value,
      // Add other form fields as needed
    };

    try {
      // Call the addTask function
      await addTask(formData);
      console.log("Task successfully added!");

      // Optionally, you can do something after the task is added
    } catch (error) {
      console.error("Error adding task:", error);
    }

    // Close the sheet after submission
    closeSheet();
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
                <form className="mt-8" onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    {/* task name */}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="taskName">Task Name</Label>
                      <Input
                        id="taskName"
                        placeholder="Name of your Task"
                        maxLength={10}
                      />
                    </div>
                    {/* task description */}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="description">Task Description</Label>
                      <Textarea
                        placeholder="Type your content here."
                        id="description"
                        maxLength={100}
                      />
                    </div>
                    {/* task status */}
                    <SelectStatus />
                  </div>
                </form>
                <SheetFooter className="mt-4">
                  <SheetClose>
                    <Button type="submit" style={{ width: "100%" }}>
                      Add New
                    </Button>
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
