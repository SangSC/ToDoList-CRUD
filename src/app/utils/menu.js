import { allList, done, undone, warn } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: allList,
    link: "/",
  },
  {
    id: 2,
    title: "Do It Now",
    icon: undone,
    link: "/incomplete",
  },
  {
    id: 3,
    title: "Completed!",
    icon: done,
    link: "/completed",
  },

  {
    id: 4,
    title: "Important!",
    icon: warn,
    link: "/important",
  },
];

export default menu;
