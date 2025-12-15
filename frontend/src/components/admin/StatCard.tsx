import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor, iconColor }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 ${bgColor} rounded-lg`}>
          <div className={iconColor} style={{ width: '32px', height: '32px' }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;