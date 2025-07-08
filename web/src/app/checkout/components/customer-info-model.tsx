"use client";

// components/checkout/CustomerInfoModal.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Check } from "lucide-react";
import { CustomerData } from '@/types/checkout';
import { checkoutSchema, CheckoutFormValues } from '@/lib/schemas/checkout';
import { useEffect } from "react";

interface CustomerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CustomerData) => void;
  initialData?: CustomerData;
}

export const CustomerInfoModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CustomerInfoModalProps) => {

  const modalForm = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
     
      note: initialData?.note || "",
      paymentMethod: "cod"
    },
  });



  useEffect(() => {
  if (initialData) {
    modalForm.reset({
      name: initialData.name || "",
      phone: initialData.phone || "",
      address: initialData.address || "",
      note: initialData.note || "",
      paymentMethod: "cod",
    });
  }
}, [initialData, modalForm]);

  const handleSave = (data: CheckoutFormValues) => {
    const customerData: CustomerData = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      note: data.note || "",
    };
    onSave(customerData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Thông tin của bạn</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên của bạn *
            </label>
            <input
              {...modalForm.register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập họ tên đầy đủ"
            />
            {modalForm.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {modalForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại *
            </label>
            <input
              {...modalForm.register("phone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập số điện thoại"
            />
            {modalForm.formState.errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {modalForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ *
            </label>
            <input
              {...modalForm.register("address")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập địa chỉ"
            />
            {modalForm.formState.errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {modalForm.formState.errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú (tùy chọn)
            </label>
            <textarea
              {...modalForm.register("note")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ghi chú đặc biệt..."
            />
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={modalForm.handleSubmit(handleSave)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Check className="h-5 w-5 mr-2" />
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
};