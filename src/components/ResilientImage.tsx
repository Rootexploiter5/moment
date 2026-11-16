import { useState } from 'react';
import { Award } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function ResilientImage({ src, alt, title, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF8F4] via-[#F2EBD9] to-[#E9DEC4] text-[#8E6718] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full border border-[#C9A24D]/40 bg-white/80 flex items-center justify-center mb-3">
          <Award className="w-6 h-6 text-[#8E6718]" strokeWidth={1.5} />
        </div>
        <span className="font-display text-lg font-semibold text-[#1C1917]">
          {title || 'Today Mementos'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
