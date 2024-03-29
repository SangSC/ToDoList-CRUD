import { User } from "../app/completed/schema";

const users: User[] = [{ username: "Alice", password: "qwert1234" }];

export const fetchUsers = async () => {
  return {
    total: users.length,
    users: users.map((user, id) => ({ id, username: user.username })),
  };
};

export const createUser = async (user: User) => {
  await sleep(1000);
  if (users.find((u) => u.username === user.username)) {
    throw new Error("Username already exists");
  }
  users.push(user);
};

export const readUser = async (id: number) => {
  await sleep(500);
  return users[id]!; // TODO: handle undefined
};

export const updateUser = async (id: number, user: User) => {
  await sleep(1000);
  users[id] = user;
};

export const deleteUser = async (id: number) => {
  await sleep(1000);
  users.splice(id, 1);
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
