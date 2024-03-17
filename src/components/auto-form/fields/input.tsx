import {
  FormControl,
  FormDescription,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AutoFormLabel from "../common/label";

import { AutoFormInputComponentProps } from "../types";

export default function AutoFormInput({
  label,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const type = fieldProps.type || "text";

  return (
    <div className="flex flex-row  items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {showLabel && (
          <AutoFormLabel
            label={label}
            tooltipDescription={fieldConfigItem.tooltip}
          />
        )}
        <FormControl>
          {fieldConfigItem.inputTextLeft ? (
            <div className="flex">
              <div className="flex items-center rounded-l-md bg-accent p-2 text-sm font-semibold text-accent-foreground">
                {fieldConfigItem.inputTextLeft}
              </div>
              <Input
                type={type}
                className="rounded-l-none"
                {...fieldPropsWithoutShowLabel}
              />
            </div>
          ) : (
            <Input type={type} {...fieldPropsWithoutShowLabel} />
          )}
        </FormControl>
        {fieldConfigItem.description && (
          <FormDescription>{fieldConfigItem.description}</FormDescription>
        )}

        <FormMessage />
      </FormItem>
    </div>
  );
}
