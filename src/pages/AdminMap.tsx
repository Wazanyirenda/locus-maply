
import React from 'react';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/Admin/AdminLayout';
import MapView from '@/components/Map/MapView';

const AdminMap = () => {
  return (
    <Layout>
      <AdminLayout>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Moderation Map</h1>
          <p className="text-muted-foreground">Verify and manage location submissions</p>
          
          <div className="h-[calc(100vh-300px)] min-h-[500px] w-full glass-card overflow-hidden p-0">
            <MapView isAdminView={true} />
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
};

export default AdminMap;
