import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewProjectForm from "./form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getWorkspaces } from "@/lib/queries/workspaces";
import { toast } from "@/components/ui/use-toast";

async function NewProjectPage() {
  const { data, error } = await getWorkspaces();
  const workspaceData = data
    ? data.map((item) => ({ label: item.name, value: item.id }))
    : [];
  if (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description:
        "Please refresh the page or contact us if the issue presists.",
    });
  }
  return (
    <main className="space-y-2 px-4 py-2 sm:px-8 sm:py-4 md:px-10 lg:px-12">
      <Button variant="outline" size="icon" asChild>
        <Link href="/projects">
          <ChevronLeft />
        </Link>
      </Button>
      <Card className="mx-auto md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">Create a new waitlist</CardTitle>
        </CardHeader>
        <CardContent>
          <NewProjectForm workspaceData={workspaceData} />
        </CardContent>
      </Card>
    </main>
  );
}

export default NewProjectPage;
