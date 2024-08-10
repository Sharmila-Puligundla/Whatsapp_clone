import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get tasks
export const getTasks = query({
    args : {},
    handler: async (ctx, args) => {
    const tasks = await ctx.db.query("tasks").collect();
    return tasks;
  },
});

// Mutation to add a task
export const addTask = mutation({
    args: {
        text: v.string(),
    },
  handler: async (ctx , args) => {
    const taskId = await ctx.db.insert("tasks", { text: args.text, completed: false });

    return taskId;
  },
});


// Mutation to complete a task
export const completeTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { completed: true });
  },
});

// Mutation to delete a task
export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
