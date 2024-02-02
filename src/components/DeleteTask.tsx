import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

const DeleteTask = () => {
  const router = useRouter();

  async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.id;
    await fetch("https://wayi.league-funny.com/api/task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([id]),
    });
    router.refresh();
  }

  return (
    <div className="text-center">
      <button
        title="Delete"
        onClick={handleDelete}
        className="del-btn flex justify-center items-center"
      >
        <Trash2 className="w-[14px] h-[14px]" />
      </button>
    </div>
  );
};

export default DeleteTask;
