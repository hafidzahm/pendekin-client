import { Form } from "react-hook-form";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function DialogForm({ form, onSubmit, loading }) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
          <DialogDescription>
            Create a shortened link for easy sharing
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-5">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="original_site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/very-long-url"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the full URL you want to shorten
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="shorted_site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your custom link name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <p className="text-sm text-muted-foreground">
                pendekin.app/
                {form.watch("shorted_site") || "abc123"}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-1">
                Creating short link
                <span className="flex gap-0.5">
                  <span className="animate-[bounce_1s_ease-in-out_0s_infinite]">
                    .
                  </span>
                  <span className="animate-[bounce_1s_ease-in-out_0.2s_infinite]">
                    .
                  </span>
                  <span className="animate-[bounce_1s_ease-in-out_0.4s_infinite]">
                    .
                  </span>
                </span>
              </span>
            ) : (
              "Create short link"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
