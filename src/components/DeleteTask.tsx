import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { API_URL } from "../lib/API_URL";

const DeleteTask = () => {
  const router = useRouter();

  async function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.id;
    await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([id]),
    });
    router.refresh();
  }
  const notify = () =>
    toast(
      (t) => (
        <span>
          Are you sure you want to delete?
          <button
            className="border-2 border-black border-opacity-50 rounded px-2 ml-4 "
            onClick={(event) => {
              handleDelete(event);
              toast.dismiss(t.id);
            }}
          >
            OK
          </button>
        </span>
      ),
      {
        icon: <Trash2 className="text-red-500" />,
      }
    );

  return (
    <div className="text-center">
      <button
        title="Delete"
        onClick={(event) => {
          notify();
        }}
        className="del-btn flex justify-center items-center"
      >
        <Trash2 className="w-[14px] h-[14px]" />
      </button>
      <Toaster />
    </div>
  );
};

export default DeleteTask;
