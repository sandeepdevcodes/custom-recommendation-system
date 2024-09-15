"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import VideoCard from "./video-card";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export interface video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
}
export const VideoSearch = () => {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<video[]>([]);

  const vidSearch = useAction(api.videos.similarVideos);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    if (search.length < 1) {
      alert("Please enter a search query");
      return;
    }
    const videos = await vidSearch({ query: search });
    setVideos(videos);
  };
  return (
    <div className="">
      <div className="flex items-center justify-center gap-x-4">
        <Input
          onChange={handleChange}
          placeholder="Search"
          className=" border-muted-foreground/60"
        />
        <Button
          disabled={vidSearch === undefined}
          variant={"secondary"}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      <div className=" my-5 flex flex-col gap-y-4 items-center justify-center gap-x-4">
        {vidSearch === undefined && <div>Loading...</div>}

        {vidSearch !== undefined && videos.length > 0 && (
          videos.map((video) => (
            <VideoCard
              key={video._id}
              title={video.title}
              description={video.description}
              thumbnail={video.thumbnail}
            />
          ))
        )}
      </div>
    </div>
  );
};
