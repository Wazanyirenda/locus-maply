
import React from 'react';
import Layout from '@/components/Layout';
import MapView from '@/components/Map/MapView';

const Explore = () => {
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Map</h1>
        <p className="text-muted-foreground mb-8">
          Discover locations across Africa and see contributions from the community.
        </p>
        
        <div className="h-[70vh] min-h-[500px] w-full border border-border rounded-lg overflow-hidden">
          <MapView />
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
