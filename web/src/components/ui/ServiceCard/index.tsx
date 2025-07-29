import { ServiceInterface } from "@/types/service";
import { ArrowRight, Calendar, MapPin, Star, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


interface ServiceCardProps {
  service: ServiceInterface;
  onCardClick?: (service: ServiceInterface) => void;
  className?: string;
}
export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onCardClick, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(service);
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Contact for pricing';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <Link 
      prefetch={true}
    href={`/dich-vu/${service.slug}`}
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        
        {!imageError ? (
          <img 
            src={service.imageUrl} 
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Tag className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Service Image</p>
            </div>
          </div>
        )}

        {/* Category Badge */}
        {service.category && (
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg">
              <Tag className="w-3 h-3 mr-1" />
              {service.category.name}
            </span>
          </div>
        )}

        {/* Price Badge */}
        {service.price && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-500 text-white shadow-lg">
              {formatPrice(service.price)}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <span className="text-white text-sm font-medium">5.0</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {service.title}
        </h3>

        {/* Short Description */}
        {service.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {service.shortDescription}
          </p>
        )}

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          {/* <div className="flex items-center text-xs text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Store ID: {service.storeId}</span>
          </div> */}
          
          {service.createdAt && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Created: {formatDate(service.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!service.price && (
              <span className="text-sm font-semibold text-blue-600">
                Liên hệ
              </span>
            )}
          </div>
          
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Xem dịch vụ
            <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300" />
      
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
    </Link>
  );
};
