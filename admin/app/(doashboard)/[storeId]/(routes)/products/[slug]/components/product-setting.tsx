import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Settings, Eye, EyeOff } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface SettingsSectionProps<T extends FieldValues = FieldValues> {
  form: {
    control: Control<T>;
  };
  loading?: boolean;
  name?: FieldPath<T>;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'featured' | 'compact';
}

export const SettingsSection = <T extends FieldValues = FieldValues>({
  form,
  loading = false,
  name = "isFeatured" as FieldPath<T>,
  title = "Cài đặt hiển thị",
  description = "Bật tính năng này để hiển thị mục trong danh sách nổi bật",
  icon: IconComponent = Settings,
  variant = 'default'
}: SettingsSectionProps<T>) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <Card className={`
      shadow-sm border-0 bg-white
      ${isFeatured ? 'ring-2 ring-blue-100 shadow-lg' : 'shadow-sm'}
      ${isCompact ? 'p-2' : ''}
      transition-all duration-200 hover:shadow-md
    `}>
      <CardHeader className={`
        ${isCompact ? 'pb-2' : 'pb-4'}
        ${isFeatured ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : ''}
      `}>
        <CardTitle className={`
          flex items-center gap-3 text-gray-800
          ${isCompact ? 'text-base' : 'text-lg'}
        `}>
          <div className={`
            p-2 rounded-lg transition-colors
            ${isFeatured 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
            ${isCompact ? 'p-1.5' : 'p-2'}
          `}>
            <IconComponent className={`
              ${isCompact ? 'w-4 h-4' : 'w-5 h-5'}
            `} />
          </div>
          <span className="font-semibold">{title}</span>
          {loading && (
            <div className="ml-auto">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className={isCompact ? 'pt-2' : 'pt-0'}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={`
              flex flex-row items-start space-x-4 space-y-0
              rounded-xl border transition-all duration-200
              ${field.value 
                ? 'border-blue-200 bg-blue-50/50 hover:bg-blue-50' 
                : 'border-gray-200 bg-gray-50/30 hover:bg-gray-50'
              }
              ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              p-4 group
            `}>
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                  disabled={loading}
                  className={`
                    mt-1 transition-all duration-200
                    ${field.value 
                      ? 'data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600' 
                      : 'border-gray-300 hover:border-blue-400'
                    }
                  `}
                />
              </FormControl>
              
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <FormLabel className={`
                    text-base font-medium cursor-pointer transition-colors
                    ${field.value ? 'text-blue-700' : 'text-gray-700'}
                    group-hover:text-blue-600
                  `}>
                    Hiển thị công khai
                  </FormLabel>
                  
                  <div className={`
                    flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                    transition-all duration-200
                    ${field.value 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }
                  `}>
                    {field.value ? (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>Hiển thị</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        <span>Ẩn</span>
                      </>
                    )}
                  </div>
                </div>
                
                <FormDescription className={`
                  text-sm leading-relaxed
                  ${field.value ? 'text-blue-600' : 'text-gray-500'}
                  transition-colors
                `}>
                  {description}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};