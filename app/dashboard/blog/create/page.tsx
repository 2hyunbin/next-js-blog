"use client";

import React from "react";
import BlogForm from "@/app/dashboard/component/blogForm.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { createBlog } from "@/lib/actions/blog.ts";
import { BlogFormSchemaType } from "@/app/dashboard/schema/index.tsx";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleCreate = async (data: BlogFormSchemaType) => {
    const result = await createBlog(data);
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: "Fail to create blog",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white w-full whitespace-normal">
              {error.message}
            </code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully created the blog" + data.title,
      });
      router.push("/dashboard");
    }
  };

  return <BlogForm onHandleSubmit={handleCreate} />;
}
