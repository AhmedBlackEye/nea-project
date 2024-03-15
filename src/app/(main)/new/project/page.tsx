import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewProjectForm from "./form";

function NewProjectPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Create a new project</CardTitle>
        </CardHeader>
        <CardContent>
          <NewProjectForm />
        </CardContent>
      </Card>
    </main>
);
}

export default NewProjectPage;
