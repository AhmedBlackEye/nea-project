import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewProjectModal from "./form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function NewProjectPage() {
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
          <NewProjectModal />
        </CardContent>
      </Card>
    </main>
  );
}

export default NewProjectPage;
