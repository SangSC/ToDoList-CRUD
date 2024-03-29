"use client";

// import TaskPage from "@/components/tasks/TaskPage";
import HeadingText from "@/components/HeadingText";
import { AddNew } from "@/components/AddNew";
import { DataTable } from "@/components/tasks/data-table";
import { TaskTable } from "@/components/TaskTable";

export default function Home() {
  return (
    <main className="mx-[10px] xl:mx-[20px]">
      <HeadingText title="Your Tasks" subtitle="Keep Moving Forward" />
      <TaskTable />
      {/* <TaskPage /> */}
      <AddNew />
    </main>
  );
}
