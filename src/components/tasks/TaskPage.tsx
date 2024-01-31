import Image from "next/image";
import { z } from "zod";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { taskSchema } from "./data/schema";

// Simulate a database read for tasks.
const getTasks = async () => {
  const res = await fetch("http://localhost:4000/tasks");
  return res.json();
};
const TaskPage = async () => {
  const tasks = await getTasks();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
};

export default TaskPage;
