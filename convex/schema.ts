import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  // Email leads for PDF downloads
  emailLeads: defineTable({
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
    createdAt: v.number(),
    deviceId: v.optional(v.string()),
  }).index("by_email", ["email"])
    .index("by_created", ["createdAt"])
    .index("by_device", ["deviceId", "createdAt"]),

  // Saved plans for authenticated users
  savedPlans: defineTable({
    userId: v.id("users"),
    country: v.string(),
    city: v.optional(v.string()),
    lifestyle: v.string(),
    stayLength: v.number(),
    housingType: v.string(),
    travelerType: v.string(),
    workStyle: v.string(),
    total: v.number(),
    breakdownJson: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_date", ["userId", "createdAt"]),

  // Rate limiting tracker
  rateLimits: defineTable({
    deviceId: v.string(),
    submissions: v.array(v.number()),
  }).index("by_device", ["deviceId"]),
});
