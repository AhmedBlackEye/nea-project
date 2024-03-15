import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

function ProjectsPage() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <Button className="group" variant={"secondary"} asChild>
          <Link href="/new/project">
            <PlusCircle className="mr-2 h-5 w-5 " />
            New project
          </Link>
        </Button>
      </div>
    </main>
  );
}

export default ProjectsPage;
