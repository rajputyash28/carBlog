'use client';

import { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function HeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);

  const handleSubscribeClick = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header onSubscribeClick={handleSubscribeClick} />
      {children}
      <Footer ref={footerRef} />
    </>
  );
}
