"use client";
import { z } from "zod";

const status = z.union([z.literal("Ожидание"), z.literal("В работе"), z.literal("Выполнено")]).default("Ожидание");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
    title: z.string().min(5).max(25).default(""),
    description: z.string().min(10).max(200).optional().default(""),
    status
});

export default formSchema;
export type TaskStatus = z.infer<typeof status>;
export type FormSchema = z.infer<typeof formSchema>;