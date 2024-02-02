"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
import { Textarea } from "@/components/ui/textarea";

import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import { SelectStatus } from "./create/SelectStatus";

// crud
import { Crud, CrudListComponent } from "./auto-crud/type";

export const AddNew = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [is_completed, setIsCompleted] = useState(false);

  // openSheet/closeSheet
  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  async function addTask() {
    const res = await fetch("https://wayi.league-funny.com/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: name,
          description: description,
          is_completed: is_completed,
        },
      ]),
    });
    const data = await res.json();
    router.refresh();
    setName("");
    setDescription("");
    setIsCompleted(false);

    // Close the sheet after submission
    closeSheet();
  }

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
                    {/* task name */}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Task Name</Label>
                      <Input
                        id="name"
                        placeholder="Name of your Task"
                        value={name}
                        maxLength={10}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    {/* task description */}
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="description">Task Description</Label>
                      <Textarea
                        placeholder="Type your content here."
                        id="description"
                        maxLength={100}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                    {/* task status */}
                    <Select
                      value={is_completed.toString()}
                      onValueChange={(value: string) =>
                        setIsCompleted(value === "true")
                      }
                    >
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
                  </div>
                </form>
                <SheetFooter className="mt-4">
                  <SheetClose>
                    <Button
                      type="submit"
                      style={{ width: "100%" }}
                      onClick={addTask}
                    >
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
