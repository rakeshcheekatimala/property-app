import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';

function HomePage() {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <h1 className="text-3xl">Welcome</h1>
      <Link href="/properties">Show Properties</Link>
      <Footer />
    </div>
  );
}

export default HomePage;
