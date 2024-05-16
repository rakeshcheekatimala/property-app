import React from 'react';
import properties from '@/properties.json';
import PropertyCard from './PropertyCard';
import Link from 'next/link';

const RecentProperties = () => {
  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <>
      <section class="px-4 py-6">
        <div class="container-xl lg:container m-auto">
          <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="container-xl lg:container m-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property) => {
                return <PropertyCard property={property} key={property._id} />;
              })}
            </div>
          </div>
        </div>
      </section>
      <section class="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default RecentProperties;
