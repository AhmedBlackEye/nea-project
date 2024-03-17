import NewProjectModal from "@/components/modals/new-project";
import NewWorkplaceModal from "@/components/modals/new-workplace";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

function ProjectsPage() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="space-x-2 ">
          <NewProjectModal />
          {/* <Button variant={"secondary"} asChild>
            <Link href="/new/project">New workplace</Link>
          </Button> */}
          <NewWorkplaceModal />
        </div>
      </div>
    </main>
  );
}

export default ProjectsPage;
