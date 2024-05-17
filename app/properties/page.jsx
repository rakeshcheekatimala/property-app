import React from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/app/actions';

async function PropertiesPage() {
  const properties = await fetchProperties();
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (
            properties.map((property) => {
              return <PropertyCard property={property} key={property._id} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default PropertiesPage;
