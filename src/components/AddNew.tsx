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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// crud
import { API_URL } from "../lib/API_URL";
import { Crud, CrudListComponent } from "./auto-crud/type";

export const AddNew = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [is_completed, setIsCompleted] = useState(true);

  // openSheet/closeSheet
  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  async function addTask() {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          is_completed: is_completed,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const responseData = await res.json();
      console.log("Task created successfully:", responseData.data);

      // Do any additional processing if needed

      router.refresh();
      setName("");
      setDescription("");
      setIsCompleted(false);
      closeSheet();
    } catch (error) {
      console.error("Error during fetch:", error);
    }
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
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_completed"
                        onCheckedChange={(checked: boolean) =>
                          setIsCompleted(checked)
                        }
                        checked={is_completed}
                      />
                      <Label htmlFor="is_completed">
                        <CheckOutlined /> Completed
                      </Label>
                    </div>
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
