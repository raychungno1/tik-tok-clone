import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const topicStyle =
    "w-full xl:w-auto xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-3 xl:py-2 rounded xl:rounded-full flex items-center gap-3 justify-center cursor-pointer text-black";
  const activeTopicStyle =
    "w-full xl:w-auto xl:border-2 hover:bg-primary xl:border-[#f51997] px-3 py-3 xl:py-2 rounded xl:rounded-full flex items-center gap-3 justify-center cursor-pointer text-[#f51997]";

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-0 xl:gap-3 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md">{item.icon}</span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
