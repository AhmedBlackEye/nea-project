import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import NewProjectForm from "./form";
import NewProjectModal from "@/components/modals/new-project/form";

function NewProjectPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center p-8">
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-center">Create a new project</CardTitle>
        </CardHeader>
        <CardContent> */}
      <NewProjectModal />
      {/* </CardContent>
      </Card> */}
    </main>
  );
}

export default NewProjectPage;
