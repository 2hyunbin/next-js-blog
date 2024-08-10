"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { EyeOpenIcon, RocketIcon, StarIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { BsCopy } from "react-icons/bs";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import MarkDownPreview from "@/components/markdown/MarkDownPreview";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  image_url: z.string().url({ message: "Invalid URL." }),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
  is_published: z.boolean(),
  is_premium: z.boolean(),
});

export default function BlogForm() {
  const [isPreview, setPreview] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
      is_published: true,
      is_premium: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full border rounded-md space-y-6 pb-10"
      >
        <div className="p-5 flex items-center justify-between flex-wrap border-b gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <span
              role="button"
              tabIndex={0}
              className="flex items-center gap-1 border p-2 rounded-md bg-zinc-700 hover:ring-2 hover:ring-zinc-400 transition-all"
              onClick={() =>
                setPreview(
                  !isPreview && !form.getFieldState("image_url").invalid,
                )
              }
            >
              {isPreview ? (
                <>
                  <PencilIcon />
                  Edit
                </>
              ) : (
                <>
                  <EyeOpenIcon />
                  Preview
                </>
              )}
            </span>

            <FormField
              control={form.control}
              name="is_premium"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center p-2 rounded-md gap-1 border bg-zinc-700">
                      <StarIcon />
                      <span>Premium</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center p-2 rounded-md gap-1 border bg-zinc-700">
                      <RocketIcon />
                      <span>Publish</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            className="flex items-center gap-1"
            disabled={!form.formState.isValid}
          >
            <BsCopy />
            Save
          </Button>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 flex w-full break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x",
                  )}
                >
                  <Input
                    placeholder="title"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                    )}
                  />
                  <div
                    className={cn(
                      "lg:px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden",
                    )}
                  >
                    <h1 className="text-3xl font-medium">
                      {form.getValues().title}
                    </h1>
                  </div>
                </div>
              </FormControl>
              <div className="px-3">
                {form.getFieldState("title").invalid &&
                  form.getValues().title && <FormMessage />}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 flex w-full break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x",
                  )}
                >
                  <Input
                    placeholder="image_url"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                    )}
                  />
                  <div
                    className={cn(
                      "lg:px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden",
                    )}
                  >
                    {!isPreview ? (
                      <>
                        <p>Click on Preview to see image</p>
                      </>
                    ) : (
                      <div className="border rounded-md relative h-80">
                        <Image
                          src={form.getValues().image_url}
                          alt="preview"
                          fill
                          className="object-center object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </FormControl>
              <div className="px-3">
                {form.getFieldState("image_url").invalid &&
                  form.getValues().image_url && <FormMessage />}
              </div>{" "}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 flex w-full break-words",
                    isPreview ? "divide-x-0" : "gap-2 divide-x h-70vh",
                  )}
                >
                  <Textarea
                    placeholder="content"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed resize-none h-full",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2",
                    )}
                  />
                  <div
                    className={cn(
                      "overflow-y-auto",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden",
                    )}
                  >
                    <MarkDownPreview
                      className="p-5"
                      content={form.getValues().content}
                    />
                    <h1 className="text-3xl font-medium"></h1>
                  </div>
                </div>
              </FormControl>
              <div className="px-3">
                {form.getFieldState("content").invalid &&
                  form.getValues().content && <FormMessage />}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
