import React, { useState, useEffect } from 'react';
import { User } from '../../types/admin';
import { fetchUsers, updateUser, deleteUser } from '../../services/adminApi';
import UsersManagement from '../../components/admin/UsersManagement';

const AdminCustomers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (!token) return;
      
      const usersData = await fetchUsers(token);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (id: string, userData: any) => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (!token) return;
      
      const updatedUser = await updateUser(token, id, userData);
      setUsers(users.map(u => u._id === id ? updatedUser : u));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (!token) return;
      
      await deleteUser(token, id);
      setUsers(users.filter(u => u._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <UsersManagement
      users={users}
      onEditUser={handleEditUser}
      onDeleteUser={handleDeleteUser}
    />
  );
};

export default AdminCustomers;