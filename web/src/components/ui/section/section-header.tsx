
"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  showViewAll?: boolean;
  viewAllText?: string;
  linkViewAll?:string;

 
  accent?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  showViewAll = true,
  viewAllText = "Xem tất cả",
  linkViewAll,

  accent = 'yellow',
  size = 'md'
}) => {
  const router = useRouter();

  // Accent color configurations
  const accentColors = {
    blue: {
      iconBg: 'from-blue-500 to-blue-600',
      iconHover: 'group-hover:from-blue-600 group-hover:to-blue-700',
      buttonBg: 'from-blue-50 to-blue-100',
      buttonHover: 'hover:from-blue-100 hover:to-blue-200',
      buttonText: 'text-blue-700',
      borderAccent: 'bg-blue-500',
      shadowColor: 'shadow-blue-100'
    },
    purple: {
      iconBg: 'from-purple-500 to-purple-600',
      iconHover: 'group-hover:from-purple-600 group-hover:to-purple-700',
      buttonBg: 'from-purple-50 to-purple-100',
      buttonHover: 'hover:from-purple-100 hover:to-purple-200',
      buttonText: 'text-purple-700',
      borderAccent: 'bg-purple-500',
      shadowColor: 'shadow-purple-100'
    },
    green: {
      iconBg: 'from-green-500 to-green-600',
      iconHover: 'group-hover:from-green-600 group-hover:to-green-700',
      buttonBg: 'from-green-50 to-green-100',
      buttonHover: 'hover:from-green-100 hover:to-green-200',
      buttonText: 'text-green-700',
      borderAccent: 'bg-green-500',
      shadowColor: 'shadow-green-100'
    },
    orange: {
      iconBg: 'from-orange-500 to-orange-600',
      iconHover: 'group-hover:from-orange-600 group-hover:to-orange-700',
      buttonBg: 'from-orange-50 to-orange-100',
      buttonHover: 'hover:from-orange-100 hover:to-orange-200',
      buttonText: 'text-orange-700',
      borderAccent: 'bg-orange-500',
      shadowColor: 'shadow-orange-100'
    },
    red: {
      iconBg: 'from-red-500 to-red-600',
      iconHover: 'group-hover:from-red-600 group-hover:to-red-700',
      buttonBg: 'from-red-50 to-red-100',
      buttonHover: 'hover:from-red-100 hover:to-red-200',
      buttonText: 'text-red-700',
      borderAccent: 'bg-red-500',
      shadowColor: 'shadow-red-100'
    },
    yellow: {
      iconBg: 'from-yellow-400 to-yellow-500',
      iconHover: 'group-hover:from-yellow-500 group-hover:to-yellow-600',
      buttonBg: 'from-yellow-50 to-yellow-100',
      buttonHover: 'hover:from-yellow-100 hover:to-yellow-200',
      buttonText: 'text-yellow-700',
      borderAccent: 'bg-yellow-500',
      shadowColor: 'shadow-yellow-100'
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'mb-4',
      iconContainer: 'w-8 h-8 p-2',
      iconSize: 'w-4 h-4',
      titleSize: 'text-base md:text-lg font-bold',
      subtitleSize: 'text-xs md:text-sm',
      buttonPadding: 'px-3 py-1.5',
      buttonText: 'text-xs md:text-sm',
      chevronSize: 'w-3 h-3 md:w-4 md:h-4',
      spacing: 'space-x-2'
    },
    md: {
      container: 'mb-6',
      iconContainer: 'w-12 h-12 p-3',
      iconSize: 'w-6 h-6',
      titleSize: 'text-lg md:text-xl lg:text-2xl font-bold',
      subtitleSize: 'text-sm md:text-base',
      buttonPadding: 'px-4 py-2 md:px-5 md:py-2.5',
      buttonText: 'text-sm md:text-base',
      chevronSize: 'w-4 h-4 md:w-5 md:h-5',
      spacing: 'space-x-3'
    },
    lg: {
      container: 'mb-8',
      iconContainer: 'w-16 h-16 p-4',
      iconSize: 'w-8 h-8',
      titleSize: 'text-xl md:text-2xl lg:text-3xl font-bold',
      subtitleSize: 'text-base md:text-lg',
      buttonPadding: 'px-5 py-2.5 md:px-6 md:py-3',
      buttonText: 'text-base md:text-lg',
      chevronSize: 'w-5 h-5 md:w-6 md:h-6',
      spacing: 'space-x-4'
    }
  };

  const colors = accentColors[accent];
  const sizes = sizeConfig[size];

  return (
    <div className={`w-full ${sizes.container}`}>
      {/* Main header container */}
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div className={`flex items-center ${sizes.spacing}`}>
          {/* Title and subtitle container */}
          <div className="flex-1 min-w-0">
            {/* Accent border */}
            <div className={`w-8 h-1 ${colors.borderAccent} rounded-full mb-2 opacity-80`}></div>
            
            {/* Title */}
            <h2 className={`
              ${sizes.titleSize} 
              text-gray-900 
              leading-tight 
              tracking-tight
              transition-colors duration-300
            `}>
              {title}
            </h2>
            
            {/* Subtitle */}
            {subtitle && (
              <p className={`
                ${sizes.subtitleSize} 
                text-gray-600 
                mt-1 
                leading-relaxed
                transition-colors duration-300
              `}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right side - View All button */}
        {showViewAll && (
          <button
            onClick={()=>{
              router.push(linkViewAll ??"/")
            }}
            className={`
            
              group relative overflow-hidden
              ${sizes.buttonPadding}
              bg-gradient-to-r ${colors.buttonBg} ${colors.buttonHover}
              ${colors.buttonText}
              rounded-full
              font-semibold
              transition-all duration-300
              transform hover:scale-105
              shadow-sm hover:shadow-md
              border border-gray-200/50 hover:border-gray-300/50
              backdrop-blur-sm
              flex items-center ${sizes.spacing.replace('space-x-', 'space-x-')}
              flex-shrink-0
            `}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            
            {/* Button content */}
            <span className={`relative z-10 ${sizes.buttonText} transition-all duration-300`}>
              {viewAllText}
            </span>
            
            <ChevronRight className={`
              relative z-10 ${sizes.chevronSize}
              transition-all duration-300
              group-hover:translate-x-1
            `} />
          </button>
        )}
      </div>

      {/* Decorative bottom border */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>
  );
};