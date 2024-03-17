"use client";

import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useState } from "react";

function AutoFormLabel({
  label,
  className,
  tooltipDescription,
}: {
  tooltipDescription?: string;
  label: string;
  className?: string;
}) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  console.log(isTooltipOpen);
  return (
    <FormLabel className={cn("flex items-center gap-1", className)}>
      {label}
      {tooltipDescription && (
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <TooltipTrigger>
            <Info className="h-4 w-4 stroke-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>{tooltipDescription}</TooltipContent>
        </Tooltip>
      )}
    </FormLabel>
  );
}

export default AutoFormLabel;
