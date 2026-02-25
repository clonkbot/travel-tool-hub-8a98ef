import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const savePlan = mutation({
  args: {
    country: v.string(),
    city: v.optional(v.string()),
    lifestyle: v.string(),
    stayLength: v.number(),
    housingType: v.string(),
    travelerType: v.string(),
    workStyle: v.string(),
    total: v.number(),
    breakdownJson: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("savedPlans", {
      userId,
      country: args.country,
      city: args.city,
      lifestyle: args.lifestyle,
      stayLength: args.stayLength,
      housingType: args.housingType,
      travelerType: args.travelerType,
      workStyle: args.workStyle,
      total: args.total,
      breakdownJson: args.breakdownJson,
      createdAt: Date.now(),
    });
  },
});

export const listPlans = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("savedPlans")
      .withIndex("by_user_date", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const deletePlan = mutation({
  args: { id: v.id("savedPlans") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const plan = await ctx.db.get(args.id);
    if (!plan || plan.userId !== userId) {
      throw new Error("Plan not found");
    }

    await ctx.db.delete(args.id);
  },
});

export const getPlan = query({
  args: { id: v.id("savedPlans") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const plan = await ctx.db.get(args.id);
    if (!plan || plan.userId !== userId) return null;

    return plan;
  },
});
