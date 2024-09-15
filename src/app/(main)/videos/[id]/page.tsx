"use client";

import { useAction, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Image from "next/image";
import VideoCard from "../../_components/video-card";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { video } from "../../_components/video-search";

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const video = useQuery(api.videos.getVideo, {
    id: params.id as Id<"videos">,
  });

  const [videos, setVideos] = useState<video[]>([]);

  const vidSearch = useAction(api.videos.similarVideos);

  useEffect(() => {
    if (video) {
      console.log("video title:", video.title)
      vidSearch({
        query: video?.title as string,
      }).then((res) => {
        setVideos(res);
      });
    }
  }, [video]);

  if (video === undefined) {
    return <div>Loading...</div>;
  }
  if (video === null) {
    return <div>Video not found</div>;
  }
  return (
    <div className="flex flex-col px-2">
      <div className="relative w-full mb-3">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <PlayIcon className="w-8 h-8 text-white" />
        </div>

        <Image
          src={video.thumbnail}
          alt={video.title}
          width={500}
          height={500}
        />
      </div>
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        {video.description}
      </p>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Upcoming Video</h2>
        <div>
          {videos === undefined && (
            <p className=" text-sm text-muted-foreground">
              Loading related videos
            </p>
          )}
          {videos?.length > 0 &&
            videos
              .slice(1)
              .map((video, index) => (
                <VideoCard
                  key={index}
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnail}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
