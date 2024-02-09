import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

import { API_URL } from "../lib/API_URL";

interface DeleteTaskProps {
  id: number;
  onDelete: () => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ id, onDelete }) => {
  const router = useRouter();

  async function handleDelete() {
    const deletedId = id;
    await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([deletedId]),
    });
    onDelete(); // Call the onDelete prop when deletion is successful
    router.refresh();
  }

  const notify = () =>
    toast(
      (t) => (
        <span>
          Are you sure you want to delete?
          <button
            className="border-2 border-black border-opacity-50 rounded px-2 ml-4 "
            onClick={() => {
              handleDelete();
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
        onClick={notify}
        className="del-btn flex justify-center items-center"
      >
        <Trash2 className="w-[14px] h-[14px]" />
      </button>
      <Toaster />
    </div>
  );
};

export default DeleteTask;
