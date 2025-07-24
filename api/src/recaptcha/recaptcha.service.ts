// src/recaptcha/recaptcha.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecaptchaService {
  async verifyToken(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY || '';
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);

    try {
      const { data } = await axios.post(url, params);
      return data.success;
    } catch (error) {
      console.error('Captcha verify error:', error);
      return false;
    }
  }
}
