// components/checkout/MobileCheckoutBar.tsx
import { CartTotals } from '@/types/cart';
import { FormatUtils } from '@/utils/format';

interface MobileCheckoutBarProps {
  totals: CartTotals;
  onCheckout: () => void;
  hasCustomer: boolean;
  isLoading?: boolean;
}

export const MobileCheckoutBar = ({ 
  totals, 
  onCheckout, 
  hasCustomer, 
  isLoading = false 
}: MobileCheckoutBarProps) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">
            Tổng {totals.totalItems} sản phẩm:{" "}
            <span className="font-semibold text-red-600">
              {FormatUtils.formatPriceVND(totals.totalPrice)}
            </span>
          </div>
        </div>
        <button
          onClick={onCheckout}
          disabled={isLoading}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {isLoading 
            ? 'Đang xử lý...' 
            : hasCustomer 
              ? "Đặt hàng" 
              : "Thêm thông tin & đặt hàng"
          }
        </button>
      </div>
    </div>
  );
};