"use server";
import Task from "@/models/Task";
import db from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addTask = async (FormData) => {
  const { taskName, description, is_completed } = Object.fromEntries(FormData);
  console.log("addTask function called with:", FormData);

  try {
    db.connect();
    const newTask = new Task({
      taskName,
      description,
      is_completed,
    });
    await newTask.save();
  } catch (error) {
    throw new Error("Failed To Create Task " + error);
    console.error("Failed To Create Task " + error);
  }
  revalidatePath("/");
  redirect("/");
};

export const updateTask = async (FormData) => {
  const { id, taskName, description, is_completed } =
    Object.fromEntries(FormData);
  try {
    db.connect();
    const updateFields = {
      taskName,
      description,
      is_completed,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    await Task.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    throw new Error("Failed To Update Task " + error);
  }
  revalidatePath("/");
  redirect("/");
  console.log("addTask function completed");
};

export const deleteTask = async (FormData) => {
  const { id } = Object.fromEntries(FormData);
  try {
    db.connect();
    await Task.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed To Delete Task " + error);
  }
  revalidatePath("/");
};
