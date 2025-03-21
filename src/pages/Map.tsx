
import React from 'react';
import Layout from '@/components/Layout';
import MapView from '@/components/Map/MapView';

const Map = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] w-full">
        <MapView allowAddingLocations={true} />
      </div>
    </Layout>
  );
};

export default Map;
