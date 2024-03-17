import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormDescription } from "@/components/ui/form";

import { AutoFormInputComponentProps } from "../types";
import AutoFormLabel from "../common/label";

export default function AutoFormCheckbox({
  label,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <div>
      <FormItem>
        <div className="mb-3 flex items-center gap-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...fieldProps}
            />
          </FormControl>
          <AutoFormLabel
            label={label}
            tooltipDescription={fieldConfigItem.tooltip}
          />
        </div>
      </FormItem>
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}
    </div>
  );
}
