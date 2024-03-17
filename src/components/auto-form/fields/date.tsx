import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import AutoFormLabel from "../common/label";

import { AutoFormInputComponentProps } from "../types";

export default function AutoFormDate({
  label,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <FormItem>
      <AutoFormLabel
        label={label}
        tooltipDescription={fieldConfigItem.tooltip}
      />
      <FormControl>
        <DatePicker
          date={field.value}
          setDate={field.onChange}
          {...fieldProps}
        />
      </FormControl>
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}

      <FormMessage />
    </FormItem>
  );
}
