import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitUser = mutation({
  args: {
    name: v.string(),
    instagramId: v.string(),
    gender: v.union(v.literal("m"), v.literal("f")),
  },
  handler: async (ctx, args) => {
    const docId = await ctx.db.insert("users", {
      name: args.name,
      instagramId: args.instagramId,
      gender: args.gender,
      createdAt: Date.now(),
    });
    return docId;
  },
});

export const getRandomOpposite = query({
  args: {
    gender: v.union(v.literal("m"), v.literal("f")),
  },
  handler: async (ctx, args) => {
    const oppositeGender = args.gender === "m" ? "f" : "m";
    
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("gender"), oppositeGender))
      .collect();
    
    if (users.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  },
});
