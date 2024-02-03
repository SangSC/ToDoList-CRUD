import React from "react";
import { Pencil, CheckCheck, Save } from "lucide-react";

import { API_URL } from "../lib/API_URL";

const EditTask = () => {
  return (
    <div className="text-center">
      <button
        title="Edit"
        className="edit-btn flex justify-center items-center"
      >
        <Pencil className="w-[14px] h-[14px]" />
      </button>
    </div>
  );
};

export default EditTask;
