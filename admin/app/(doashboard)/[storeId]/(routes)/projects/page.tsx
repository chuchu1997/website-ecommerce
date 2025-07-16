/** @format */

// services-management.tsx
"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Edit,
  Trash2,
  Plus,
  Settings,
  Eye,
  EyeOff,
  FileText,
} from "lucide-react";
import axios from "axios";
import ServiceAPI from "@/app/api/services/services.api";
import CategoryAPI from "@/app/api/categories/categories.api";
import { useParams } from "next/navigation";

import {
  CreateProjectInterface,
  ProjectInterface,
  ProjectType,
  UpdateProjectInterface,
} from "@/types/project";
import { CategoryInterface, CategoryVariant } from "@/types/categories";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import S3CloudAPI from "@/app/api/upload/s3-cloud";
import { InputSectionWithForm } from "@/components/ui/inputSectionWithForm";
import { ImageUploadSection } from "../products/[slug]/components/product-image-upload";
import { TextAreaSectionWithForm } from "@/components/ui/textAreaSectionWithForm";
import { seoSchemaZod } from "@/schemas/seoSchema";
import SEOForm from "@/components/seo/seo";
import ProjectAPI from "@/app/api/projects/project.api";
import { FormatUtils } from "@/utils/format";
import PaginationCustom from "@/components/common/PaginationCustom";
import { DescriptionSection } from "../products/[slug]/components/product-description";

const formSchema = z.object({
  title: z.string().min(3, "Vui lòng nhập tiêu đề dự án "),
  slug: z
    .string()
    .min(1, "Slug không được để trống")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug chỉ được chứa chữ thường, số và dấu gạch ngang (không có khoảng trắng hoặc ký tự đặc biệt)",
    })
    .transform((val) =>
      val
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    ),
  imageUrl: z
    .object({
      url: z.string().min(1, "Vui lòng chọn ảnh."),
      file: z.instanceof(File).optional(),
    })
    .refine((val) => !!val.url, {
      message: "Vui lòng chọn ảnh.",
    }),
  type: z.nativeEnum(ProjectType, {
    errorMap: () => ({ message: "Vui lòng chọn loại dự án" }),
  }),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  description: z.string().min(3, "Vui lòng nhập mô tả dự án"),
  shortDescription: z.string().min(3, "Vui lòng nhập mô tả ngắn dự án"),

  seo: seoSchemaZod.optional(),
});

type ProjectFormValues = z.infer<typeof formSchema>;

export default function ServicesManagement() {
  const { storeId } = useParams();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      categoryId: "",
      type: ProjectType.HOME,
      shortDescription: "",
      seo: {
        title: "",
        description: "",
        keywords: [],
        slug: "",
        canonicalUrl: "",
        altText: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
      },
    },
  });

  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [expandedServices, setExpandedServices] = useState<Set<number>>(
    new Set()
  );

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchProjectFromAPI();
      fetchCategoriesFromAPI();
    }
  }, [isMounted]);
  useEffect(() => {
    if (currentPage && isMounted) {
      fetchProjectFromAPI();
    }
  }, [currentPage, isMounted]);

  if (!isMounted) return null;

  const ProjectTypeLabel: Record<ProjectType, string> = {
    [ProjectType.HOME]: "Nhà ở",
    [ProjectType.APARTMENT]: "Chung cư",
    [ProjectType.HOTEL]: "Khách sạn",
    [ProjectType.INTERIOR]: "Nội thất",
    [ProjectType.COMMERCIAL]: "Thương mại",
    [ProjectType.RESTAURANT]: "Nhà hàng",
  };

  const fetchProjectFromAPI = async () => {
    try {
      const limitItemsFetch = 4;
      const response = await ProjectAPI.getProjectsRelateWithStoreID({
        storeID: Number(storeId),
        currentPage: currentPage,
        limit: limitItemsFetch,
      });
      if (response.status === 200) {
        const { projects, total } = response.data as {
          projects: ProjectInterface[];
          total: number;
        };
        // const totalPagesCal = Math.ceil(total / limit);
        setTotalPage(Math.ceil(total / limitItemsFetch));
        setProjects(projects);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Có lỗi khi tải danh sách dự án ");
    }
  };

  const fetchCategoriesFromAPI = async () => {
    try {
      const response = await CategoryAPI.getCategoriesRelateWithStoreID({
        justGetParent: false,
        storeID: Number(storeId),
      });
      if (response.status === 200) {
        let { categories } = response.data as {
          categories: CategoryInterface[];
        };
        categories = categories.filter(
          (category) => category.variant === CategoryVariant.PROJECTS
        );
        setCategories(categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Có lỗi khi tải danh sách danh mục");
    }
  };

  const onCreateProject = async (project: CreateProjectInterface) => {
    try {
      const response = await ProjectAPI.createProject(project);

      if (response.status === 200) {
        const { project: newProject, message } = response.data as {
          message: string;
          project: ProjectInterface;
        };

        toast.success(message);
        setProjects([...projects, newProject]);
        await fetchProjectFromAPI(); // Refresh the list
      }
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Có lỗi khi tạo dự án");
    }
  };

  const onUpdateService = async (
    id: number,
    project: UpdateProjectInterface
  ) => {
    try {
      const response = await ProjectAPI.updateProject({ id, data: project });
      if (response.status === 200) {
        const { message } = response.data as { message: string };
        toast.success(message);
        await fetchProjectFromAPI(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Có lỗi khi cập nhật dịch vụ");
    }
  };

  const onDeleteProject = async (projectId: number) => {
    try {
      const response = await ProjectAPI.deleteProjectFromID(projectId);
      if (response.status === 200) {
        const { message } = response.data as {
          message: string;
        };
        toast.success(message);
        setProjects((prev) =>
          prev.filter((service) => service.id !== projectId)
        );
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Có lỗi khi xóa dịch vụ");
    }
  };

  // Handle form submission
  const onSubmit = async (data: ProjectFormValues) => {
    try {
      let finalImage = data.imageUrl;
      if (data.imageUrl.file) {
        const formData = new FormData();
        formData.append("files", data.imageUrl.file);
        const uploadRes = await S3CloudAPI.uploadImageToS3(formData);
        if (uploadRes.status !== 200) throw new Error("Upload thất bại");
        const { imageUrls } = uploadRes.data as { imageUrls: string[] };
        if (imageUrls.length > 0) {
          finalImage.file = undefined;
          finalImage.url = imageUrls[0];
        }
      }

      if (editingServiceId) {
        // Update existing service
        const updateData: UpdateProjectInterface = {
          storeId: Number(storeId),
          shortDescription: data.shortDescription,
          title: data.title,
          slug: data.slug,
          description: data.description,
          imageUrl: finalImage.url,
          type: data.type,
          categoryId: Number(data.categoryId),
          updatedAt: new Date(),
          seo: data.seo
            ? {
                ...data.seo,
                keywords: data.seo.keywords ?? [],
              }
            : undefined,
        };

        await onUpdateService(editingServiceId, updateData);
      } else {
        // Create new service
        const newProject: CreateProjectInterface = {
          storeId: Number(storeId),
          title: data.title,
          shortDescription: data.shortDescription,
          slug: data.slug,
          description: data.description,
          imageUrl: finalImage.url,
          type: data.type,
          categoryId: Number(data.categoryId),
          seo: data.seo
            ? {
                ...data.seo,
                keywords: data.seo.keywords ?? [],
              }
            : undefined,
        };
        await onCreateProject(newProject);
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Có lỗi xảy ra khi xử lý form");
    }
  };

  // Edit a service
  const handleEditService = (project: ProjectInterface) => {
    setEditingServiceId(project.id);

    form.reset({
      title: project.title,
      slug: project.slug,
      description: project.description,
      imageUrl: {
        file: undefined,
        url: project.imageUrl,
      },
      type: project.type,
      categoryId: project.categoryId.toString(),
      shortDescription: project.shortDescription,
      seo: project.seo ?? {
        title: "",
        description: "",
        keywords: [],
        slug: "",
        canonicalUrl: "",
        altText: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
      },
    });
    setIsDialogOpen(true);
  };

  // Reset form
  const resetForm = () => {
    form.reset({
      title: "",
      slug: "",
      description: "",
      imageUrl: undefined,
      categoryId: "",
      type: undefined,
      shortDescription: "",
      seo: {
        title: "",
        description: "",
        keywords: [],
        slug: "",
        canonicalUrl: "",
        altText: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
      },
    });
    setEditingServiceId(null);
  };

  // Toggle service expansion
  const toggleServiceExpansion = (serviceId: number) => {
    setExpandedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Không xác định";
  };

  // Render services list
  const renderServicesList = () => {
    return (
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="group">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium text-gray-600">
                          Dịch vụ #{project.id}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleServiceExpansion(project.id)}
                        className="p-1 h-6 w-6 hover:bg-gray-100 rounded-full">
                        {expandedServices.has(project.id) ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      {project.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-2">
                        <span className="font-medium">Loại dự án :</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {ProjectTypeLabel[project.type]}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="font-medium">Danh mục:</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {getCategoryName(project.categoryId)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        <span className="font-medium">Slug:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {project.slug}
                        </code>
                      </div>

                      {expandedServices.has(project.id) && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 animate-in slide-in-from-top-2 duration-200">
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-gray-700">
                                Mô tả:
                              </span>
                              <p className="text-gray-600 mt-1">
                                {project.description}
                              </p>
                            </div>

                            {project.imageUrl && (
                              <div>
                                <span className="font-medium text-gray-700">
                                  Hình ảnh:
                                </span>
                                <div className="mt-2 flex items-center gap-3">
                                  <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-16 h-16 object-cover rounded-lg border"
                                  />
                                  <p className="text-xs text-gray-500 break-all">
                                    {project.imageUrl}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                              <span>
                                Tạo:{" "}
                                {FormatUtils.formatDate(
                                  project.createdAt ?? ""
                                )}
                              </span>
                              <span>•</span>
                              <span>
                                Cập nhật:{" "}
                                {FormatUtils.formatDate(
                                  project.updatedAt ?? ""
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 sm:flex-col sm:w-auto w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditService(project)}
                      className="flex-1 sm:flex-none hover:bg-blue-50 hover:border-blue-300 transition-colors">
                      <Edit className="h-4 w-4 mr-2" />
                      Sửa
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Bạn có chắc chắn muốn xóa dịch vụ này?"
                          )
                        ) {
                          onDeleteProject(project.id);
                        }
                      }}
                      className="flex-1 sm:flex-none hover:bg-red-50 hover:border-red-300 transition-colors">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-4 lg:p-6">
        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm m-0 p-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Settings className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    Quản lý dự án
                  </CardTitle>
                  <p className="text-sm text-white/80 mt-1">
                    Tổng: {projects.length} dự án
                  </p>
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(true);
                    }}
                    className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm dự án
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full max-w-2xl">
                  <DialogHeader className="flex-shrink-0 pb-4 border-b">
                    <DialogTitle className="text-center text-xl font-bold text-gray-800">
                      {editingServiceId ? "Chỉnh sửa dự án " : "Tạo mới dự án "}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex-1 overflow-y-auto px-1 py-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">
                        <InputSectionWithForm
                          form={form}
                          nameFormField="title"
                          loading={false}
                          title="Tiêu đề dự án "
                          placeholder="Vui lòng nhập tiêu đề dự án "
                        />
                        <InputSectionWithForm
                          form={form}
                          nameFormField="shortDescription"
                          loading={false}
                          title="Mô tả ngắn của dự án  "
                          placeholder="Vui lòng nhập mô tả ngắn "
                        />
                        <InputSectionWithForm
                          form={form}
                          nameFormField="slug"
                          loading={false}
                          title="Slug"
                          placeholder="Vui lòng nhập slug"
                        />

                        <ImageUploadSection
                          form={form}
                          loading={false}
                          nameFormField="imageUrl"
                        />

                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Loại dự án
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Chọn loại dự án" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(ProjectType).map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {ProjectTypeLabel[type]}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="categoryId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Danh mục
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Chọn danh mục" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id.toString()}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Card className="border-0 shadow-md">
                          <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-xl">
                              <FileText className="h-5 w-5" />
                              Nội dung bài viết
                            </CardTitle>
                            <CardDescription>
                              Soạn thảo nội dung chính của bài viết
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <DescriptionSection form={form} loading={false} />
                          </CardContent>
                        </Card>

                        <SEOForm form={form} loading={false} />

                        <DialogFooter className="flex-shrink-0 pt-6 mt-6 border-t flex-col sm:flex-row gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              resetForm();
                              setIsDialogOpen(false);
                            }}
                            className="w-full sm:w-auto order-2 sm:order-1">
                            Hủy
                          </Button>
                          <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            {form.formState.isSubmitting
                              ? "Đang xử lý..."
                              : editingServiceId
                              ? "Lưu thay đổi"
                              : "Tạo mới"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Danh sách dịch vụ
                  </h2>
                  <p className="text-sm text-gray-600">
                    Quản lý tất cả dịch vụ của cửa hàng
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {projects.length > 0 ? (
                  <div className="p-4">{renderServicesList()}</div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Settings className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-base">
                      Chưa có dịch vụ nào
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Hãy thêm dịch vụ đầu tiên của bạn
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <PaginationCustom
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={async (page) => {
              setCurrentPage(page);
            }}
          />
        </Card>
      </div>
    </div>
  );
}
