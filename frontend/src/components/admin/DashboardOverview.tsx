import React from 'react';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';
import StatCard from './StatCard';
import { DashboardStats } from '../../types/admin';
import { formatCurrency } from '../../utils/formatters';

interface DashboardOverviewProps {
  stats: DashboardStats;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats }) => {
  return (
    <div>
      <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.products}
          icon={<Package style={{ width: '100%', height: '100%' }} />}
          bgColor="bg-blue-100 dark:bg-blue-900"
          iconColor="text-blue-600 dark:text-blue-300"
        />
        
        <StatCard
          title="Total Orders"
          value={stats.orders}
          icon={<ShoppingBag style={{ width: '100%', height: '100%' }} />}
          bgColor="bg-green-100 dark:bg-green-900"
          iconColor="text-green-600 dark:text-green-300"
        />
        
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={<Users style={{ width: '100%', height: '100%' }} />}
          bgColor="bg-purple-100 dark:bg-purple-900"
          iconColor="text-purple-600 dark:text-purple-300"
        />
        
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<DollarSign style={{ width: '100%', height: '100%' }} />}
          bgColor="bg-yellow-100 dark:bg-yellow-900"
          iconColor="text-yellow-600 dark:text-yellow-300"
        />
      </div>
    </div>
  );
};

export default DashboardOverview;