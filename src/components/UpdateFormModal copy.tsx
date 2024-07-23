import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "./ui/Modal";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateData } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  functions: z.string().optional(),
  tags: z.string().optional(),
});

export const UpdateFormModal = ({ storeModal, item }: { storeModal: any, item: any }) => {
  const [loading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      functions: "",
      tags: "",
    },
  });
  useEffect(() => {
    if (item) {
      form.reset({
        name: item.Name || "",
        description: item.Description || "",
        functions: "",
        tags: item.Title || "",
      });
    }
  }, [item, form]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const form_submit_data = {
      Name: data.name,
      Title: data.tags,
      Description: data.description,
      Archive: false
    }
    await updateData(form_submit_data, item._id);
    storeModal.onClose();
    location.reload();
  };
  return (
    <Modal
      title="Update here"
      description="Change the fields"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Feature Name:</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white outline-none text-black"
                        disabled={loading}
                        placeholder="A short, descriptive name for the feature."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Feature Description:</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white outline-none text-black"
                        disabled={loading}
                        placeholder="A detailed explanation of what the feature does."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="functions"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Feature Functions:</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white outline-none text-black"
                        disabled={loading}
                        placeholder="List of functions/methods that implement the feature."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Tags:</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Feature">Feature</SelectItem>
                          <SelectItem value="Sub-Feature">Sub-Feature</SelectItem>
                          <SelectItem value="Func">Func</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button type="submit" disabled={loading}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
