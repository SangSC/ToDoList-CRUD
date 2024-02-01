export const getTasks = async () => {
  const res = await fetch("https://wayi.league-funny.com/api/task");
  return res.json();
};
