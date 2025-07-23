/** @format */

"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Phone,
  MessageSquare,
  ArrowLeft,
  Search,
  Filter,
} from "lucide-react";
import { ContactInterface } from "@/types/contact";
import PaginationCustom from "@/components/common/PaginationCustom";
import ContactAPI from "@/app/api/contacts/contacts.api";
import { useParams } from "next/navigation";

// Dữ liệu giả lập

const ContactListPage: React.FC = () => {
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [selectedContact, setSelectedContact] =
    useState<ContactInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams();

  const storeID = params.storeId ? parseInt(params.storeId as string) : 1;

  const fetchContacts = async () => {
    setLoading(true);
    let limit = 8;
    let res = await ContactAPI.getContactByQuery({
      currentPage: currentPage,
      limit,
      storeID,
    });
    const total = res.data.total; // tổng số bình luận
    const totalPagesCal = Math.ceil(total / limit);
    setTotalPages(totalPagesCal);
    setContacts(res.data.contacts);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage]);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (contact: ContactInterface) => {
    setSelectedContact(contact);
  };

  const handleBackClick = () => {
    setSelectedContact(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải danh sách liên hệ...</p>
        </div>
      </div>
    );
  }

  if (selectedContact) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={handleBackClick}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại danh sách
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
              <div className="flex items-center">
                <div
                  className={`w-20 h-20 rounded-full ${getAvatarColor(
                    selectedContact.name
                  )} flex items-center justify-center text-white text-2xl font-bold mr-6`}>
                  {getInitials(selectedContact.name)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {selectedContact.name}
                  </h1>
                  <p className="text-blue-100 text-lg">
                    {selectedContact.subject}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Email</p>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors">
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Số điện thoại
                      </p>
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-green-600 hover:text-green-800 transition-colors">
                        {selectedContact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Nội dung liên hệ
                  </h2>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedContact.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Liên hệ</h1>
          <p className="text-gray-600">
            Quản lý và xem các yêu cầu liên hệ từ người dùng
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-medium">
                  {filteredContacts.length} liên hệ
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm liên hệ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-64"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full ${getAvatarColor(
                      contact.name
                    )} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                    {getInitials(contact.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {contact.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {contact.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {contact.phone}
                        </span>
                      </div>
                    </div>

                    <p className="text-blue-600 font-medium mb-2">
                      {contact.subject}
                    </p>
                    <p className="text-gray-600 line-clamp-2 leading-relaxed">
                      {contact.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy liên hệ nào
              </h3>
              <p className="text-gray-500">
                Thử thay đổi từ khóa tìm kiếm hoặc quay lại sau.
              </p>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <PaginationCustom
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactListPage;
