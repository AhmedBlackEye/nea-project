"use client";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import NewWorkspaceForm from "./form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function NewProjectModal() {
  const [open, setIsOpen] = useState(false);
  return (
    <Credenza open={open} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button>New project</Button>
      </CredenzaTrigger>
      <CredenzaContent disableClickingOutside>
        <CredenzaHeader>
          <CredenzaTitle>Create a new project</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <NewWorkspaceForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

export default NewProjectModal;
