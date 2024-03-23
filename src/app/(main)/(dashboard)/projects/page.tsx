import NewWorkplaceModal from "@/components/modals/new-workplace";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getWorkspaces } from "@/lib/queries/workspaces";
import Link from "next/link";

async function ProjectsPage() {
  const { data, error } = await getWorkspaces();
  console.log(data);
  // if (error) {
  //   toast({
  //     title: "Uh oh! Something went wrong.",
  //     description: "Please try again",
  //   });
  // }
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Workspaces</h2>
        <div className="space-x-2 ">
          <Button asChild>
            <Link href="/new/project">New Waitlist</Link>
          </Button>
          <NewWorkplaceModal />
        </div>
      </div>
      <div>
        {data?.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProjectsPage;
