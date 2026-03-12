'use client';
import { useState } from "react";

import axios from "axios";

import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { createLinkSchema } from "@/schemas";

import { LoaderIcon, RocketIcon, Settings, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { toast } from "ms-ui-toast";
import { useRouter } from "next/navigation";


interface EditLinkProps {
  id: string;
  url: string;
  shortLink: string;
  description: string;
}


export function EditLink({ id, url, shortLink, description }: EditLinkProps) {
  const [isOpen, setisOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter();

  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      url,
      shortLink,
      description
    },
  })

  const handleSubmit = async (data: z.infer<typeof createLinkSchema>) => {
    try {
      setLoading(true)
      await axios.put(`/api/shortUrl/${id}`, data)
      router.refresh();
      toast.success({ title: "ShortLink updated" });
    } catch (error: any) {
      toast.error({ title: error.response.data.message || 'An error occurred' })
    } finally {
      setLoading(false)
      setisOpen(false);
    }
  }

  const createRandomShortLink = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    form.setValue("shortLink", randomString);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setisOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <div>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger
              >
                <Settings
                  size={38}
                  className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md dark:stroke-[#e9e9e9e9]"
                />
              </TooltipTrigger>
              <TooltipContent>Setting</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent className="w-11/12 md:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-url">
                    URL
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-url"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.com"
                    autoComplete="off"
                    defaultValue={field.value}
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-rose-600" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="shortLink"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-shortLink">
                    Short URL
                  </FieldLabel>
                  <div className="flex relative">
                    <Input
                      {...field}
                      id="form-rhf-input-shortLink"
                      aria-invalid={fieldState.invalid}
                      placeholder="myshortlink"
                      autoComplete="off"
                      disabled={loading}
                    />
                    <div className="flex absolute right-0 top-0 h-full rounded-r-md items-center justify-center dark:bg-neutral-800 bg-neutral-200 cursor-pointer px-6" aria-label="Generate Random Short Link" onClick={createRandomShortLink}>
                      <Shuffle size={16} />
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError className="text-rose-600" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description (Opcional)
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="Enter a description"
                    rows={6}
                    className="min-h-24 resize-none border-neutral-800 text-neutral-400"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="cursor-pointer" onClick={() => form.reset()}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form="form-rhf-input" className="gap-2 cursor-pointer" disabled={loading}>
            {
              loading
                ?
                <LoaderIcon size={16} className="ml-2 animate-spin" />
                :
                <RocketIcon size={16} className="ml-2" />
            }
            <span>
              {loading ? 'Editing...' : 'Edit Link'}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
