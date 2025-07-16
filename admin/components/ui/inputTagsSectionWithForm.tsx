"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Package, X } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";

interface TagsInputProps {
  form: any;
  nameFormField: string;
  loading: boolean;
  title: string;
  placeholder: string;
  disabled?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
  showCard?: boolean;
}

export const InputTagsSectionWithForm: React.FC<TagsInputProps> = ({
  form,
  nameFormField,
  title,
  placeholder,
  loading,
  disabled = false,
  icon: Icon = Package,
  description,
  showCard = true,
}) => {
  const [inputValue, setInputValue] = useState("");

  const FormContent = (
    <FormField
      control={form.control}
      name={nameFormField}
      render={({ field }) => {
        const tags: string[] = field.value || [];

        const addTag = (tag: string) => {
          const cleaned = tag.trim();
          if (!cleaned || tags.includes(cleaned)) return;
          field.onChange([...tags, cleaned]);
        };

        const removeTag = (tagToRemove: string) => {
          field.onChange(tags.filter((tag) => tag !== tagToRemove));
        };

        return (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Icon className="w-4 h-4 text-blue-600" />
              {title}
            </FormLabel>
            <FormControl>
              <div>
                <Input
                  disabled={disabled || loading}
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag(inputValue);
                      setInputValue("");
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </FormControl>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  if (!showCard) return FormContent;

  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="pt-6">{FormContent}</CardContent>
    </Card>
  );
};
