import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Copy,
  ExternalLink,
  BarChart3,
  Link as LinkIcon,
  Trash2,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { http } from "@/helpers/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formSchema } from "@/components/form/formSchema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchDataUser();
  }, [count]);
  const navigate = useNavigate();
  // Mock data for demonstration
  const [links, setLinks] = useState([
    {
      id: 1,
      original_site:
        "https://www.example.com/very-long-url-that-needs-shortening",
      shorted_site: "pendekin.app/example1",

      click_count: 42,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      original_site: "https://github.com/user/repository/blob/main/README.md",
      shorted_site: "pendekin.app/github-repo",

      click_count: 18,
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      original_site:
        "https://docs.example.com/api/documentation/getting-started",
      shorted_site: "pendekin.app/docs",

      click_count: 7,
      createdAt: "2024-01-13",
    },
  ]);

  async function fetchDataUser() {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await http.get("/links", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      console.log(response, "<----- data user links");
      setLinks(response.data.findedLink);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCopyLink = (shortUrl: string) => {
    navigator.clipboard.writeText(`http://localhost:3000/r/${shortUrl}`);
    toast("Link copied!", {
      description: "The short link has been copied to your clipboard.",
    });
  };

  const handleGoToLink = (shortUrl: string) => {
    window.open(`http://localhost:3000/r/${shortUrl}`, "_blank");
    setCount(count + 1);
  };

  const handleEditLink = (linkId: number) => {
    toast({
      title: "Edit link",
      description: `Editing link #${linkId}`,
    });
    // Navigate to edit page or open edit modal
  };

  const handleDeleteLink = (linkId: number, siteName: string) => {
    toast({
      title: "Link deleted",
      description: `${siteName} has been deleted successfully.`,
      variant: "destructive",
    });
    // Add delete logic here
  };

  function handleVisit(link: string) {
    handleGoToLink(link.shorted_site);
  }

  const totalClicks = links.reduce((sum, link) => sum + link.click_count, 0);

  // ====== form

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      original_site: "",
      shorted_site: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      setLoading(true);
      const response = await http.post(
        "/shorts",
        {
          original_site: values.original_site,
          shorted_site: values.shorted_site,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response, "<-----responseResult");
      setLoading(false);
      if (response.status === 201) {
        setOpen(false);
        toast.success("New shorted link created successfully.");
      }
      setCount(count + 1);
    } catch (error) {
      console.log(error, "<----- errror post");
      setLoading(false);
      const errorField = error.response.data.message.includes("original_site")
        ? "Original URL"
        : "Custom Name";
      if (error instanceof AxiosError && error.response?.status === 400) {
        toast.error(
          `${errorField} registered by other user. Fill other unique ${errorField}`
        );
      }
      if (error instanceof AxiosError && error.code === "ERR_NETWORK") {
        toast.error("Check your network connection.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your shortened links</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Link
              </Button>
            </DialogTrigger>

            <Form {...form}>
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
            </Form>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Links</CardTitle>
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{links.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Clicks
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClicks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Clicks</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {links.length > 0 ? Math.round(totalClicks / links.length) : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Links List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Links</CardTitle>
            <CardDescription>
              All your shortened links in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            {links.length === 0 ? (
              <div className="text-center py-8">
                <LinkIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No links yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating your first shortened link
                </p>
                <Button onClick={() => navigate("/add-site")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Link
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium truncate">
                            {link.shorted_site}
                          </h3>
                          <Badge variant="secondary">
                            {link.click_count} clicks
                          </Badge>
                        </div>
                        <p className="text-sm text-primary font-mono mb-1">
                          pendekin-api.hafizh.web.id/{link.shorted_site}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {link.original_site}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created:{" "}
                          {new Date(link.createdAt).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyLink(link.shorted_site)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVisit(link)}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditLink(link.id)}
                          className="flex-1 sm:flex-none"
                        >
                          <Pencil className="w-4 h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDeleteLink(link.id, link.site_name)
                          }
                          className="flex-1 sm:flex-none"
                        >
                          <Trash2 className="w-4 h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
