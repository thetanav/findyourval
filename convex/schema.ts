import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    instagramId: v.string(),
    gender: v.union(v.literal("m"), v.literal("f")),
    createdAt: v.number(),
  }),
});
