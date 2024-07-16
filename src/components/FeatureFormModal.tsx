import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "./use-store-modal";
import { Modal } from "./ui/Modal";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  functions: z.string().min(1),
  tags: z.string().min(1),
});

export const FeatureFormModal = ({ storeModal }: { storeModal: any }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      functions: "",
      tags: "",
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("submitted", data);
  };
  return (
    <Modal
      title="Add new feature"
      description="Please define your feature in as much detail as possible"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form
              onSubmit={() => {
                storeModal.onClose();
                form.handleSubmit(onSubmit);
              }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Feature Name:</FormLabel>
                    <FormControl>
                      <Textarea
                      className="bg-white outline-none"
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
                    <FormLabel>Feature Descritpion:</FormLabel>
                    <FormControl>
                      <Textarea
                      className="bg-white outline-none"
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
                    <FormLabel>Feature Descritpion:</FormLabel>
                    <FormControl>
                      <Textarea
                      className="bg-white outline-none" 
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
                    <FormLabel>Tag:</FormLabel>
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
