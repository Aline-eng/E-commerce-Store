import React from 'react';
import { BarChart3, TrendingUp, Users, ShoppingBag } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <BarChart3 className="w-4 h-4" />
          Last 30 days
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$12,345</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-green-600 text-sm">+12.5%</span>
            <span className="text-gray-500 text-sm">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">New Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">234</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-blue-600 text-sm">+8.2%</span>
            <span className="text-gray-500 text-sm">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-purple-600 text-sm">+15.3%</span>
            <span className="text-gray-500 text-sm">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-yellow-600 text-sm">+2.1%</span>
            <span className="text-gray-500 text-sm">vs last month</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trends</h3>
        <div className="h-64 relative">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Chart Grid */}
            <defs>
              <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Revenue Line */}
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              points="20,150 60,120 100,100 140,80 180,90 220,70 260,60 300,50 340,40 380,30"
            />
            
            {/* Data Points */}
            {[20,60,100,140,180,220,260,300,340,380].map((x, i) => {
              const y = [150,120,100,80,90,70,60,50,40,30][i];
              return (
                <circle key={i} cx={x} cy={y} r="4" fill="#3B82F6" className="hover:r-6 transition-all" />
              );
            })}
            
            {/* Labels */}
            <text x="20" y="190" className="text-xs fill-gray-500">Jan</text>
            <text x="100" y="190" className="text-xs fill-gray-500">Mar</text>
            <text x="180" y="190" className="text-xs fill-gray-500">May</text>
            <text x="260" y="190" className="text-xs fill-gray-500">Jul</text>
            <text x="340" y="190" className="text-xs fill-gray-500">Sep</text>
          </svg>
        </div>
      </div>
      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Status Distribution</h3>
          <div className="h-48 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="10" strokeDasharray="60 40" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="10" strokeDasharray="20 80" strokeDashoffset="-60" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="10" strokeDasharray="15 85" strokeDashoffset="-80" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">1.2K</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">60%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Processing</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Cancelled</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">15%</span>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Wireless Headphones', sales: 234, revenue: '$4,680' },
              { name: 'Smart Watch', sales: 189, revenue: '$3,780' },
              { name: 'Laptop Stand', sales: 156, revenue: '$2,340' },
              { name: 'Phone Case', sales: 134, revenue: '$1,340' }
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{product.revenue}</p>
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(product.sales / 234) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;