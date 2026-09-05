'use client';

import { useEffect, useRef, useState } from 'react';

type AnimateOnScrollProps = {
  children: React.ReactNode;
  animation?: string;
  delay?: string;
};

export default function AnimateOnScroll({
  children,
  animation = 'animate__fadeInUp',
  delay,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        isVisible
          ? `animate__animated ${animation}`
          : 'opacity-0'
      }
      style={{
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}