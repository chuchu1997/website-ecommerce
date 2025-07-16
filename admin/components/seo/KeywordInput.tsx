"use client"
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Tag, X } from "lucide-react";
import { useState } from "react";

export const KeywordsInput = ({ form, loading }: { form: any; loading: boolean }) => {
  const [input, setInput] = useState("");

  return (
    <FormField
      control={form.control}
      name="seo.keywords"
      render={({ field }) => {
        const keywords: string[] = field.value || [];

        const addKeyword = (text: string) => {
          const cleaned = text.trim();
          if (cleaned && !keywords.includes(cleaned)) {
            field.onChange([...keywords, cleaned]);
            setInput("");
          }
        };

        const removeKeyword = (keyword: string) => {
          field.onChange(keywords.filter((k) => k !== keyword));
        };

        return (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              Từ khóa phụ
            </FormLabel>
            <FormControl>
              <div>
                <Textarea
                  placeholder="Nhập từ khóa, nhấn Enter để thêm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addKeyword(input);
                    }
                  }}
                  disabled={loading}
                  rows={2}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
