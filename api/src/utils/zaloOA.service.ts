// src/notification/discord.service.ts
import { Injectable } from '@nestjs/common';
import { Order, OrderGiftItem, OrderItem, Product, User } from '@prisma/client';

type ProductWithImages = Product & {
  images?: Array<{ url: string }>;
};
type OrderItemWithDetails = OrderItem & {
  product: ProductWithImages;
  giftItems: OrderGiftItem[];
};
type OrderWithItems = Order & {
  items: OrderItemWithDetails[];
  user: User;
};

import axios from 'axios';

@Injectable()
export class ZaloOAService {
  private readonly webhookUrl = process.env.ZALO_WEB_HOOK || '';
  private readonly storeName = process.env.STORE_NAME || 'Cửa hàng';
  private readonly supportPhone = process.env.SUPPORT_PHONE || '1900-XXXX';
  private formatPhone = (phone) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Format as (+84) XXX XXX XXX
    if (cleaned.startsWith('84')) {
      return `(+84) ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    // Format as 0XXX XXX XXX
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  };
  private formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount || 0);
  };
  private getCurrentTime = (): string => {
    return new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  private formatDetailedItems = (items: OrderItemWithDetails[]): string => {
    return items
      .map((item) => {
        const { product, quantity, unitPrice, giftItems } = item;
        const productImage = product.images?.[0]?.url
          ? `\n     🖼️ ${product.images[0].url}`
          : '';

        let itemText = `   • ${product.name} (SL: ${quantity}) - ${this.formatCurrency(unitPrice || 0)}`;

        if (productImage) {
          itemText += productImage;
        }

        // Add gift items if any
        if (giftItems?.length > 0) {
          const giftsText = giftItems
            .map((gift) => {
              const giftImageText = gift.giftImage
                ? `\n       🖼️ ${gift.giftImage}`
                : '';
              return `     🎁 ${gift.giftName} x${gift.giftQuantity || 1}${giftImageText}`;
            })
            .join('\n');
          itemText += `\n${giftsText}`;
        }

        return itemText;
      })
      .join('\n\n');
  };

  private generateOrderMessage = (order: OrderWithItems): string => {
    const currentTime = this.getCurrentTime();

    // Header with store branding
    const header = `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃           🎉 ĐƠN HÀNG MỚI 🎉           ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

    // Store information section
    const storeInfo = `
🏪 **THÔNG TIN CỬA HÀNG**
└─ 📍 ${this.storeName}
└─ 🕒 ${currentTime}
└─ 📋 Mã đơn: #${order.trackingCode || 'N/A'}`;

    // Customer information section
    const customerInfo = `
👤 **THÔNG TIN KHÁCH HÀNG**
├─ 📝 Họ tên: ${order.user.name || 'N/A'}
├─ 📱 Điện thoại: ${this.formatPhone(order.user.phone)}
└─ 🏠 Địa chỉ: ${order.user.address}`;

    // Order details section
    const orderDetails = `
📦 **CHI TIẾT ĐƠN HÀNG**
${this.formatDetailedItems(order.items)}
📝 Note: ${order.note || 'N/A'}

💰 **TỔNG CỘNG: ${this.formatCurrency(order.total)}**`;

    // Footer
    const footer = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Vui lòng xác nhận đơn hàng trong vòng 15 phút
📞 Hotline hỗ trợ: ${this.supportPhone}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Combine all sections
    let message = `${header}${storeInfo}${customerInfo}${orderDetails}${footer}`;

    // Add store image if provided

    return message.trim();
  };
  async sendOrderNotification(order: OrderWithItems) {
    // // ${itemsTex   t}   l
    let message = this.generateOrderMessage(order);

    await axios.post(this.webhookUrl, {
      content: message,
    });
    // await axios.post(this.webhookUrl, {
    //   content: message,
    // });
    return;
  }
}
