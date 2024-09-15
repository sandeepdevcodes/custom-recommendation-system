"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import VideoCard from "../_components/video-card";
import Link from "next/link";

const Page = () => {
  const videos = useQuery(api.videos.allVideos);

  if (videos === undefined) {
    return <div>Loading...</div>;
  }
  if (videos === null) {
    return <div>Videos not found</div>;
  }
  return (
    <div>
      {videos.map((video, index) => (
        <Link href={`/videos/${video._id}`} key={index}>
          <VideoCard
            title={video.title}
            description={video.description}
            thumbnail={video.thumbnail}
          />
        </Link>
      ))}
    </div>
  );
};

export default Page;
