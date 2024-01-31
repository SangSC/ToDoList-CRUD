"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AddNew } from "@/components/AddNew";

const TaskPageDynamic = dynamic(() => import("@/components/tasks/TaskPage"), {
  ssr: true,
});

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <main>
      <TaskPageDynamic />
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Add New Task</div>}
        onClick={openSheet}
      />
      {isSheetOpen && <AddNew onClose={closeSheet} />}
    </main>
  );
}
