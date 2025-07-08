/** @format */

export type CustomerInfoType = {
  id: number;
  name: string;
  phone: string;
  email: string;
  orders: [];
};

class CustomerInfoLocalStorage {
  private static key = "customerInfo";

  static getCustomer(): any | null {
    const value = localStorage.getItem(this.key);
    return value ? value : null;
  }

  static removeCustomer(): void {
    localStorage.removeItem(this.key);
  }
}

export default CustomerInfoLocalStorage;
