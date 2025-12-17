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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Dashboard Overview</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
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

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Manage Products</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">Add, edit, or remove products from your catalog</p>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              Go to Products →
            </button>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">Process Orders</h4>
            <p className="text-sm text-green-700 dark:text-green-300 mb-3">View and update order statuses</p>
            <button className="text-green-600 dark:text-green-400 text-sm font-medium hover:underline">
              Go to Orders →
            </button>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Manage Users</h4>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">View and manage user accounts</p>
            <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
              Go to Users →
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Database Connection</span>
            <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">API Status</span>
            <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Last Backup</span>
            <span className="text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;