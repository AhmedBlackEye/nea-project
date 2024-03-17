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

function NewWorkplaceModal() {
  const [open, setIsOpen] = useState(false);
  return (
    <Credenza open={open} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button variant="secondary">New workplace</Button>
      </CredenzaTrigger>
      <CredenzaContent className="pb-4">
        <CredenzaHeader>
          <CredenzaTitle>Create a new workplace</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <NewWorkspaceForm close={() => setIsOpen(false)} />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

export default NewWorkplaceModal;
