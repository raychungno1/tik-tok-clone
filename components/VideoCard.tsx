import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import { Video } from "../types";

interface IProps {
  post: Video;
}
const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onPlayPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded">
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="md:w-16 md:h-16 w-10 h-10 cursor-pointer ">
                <Image
                  width={62}
                  height={62}
                  className="object-cover rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                ></Image>
            </div>
          </Link>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2 cursor-pointer ">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop
              className="w-[200px] lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] rounded-2xl cursor-pointer bg-black"
              src={post.video.asset.url}
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-6 lg:l-0 flex gap-10 lg:justify-between w-[100px] md:[50px] mx-6 md:mx-0">
              {playing ? (
                <button onClick={onPlayPress}>
                  <BsFillPauseFill className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onPlayPress}>
                  <BsFillPlayFill className="text-white text-2xl lg:text-4xl" />
                </button>
              )}
              {muted ? (
                <button onClick={() => setMuted(false)}>
                  <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setMuted(true)}>
                  <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
