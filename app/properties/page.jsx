import React from 'react';
import Link from 'next/link';
import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';

function PropertiesPage() {
  console.log(properties);
  return (
    <div>
      <h1 className="text-3xl">Properties</h1>
      <Link href="/properties">Go Home</Link>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => {
              return <PropertyCard property={property} key={property._id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PropertiesPage;
