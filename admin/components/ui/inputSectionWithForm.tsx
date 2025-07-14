import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
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
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Icon className="w-4 h-4 text-blue-600" />
            {title}
          </FormLabel>
          <FormControl>
            <Input
              className={`${type === "number" ? "appearance-none" : ""} ${
                disabled ? "bg-gray-50" : ""
              }`}
              {...field}
              type={type}
              pattern={nameFormField === "slug" ? "\\S*" : undefined}
              disabled={disabled ?? loading}
              placeholder={placeholder}
            />
          </FormControl>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  if (!showCard) {
    return FormContent;
  }

  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="pt-6">{FormContent}</CardContent>
    </Card>
  );
};