
import React from 'react';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/Admin/AdminLayout';
import AdminStats from '@/components/Admin/AdminStats';

const Admin = () => {
  return (
    <Layout>
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          
          <AdminStats />
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default Admin;
