
"use client";
// hooks/useCustomerStorage.ts
import { useState, useEffect } from 'react';
import { CustomerData } from '@/types/checkout';
const STORAGE_KEY = 'customerInfo';

export const useCustomerStorage = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get customer data from localStorage
  const getCustomer = (): CustomerData | null => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to get customer info:', error);
      return null;
    }
  };

  // Save customer data to localStorage
  const setCustomer = (customer: CustomerData): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
      setCustomerData(customer);
    } catch (error) {
      console.error('Failed to save customer info:', error);
    }
  };

  // Clear customer data
  const clearCustomer = (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      setCustomerData(null);
    } catch (error) {
      console.error('Failed to clear customer info:', error);
    }
  };

  // Load customer data on mount
  useEffect(() => {
    const savedCustomer = getCustomer();
    setCustomerData(savedCustomer);
    setIsLoading(false);
  }, []);

  return {
    customerData,
    setCustomer,
    clearCustomer,
    isLoading,
    hasCustomer: customerData !== null,
  };
};