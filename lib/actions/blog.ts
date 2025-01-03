"use server";

import { createSupabaseServerClient } from "@/utils/supabase/sever.ts";
import { BlogFormSchemaType } from "@/app/dashboard/schema/index.tsx";
import { revalidatePath } from "next/cache";

const supabase = createSupabaseServerClient();
const DASHBOARD = "/dashboard";
export async function createBlog(data: BlogFormSchemaType) {
  const { ["content"]: excludedKey, ...blog } = data;

  const resultBlog = await supabase
    .from("blog")
    .insert(blog)
    .select("id")
    .single();

  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .insert({ blog_id: resultBlog.data.id, content: data.content });

    return JSON.stringify(result);
  }
}

export async function readBlog() {
  return supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: true });
}

export async function deleteBlogById(blogId: string) {
  const result = await supabase.from("blog").delete().eq("id", blogId);
  revalidatePath(DASHBOARD);
  return JSON.stringify(result);
}

export async function updateBlogById(blogId: string, data: BlogFormSchemaType) {
  const result = await supabase.from("blog").update(data).eq("id", blogId);
  revalidatePath(DASHBOARD);
  return JSON.stringify(result);
}
