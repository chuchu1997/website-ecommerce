import React, { useState } from 'react';
import { X, MapPin, User, Phone } from 'lucide-react';

interface AddressInfo {
  name: string;
  phone: string;
  address: string;
}

const AddressPicker: React.FC = () => {
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<AddressInfo>({
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (field: keyof AddressInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name.trim() && formData.phone.trim() && formData.address.trim()) {
      setAddressInfo(formData);
      setIsModalOpen(false);
      setFormData({ name: '', phone: '', address: '' });
    }
  };

  const handleEditAddress = () => {
    if (addressInfo) {
      setFormData(addressInfo);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', phone: '', address: '' });
  };

  const isFormValid = formData.name.trim() && formData.phone.trim() && formData.address.trim();

  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      {/* Address Display Card */}
      {addressInfo && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Delivery Address</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              <span>{addressInfo.name}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Phone className="w-4 h-4 mr-2 text-gray-500" />
              <span>{addressInfo.phone}</span>
            </div>
            <div className="flex items-start text-gray-700">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
              <span>{addressInfo.address}</span>
            </div>
          </div>
          <button
            onClick={handleEditAddress}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit Address
          </button>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={addressInfo ? undefined : () => setIsModalOpen(true)}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 ${
          addressInfo
            ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {addressInfo ? 'Proceed with this address' : 'Add Address'}
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {addressInfo ? 'Edit Address' : 'Add Address'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Address Field */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`flex-1 px-4 py-2 rounded-md font-medium text-white transition-colors ${
                    isFormValid
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {addressInfo ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPicker;