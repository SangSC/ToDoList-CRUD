import React, { useState } from "react";
import { Pencil, CheckCheck, Save } from "lucide-react";
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
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { API_URL } from "../lib/API_URL";

interface Props {
  id: number;
  name: string;
  description: string;
  is_completed: boolean;
}

const EditTask: React.FC<Props> = ({ id, name, description, is_completed }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentStatus, setCurrentStatus] = useState(is_completed);

  async function handleUpdate() {
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: currentName,
        description: currentDescription,
      }),
    });
    const data = await res.json();
    setOnEdit(false);
    router.refresh();
  }

  async function handleDone() {
    if (currentStatus === true) {
      setCurrentStatus(false);
    } else {
      setCurrentStatus(true);
    }

    const res = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        is_completed: currentStatus,
      }),
    });
    const data = await res.json();
    router.refresh();
  }

  return (
    <>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <div className="text-center">
              <button
                title="Edit"
                className="edit-btn flex justify-center items-center"
              >
                <Pencil className="w-[14px] h-[14px]" />
              </button>
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Edit Task</SheetTitle>
              <SheetDescription>Edit your task. </SheetDescription>
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
                    onChange={(e) => setCurrentName(e.target.value)}
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
                    onChange={(e) => setCurrentDescription(e.target.value)}
                    required
                  />
                </div>
                {/* task status */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_completed"
                    onCheckedChange={(checked: boolean) =>
                      setCurrentStatus(checked)
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
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default EditTask;
