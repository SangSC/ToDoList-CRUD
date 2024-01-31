import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import TaskPage from "@/components/tasks/TaskPage";
import { AddNew } from "@/components/AddNew";

export default function Home() {
  return (
    <main>
      <TaskPage />
      <AddNew />
    </main>
  );
}
