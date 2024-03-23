import {
  FormControl,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import AutoFormLabel from "../common/label";

import { AutoFormInputComponentProps } from "../types";
import { getBaseSchema } from "../utils";

export default function AutoFormCustomSelect({
  label,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const values = fieldConfigItem.selectOptions ?? [];
  return (
    <FormItem>
      <AutoFormLabel
        label={label}
        tooltipDescription={fieldConfigItem.tooltip}
      />
      <FormControl>
        <Select
          onValueChange={field.onChange}
          defaultValue={fieldConfigItem.selectDefault ?? field.value}
          {...fieldProps}
        >
          <SelectTrigger className={fieldProps.className}>
            <SelectValue
              placeholder={
                fieldConfigItem.inputProps?.placeholder ?? "Select an option"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {values.map(({ label, value }) => (
              <SelectItem value={label} key={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
