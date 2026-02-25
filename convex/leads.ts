import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS = 3;

export const submitLead = mutation({
  args: {
    email: v.string(),
    consent: v.boolean(),
    country: v.string(),
    city: v.optional(v.string()),
    lifestyle: v.string(),
    stayLength: v.number(),
    housingType: v.string(),
    travelerType: v.string(),
    workStyle: v.string(),
    total: v.number(),
    breakdownJson: v.string(),
    deviceId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Check rate limit
    const rateLimit = await ctx.db
      .query("rateLimits")
      .withIndex("by_device", (q) => q.eq("deviceId", args.deviceId))
      .first();

    if (rateLimit) {
      const recentSubmissions = rateLimit.submissions.filter(
        (t) => now - t < RATE_LIMIT_WINDOW
      );

      if (recentSubmissions.length >= MAX_SUBMISSIONS) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }

      await ctx.db.patch(rateLimit._id, {
        submissions: [...recentSubmissions, now],
      });
    } else {
      await ctx.db.insert("rateLimits", {
        deviceId: args.deviceId,
        submissions: [now],
      });
    }

    // Insert lead
    return await ctx.db.insert("emailLeads", {
      email: args.email,
      consent: args.consent,
      country: args.country,
      city: args.city,
      lifestyle: args.lifestyle,
      stayLength: args.stayLength,
      housingType: args.housingType,
      travelerType: args.travelerType,
      workStyle: args.workStyle,
      total: args.total,
      breakdownJson: args.breakdownJson,
      createdAt: now,
      deviceId: args.deviceId,
    });
  },
});

export const listLeads = query({
  args: { passcode: v.string() },
  handler: async (ctx, args) => {
    // Simple passcode protection
    if (args.passcode !== "traveltool2024admin") {
      return [];
    }

    return await ctx.db
      .query("emailLeads")
      .withIndex("by_created")
      .order("desc")
      .collect();
  },
});

export const exportLeadsCSV = query({
  args: { passcode: v.string() },
  handler: async (ctx, args) => {
    if (args.passcode !== "traveltool2024admin") {
      return "";
    }

    const leads = await ctx.db
      .query("emailLeads")
      .withIndex("by_created")
      .order("desc")
      .collect();

    const headers = ["id", "email", "consent", "country", "city", "lifestyle", "stay_length", "housing_type", "traveler_type", "work_style", "total", "breakdown_json", "created_at"];
    const rows = leads.map(lead => [
      lead._id,
      lead.email,
      lead.consent,
      lead.country,
      lead.city || "",
      lead.lifestyle,
      lead.stayLength,
      lead.housingType,
      lead.travelerType,
      lead.workStyle,
      lead.total,
      lead.breakdownJson,
      new Date(lead.createdAt).toISOString(),
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));

    return [headers.join(","), ...rows].join("\n");
  },
});
