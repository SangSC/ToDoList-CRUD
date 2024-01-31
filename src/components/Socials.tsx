"use client";

import { RiGithubFill } from "react-icons/ri";
import Link from "next/link";

const icons = [
  {
    path: "https://github.com/SangSC",
    name: <RiGithubFill />,
  },
];

const Socials = ({
  containerStyles,
  iconStyles,
}: {
  containerStyles: string;
  iconStyles: string;
}) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return (
          <Link href={icon.path} key={index} target="_blank">
            <div className={`${iconStyles}`}>{icon.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
