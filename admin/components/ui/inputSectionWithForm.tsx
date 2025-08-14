import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Package } from "lucide-react";
import { Input } from "./input";

interface InputProps {
  form: any;
  nameFormField: string;
  loading: boolean;
  title: string;
  placeholder: string;
  disabled?: boolean;
  type?: "text" | "number" | "email" | "password";
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
  showCard?: boolean;
}

export const InputSectionWithForm: React.FC<InputProps> = ({
  form,
  loading,
  nameFormField,
  title,
  placeholder,
  type = "text",
  disabled = false,
  icon: Icon = Package,
  description,
  showCard = true,
}) => {
  const FormContent = (
    <FormField
      control={form.control}
      name={nameFormField}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-md">
              <Icon className="w-3.5 h-3.5 text-blue-600" />
            </div>
            {title}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={type}
                pattern={nameFormField === "slug" ? "\\S*" : undefined}
                disabled={disabled || loading}
                placeholder={placeholder}
                className={`
                  h-11 border-gray-200 bg-white transition-all duration-200
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                  hover:border-gray-300
                  ${type === "number" ? "appearance-none" : ""}
                  ${disabled || loading ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""}
                  ${field.value ? "border-green-300 bg-green-50/30" : ""}
                `}
              />
              {/* Success indicator */}
       
            </div>
          </FormControl>
          {/* {description && (
            <FormDescription className="text-xs text-gray-500 flex items-start gap-1">
              <span>{description}</span>
            </FormDescription>
          )} */}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );

  if (!showCard) {
    return FormContent;
  }

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">{FormContent}</CardContent>
    </Card>
  );
};