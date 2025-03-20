
import React from 'react';
import Layout from '@/components/Layout';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import MapView from '@/components/Map/MapView';

const DashboardMap = () => {
  return (
    <Layout>
      <DashboardLayout>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">My Contributions Map</h1>
          <p className="text-muted-foreground">View and manage all your location submissions</p>
          
          <div className="h-[calc(100vh-300px)] min-h-[500px] w-full glass-card overflow-hidden p-0">
            <MapView isDashboardView={true} />
          </div>
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default DashboardMap;
