import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps {
  form: any;
  nameFormField: string;
  loading: boolean;
  title: string;
  placeholder: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  showCard?: boolean;
  maxLength?: number;
}

export const TextAreaSectionWithForm: React.FC<TextAreaProps> = ({
  form,
  loading,
  nameFormField,
  title = "Mô tả",
  placeholder,
  icon: Icon = MessageSquare,
  showCard = true,
  maxLength = 500,
}) => {
  const watchedValue = form.watch(nameFormField) || "";
  const currentLength = watchedValue.length;
  const isNearLimit = currentLength > maxLength * 0.8;

  const FormContent = (
    <FormField
      control={form.control}
      name={nameFormField}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {title && (
            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-md">
                <Icon className="w-3.5 h-3.5 text-blue-600" />
              </div>
              {title}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Textarea
                {...field}
                disabled={loading}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`
                  min-h-[100px] resize-none border-gray-200 bg-white
                  transition-all duration-200
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                  hover:border-gray-300
                  ${loading ? "bg-gray-50 cursor-not-allowed" : ""}
                  ${field.value ? "border-green-300 bg-green-50/20" : ""}
                `}
              />
              {/* Character counter */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {field.value && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
                <span className={`
                  text-xs font-medium px-2 py-1 rounded-full
                  ${isNearLimit 
                    ? currentLength >= maxLength 
                      ? "bg-red-100 text-red-600" 
                      : "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-500"
                  }
                `}>
                  {currentLength}/{maxLength}
                </span>
              </div>
            </div>
          </FormControl>
          <FormDescription className="text-xs text-gray-500 flex items-center justify-between">
            <div className="flex items-start gap-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>Mô tả chi tiết giúp người dùng hiểu rõ hơn về danh mục</span>
            </div>
          </FormDescription>
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