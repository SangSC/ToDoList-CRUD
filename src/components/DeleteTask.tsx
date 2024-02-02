import { useRouter } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

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
    <div>
      <Button title="Delete" onClick={handleDelete}>
        <TrashIcon />
      </Button>
    </div>
  );
};

export default DeleteTask;
