/** @format */

"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MapPin,
  ShoppingBag,
  Edit3,
  User,
  Phone,
  MapPin as AddressIcon,
  FileText,
  X,
  Check,
} from "lucide-react";
import CustomerInfoLocalStorage from "@/utils/customer-info";
import { OrderSummary } from "./order-summary";
import { CustomerInfoModal } from "./customer-info-model";
import { CheckoutFormValues, checkoutSchema } from "@/lib/schemas/checkout";
import { CustomerData } from "@/types/checkout";
import toast from "react-hot-toast";
import { ProductInterface } from "@/types/product";
import { ProductAPI } from "@/api/products/product.api";
import { FormatUtils } from "@/utils/format";
import { CartItemSSR } from "../../gio-hang/components/cart";
import { UserCartAPI } from "@/api/cart/cart.api";
import { useCookies } from "react-cookie";
import authApi, { BaseInfoUser } from "@/api/auth";
import { OrderAPI } from "@/api/orders/order.api";
import { discountTypeEnum } from "@/types/promotion";
import { useRouter } from "next/navigation";

// Validation utilities
const validateCustomerInfo = (
  data: CustomerData | undefined
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data) {
    errors.push("Vui lòng nhập thông tin giao hàng");
    return { isValid: false, errors };
  }

  if (!data.name || data.name.trim().length === 0) {
    errors.push("Vui lòng nhập tên của bạn");
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.push("Vui lòng nhập số điện thoại");
  } else {
    // Basic phone validation for Vietnamese phone numbers
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
      errors.push("Số điện thoại không hợp lệ");
    }
  }

  if (!data.address || data.address.trim().length === 0) {
    errors.push("Vui lòng nhập địa chỉ giao hàng");
  }

  return { isValid: errors.length === 0, errors };
};

// Customer Info Card Component
const CustomerInfoCard = ({
  customerData,
  onEdit,
}: {
  customerData: CustomerData;
  onEdit: () => void;
}) => (
  <div className="bg-white rounded-lg shadow-sm border mb-6">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            Thông tin giao hàng
          </h2>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
          <Edit3 className="h-4 w-4 mr-1" />
          Sửa
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-700">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium">{customerData.name}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <span>{customerData.phone}</span>
        </div>
        <div className="flex items-start text-gray-700">
          <AddressIcon className="h-4 w-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
          <div>
            <div>{customerData.address}</div>
          </div>
        </div>
        {customerData.note && (
          <div className="flex items-start text-gray-700">
            <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <span className="text-sm">{customerData.note}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function CheckoutForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData | undefined>();
  const [cartItems, setCartItems] = useState<CartItemSSR[]>([]);
  const [cookies] = useCookies(["userInfo"]);
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  // Load user info from cookies or API
  const loadUserInfo = async () => {
    const user = cookies["userInfo"];
    if (user) {
      let res = await authApi.getUserInfoByID(user.id);

      const userInfo = res.data.userInfo as BaseInfoUser;
      const payload: CustomerData = {
        name: userInfo.name ?? "",
        phone: userInfo.phone ?? "",
        address: userInfo.address ?? "",
        note: "",
      };

      form.reset({
        ...payload,
        paymentMethod: "cod", // <- THÊM DÒNG NÀY
      });
      setCustomerData(payload);
    }
  };

  const fetchSelectedItemCart = async () => {
    const user = cookies["userInfo"];
    if (user) {
      try {
        const res = await UserCartAPI.getAllCartItemsOfUser(user.id, true);
        if (res.status === 200) {
          const resCart = res.data.cart;
          const mappedItems: CartItemSSR[] = resCart.items.map((item: any) => ({
            id: item.id,
            isSelect: item.isSelect,
            quantity: item.quantity,
            product: item.product,
          }));

          setCartItems(mappedItems);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Không thể tải giỏ hàng");
      }
    }
  };

  // Handle checkout with validation
  const handleCheckout = async () => {
    // Get current form values
    const formValues = form.getValues();
    const currentCustomerData: CustomerData = {
      name: formValues.name,
      phone: formValues.phone,
      address: formValues.address,
      note: formValues.note || "",
    };

    // Validate customer info
    const validation = validateCustomerInfo(currentCustomerData);

    if (!validation.isValid) {
      // Show validation errors
      validation.errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    // Check if cart has items
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống");
      return;
    }

    // Validate form using react-hook-form
    form.handleSubmit(
      async (data) => {
        // Form is valid, proceed with checkout
        toast.success("Thông tin hợp lệ! Đang xử lý đơn hàng...");

        // Create order message
        let message = "🛒 Chi tiết đơn hàng:\n\n";
        message += `👤 Khách hàng: ${data.name}\n`;
        message += `📞 Số điện thoại: ${data.phone}\n`;
        message += `📍 Địa chỉ: ${data.address}\n`;

        if (data.note) {
          message += `📝 Ghi chú: ${data.note}\n`;
        }
        message += `\n🛍️ Sản phẩm:\n`;

        cartItems.forEach((item, index) => {
          message += `${index + 1}. ${item.product.name} x${item.quantity}\n`;
        });

        console.log("Order details:", {
          customerInfo: data,
          cartItems: cartItems,
          orderMessage: message,
        });

        const user = cookies["userInfo"];
        if (user && user.id) {
          await authApi.updateUserProfile(user.id, {
            name: data.name,
            phone: data.phone,
            address: data.address,
          });

          let total = 0;
          const items = cartItems.map((item) => {
            const product = item.product;
            const quantity = item.quantity;
            const originalPrice = product.price;
            const promotion = product.promotionProducts?.[0]; // Chỉ lấy 1 khuyến mãi đầu
            let discountValue = 0;
            let discountType: discountTypeEnum | undefined;
            let promotionName: String = "";

            if (promotion) {
              if (promotion?.promotion?.name) {
                promotionName = promotion.promotion.name;
              }

              discountType = promotion.discountType;
              if (discountType === discountTypeEnum.PERCENT) {
                discountValue = (originalPrice * promotion.discount) / 100;
              } else {
                discountValue = promotion.discount;
              }
            }

            const unitPrice = originalPrice - discountValue;
            const subtotal = unitPrice * quantity;
            total += subtotal;
            let giftItems = product.giftProducts?.length
              ? product.giftProducts.map((giftProduct) => {
                  const gift = giftProduct.gift;
                  return {
                    giftName: gift.name,
                    giftImage: gift.images[0].url,
                    giftQuantity: 1,
                  };
                })
              : [];

            return {
              productId: product.id,
              unitPrice,
              subtotal,
              promotionName,

              discountType,
              discountValue,
              quantity,
              giftItems,
            };
          });
          await OrderAPI.createOrder({
            storeId: 0,
            address: data.address,
            userId: Number(user.id) ?? 0,
            total: total,
            items: items,
            note: data.note ?? "",
            payment: {
              method: "COD",
              status: "PENDING",
              isPaid: false,
            },
          });
        }

        router.push("/gio-hang");
        // Here you would typically:
        // 1. Call your order API
        // 2. Navigate to success page
        // 3. Clear cart
        // For now, just log the order details

        // Example: Navigate to next step
        // router.push('/checkout/success');
      },
      (errors) => {
        // Form validation failed
        console.log("Form validation errors:", errors);
        Object.values(errors).forEach((error) => {
          if (error?.message) {
            toast.error(error.message);
          }
        });
      }
    )();
  };

  // Handle saving customer info from modal
  const handleSaveCustomerInfo = (data: CustomerData) => {
    const validation = validateCustomerInfo(data);

    if (!validation.isValid) {
      validation.errors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    setCustomerData(data);
    form.reset({
      ...data,
      paymentMethod: "cod",
    });
    setIsModalOpen(false);
    toast.success("Đã cập nhật thông tin giao hàng");
  };

  useEffect(() => {
    fetchSelectedItemCart();
    loadUserInfo();
    setIsMounted(true);
  }, []);

  // Watch form changes and update customer data
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.name && value.phone && value.address) {
        setCustomerData(value as CustomerData);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  if (!isMounted) return null;

  // Determine if we have valid customer data
  const hasValidCustomerData =
    customerData &&
    customerData.name &&
    customerData.phone &&
    customerData.address;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">Đặt hàng</h1>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <ShoppingBag size={16} />
              <span>{cartItems.length} mặt hàng</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7">
            {/* Desktop: Full Form */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm border mb-6">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Thông tin & địa chỉ đặt hàng
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tên của bạn *
                        </label>
                        <input
                          {...form.register("name")}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            form.formState.errors.name
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Nhập họ tên đầy đủ"
                        />
                        {form.formState.errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số điện thoại *
                        </label>
                        <input
                          {...form.register("phone")}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            form.formState.errors.phone
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Nhập số điện thoại"
                        />
                        {form.formState.errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ *
                      </label>
                      <input
                        {...form.register("address")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          form.formState.errors.address
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Nhập địa chỉ"
                      />
                      {form.formState.errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {form.formState.errors.address.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú đặc biệt (tùy chọn)
                      </label>
                      <textarea
                        {...form.register("note")}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ghi chú đặc biệt..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Customer Info Card or Add Button */}
            <div className="lg:hidden">
              {hasValidCustomerData ? (
                <CustomerInfoCard
                  customerData={customerData}
                  onEdit={() => setIsModalOpen(true)}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-sm border mb-6">
                  <div className="p-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 py-3 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors">
                      <MapPin className="h-5 w-5 mr-2" />
                      Thêm thông tin giao hàng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="col-span-5">
            <OrderSummary items={cartItems} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>

      {/* Customer Info Modal */}
      <CustomerInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomerInfo}
        initialData={customerData}
      />
    </div>
  );
}
