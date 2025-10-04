import { useState } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const [links] = useState([
    {
      id: 1,
      originalSite:
        "https://www.example.com/very-long-url-that-needs-shortening",
      shortedSite: "pendekin.app/example1",
      siteName: "example1",
      clickCount: 42,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      originalSite: "https://github.com/user/repository/blob/main/README.md",
      shortedSite: "pendekin.app/github-repo",
      siteName: "github-repo",
      clickCount: 18,
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      originalSite:
        "https://docs.example.com/api/documentation/getting-started",
      shortedSite: "pendekin.app/docs",
      siteName: "docs",
      clickCount: 7,
      createdAt: "2024-01-13",
    },
  ]);

  const handleCopyLink = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    toast("Link copied!", {
      description: "The short link has been copied to your clipboard.",
    });
  };

  const handleGoToLink = (originalUrl: string) => {
    window.open(originalUrl, "_blank");
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clickCount, 0);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your shortened links</p>
          </div>
          <Button onClick={() => navigate("/add-site")}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Link
          </Button>
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
                            {link.siteName}
                          </h3>
                          <Badge variant="secondary">
                            {link.clickCount} clicks
                          </Badge>
                        </div>
                        <p className="text-sm text-primary font-mono mb-1">
                          {link.shortedSite}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {link.originalSite}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created:{" "}
                          {new Date(link.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyLink(link.shortedSite)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGoToLink(link.originalSite)}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visit
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
