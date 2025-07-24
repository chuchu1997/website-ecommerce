// src/email/email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: parseInt(this.configService.get('SMTP_PORT') ?? '587'),
      secure: this.configService.get('SMTP_SECURE') === 'true', // hoặc check PORT === '465'
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }
  async sendMail(to: string, subject: string, html: string) {
    const from = this.configService.get('SMTP_FROM');

    return this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
  async sendResetLinkToEmail(
    email: string,
    resetToken: string,
    userName: string,
  ): Promise<void> {
    const resetLink = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: {
        name: this.configService.get('APP_NAME') || 'Your App Name',
        address: this.configService.get('SMTP_USER'),
      },
      to: email,
      subject: '🔐 Link để bạn lấy lại mật khẩu ',
      html: this.getResetPasswordTemplate(userName, resetLink),
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordChangedNotification(
    email: string,
    userName: string,
  ): Promise<void> {
    try {
      const mailOptions = {
        from: {
          name: this.configService.get('APP_NAME') || 'Your App Name',
          address: this.configService.get('SMTP_USER'),
        },
        to: email,
        subject: '🔒 Lấy lại mật khẩu thành công ',
        html: this.getTemplateRegisterSuccess(userName),
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }

  private getTemplateRegisterSuccess(userName: string): string {
    return `...`; // Nội dung giữ nguyên như bạn viết
  }

  private getResetPasswordTemplate(userName: string, resetUrl: string): string {
    return `...`; // Nội dung giữ nguyên như bạn viết
  }
}
