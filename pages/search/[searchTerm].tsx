import React, { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const { allUsers } = useAuthStore();

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-5 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div>
          {searchedAccounts.length ? (
            searchedAccounts.map((user: IUser, i: number) => (
              <div className="flex items-center gap-3 font-semibold rounded p-2 border-b-2 border-gray-200" key={i}>
                <Link href={`/profile/${user._id}`}>
                  <div className="w-8 h-8 cursor-pointer">
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="object-cover rounded-full"
                      alt="user profile"
                    />
                  </div>
                </Link>
                <Link href={`/profile/${user._id}`}>
                  <div className="cursor-pointer">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(" ", "")}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <NoResults text={`No accounts for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video, i) => <VideoCard post={video} key={i} />)
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Search;
