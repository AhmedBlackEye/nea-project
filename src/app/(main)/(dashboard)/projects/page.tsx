import NewWorkplaceModal from "@/components/modals/new-workplace";
import ProjectCard from "@/components/shared/projectCard";
import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/use-toast";
import { getCampaigns } from "@/lib/queries/campaign";
import { groupCampaignsUsingWorkspace } from "@/lib/utils";
import Link from "next/link";

async function ProjectsPage() {
  const { data, error } = await getCampaigns();
  if (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description:
        "Please refresh the page or contact us if the issue presists.",
    });
  }
  const groupedCampaigns = data ? groupCampaignsUsingWorkspace(data) : [];

  return (
    <main>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Workspaces</h2>
        <div className="space-x-2 ">
          <Button asChild>
            <Link href="/new/project">New Waitlist</Link>
          </Button>
          <NewWorkplaceModal />
        </div>
      </div>
      <div className="space-y-8">
        {groupedCampaigns.map((group) => (
          <div key={group.workspaceId} className="space-y-2">
            <h3 className="text-xl capitalize">{group.workspaceName}</h3>
            <div className="sm: grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {group.campaigns.map((item) => (
                <ProjectCard campaign={item} key={item.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProjectsPage;
