import { v } from "convex/values";
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";
import { embed } from "../src/lib/embedd";
import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const fetchVideosData = internalQuery({
  args: { ids: v.array(v.id("videos")) },
  handler: async (ctx, args) => {
    const results = [];
    for (const id of args.ids) {
      const video = await ctx.db.get(id);
      if (video) {
        results.push(video);
      }
    }
    return results;
  },
});

export const similarVideos = action({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const embeddings = await embed(args.query);
    console.log(embeddings);

    const result = await ctx.vectorSearch("videos", "by_search", {
      vector: embeddings,
      limit: 2,
      //TODO: add filter
    });

    const videoIds = result.map((r) => r._id);

    const videos: Array<Doc<"videos">> = await ctx.runQuery(
      internal.videos.fetchVideosData,
      { ids: videoIds }
    );
    return videos;
  },
});

export const insertVideos = internalMutation({
  args: {
    title: v.string(),
    url: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    category: v.string(),
    embeddings: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    //checks
    if (
      !args.title ||
      !args.url ||
      !args.description ||
      !args.thumbnail ||
      !args.category ||
      !args.embeddings
    ) {
      throw new Error("Missing required fields");
    }

    const video = await ctx.db.insert("videos", {
      title: args.title,
      url: args.url,
      description: args.description,
      thumbnail: args.thumbnail,
      category: args.category,
      embeddings: args.embeddings,
    });
    return video;
  },
});

export const addVideo = action({
  args: {
    title: v.string(),
    url: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    //checks
    if (
      !args.title ||
      !args.url ||
      !args.description ||
      !args.thumbnail ||
      !args.category
    ) {
      throw new Error("Missing required fields");
    }

    console.log(args.title);

    const embeddings = await embed(args.title);
    await ctx.runMutation(internal.videos.insertVideos, {
      title: args.title,
      url: args.url,
      description: args.description,
      thumbnail: args.thumbnail,
      category: args.category,
      embeddings: embeddings,
    });

    return true;
  },
});

export const allVideos = query({
  args: {},
  handler: async (ctx) => {
    const videos = await ctx.db.query("videos").collect();
    return videos;
  },
});

export const getVideo = query({
  args: {
    id: v.id("videos"),
  },
  handler: async (ctx, args) => {
    if (!args.id) {
      return null;
    }

    const video = await ctx.db.get(args.id);
    return video;
  },
});
