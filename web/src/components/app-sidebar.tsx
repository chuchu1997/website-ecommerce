/** @format */

"use client";

import {
  BookMinusIcon,
  BookCopyIcon,
  PackageSearchIcon,
  PaletteIcon,
  ScalingIcon,
  SettingsIcon,
  ChevronDownIcon,
  ShoppingBag,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Category } from "@/types/ProjectInterface";

interface AppSidebarProps {
  categories: Category[];
}

export function AppSidebar({ categories }: AppSidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const [openCategory, setOpenCategory] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((cat) => [cat.id, false]))
  );

  const renderMenuItem = (
    href: string,
    label: string,
    icon: React.ElementType,
    active: boolean
  ) => {
    const Icon = icon;
    return (
      <SidebarMenuItem key={href} className="py-1">
        <SidebarMenuButton asChild>
          <a
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted",
              active && "bg-muted font-semibold"
            )}>
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="top-0 h-screen w-64 z-50 shadow-md md:hidden">
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Menu Website</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => {
                const isActive =
                  pathname === `/${params.storeId}/categories/${category.slug}`;

                const hasSubcategories = category.subcategories.length > 0;
                const isOpen = openCategory[category.id];

                if (!hasSubcategories) {
                  return renderMenuItem(
                    `/${params.storeId}/categories/${category.slug}`,
                    category.name,
                    BookMinusIcon,
                    isActive
                  );
                }

                return (
                  <SidebarGroup key={category.id}>
                    <SidebarGroupLabel
                      onClick={() =>
                        setOpenCategory((prev) => ({
                          ...prev,
                          [category.id]: !prev[category.id],
                        }))
                      }
                      className="flex justify-between items-center cursor-pointer select-none">
                      {category.name}
                      <ChevronDownIcon
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </SidebarGroupLabel>

                    {isOpen && (
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {renderMenuItem(
                            `/${category.slug}`,
                            "Tất cả",
                            BookMinusIcon,
                            isActive
                          )}
                          {category.subcategories.map((sub) =>
                            renderMenuItem(
                              `/${category.slug}/${sub.slug}`,
                              sub.name,
                              BookCopyIcon,
                              pathname === `/${category.slug}/${sub.slug}`
                            )
                          )}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    )}
                  </SidebarGroup>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>Khác</SidebarGroupLabel>
          {/* <SidebarGroupContent>
            <SidebarMenu>
              <div className="text-center">
                <div className="w-fit  inline-block my-[10px] text-center">
                  <CartIconButton />
                </div>
              </div>
            </SidebarMenu>
          </SidebarGroupContent> */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
