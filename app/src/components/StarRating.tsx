import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const StarRating = ({ rate }: { rate: number }) => {
  const numberOfStars = 5;

  const renderStars = () => {
    const stars = [];
    const filledStars = Math.floor(rate);
    const hasHalfStar = rate - filledStars >= 0.5;

    for (let i = 1; i <= numberOfStars; i++) {
      const isFilled =
        i <= filledStars || (i === filledStars + 1 && hasHalfStar);

      stars.push(
        <Star
          key={i}
          className={cn(
            'w-4 h-4',
            isFilled ? 'fill-current text-yellow-500' : 'stroke-current'
          )}
        />
      );
    }

    return stars;
  };

  return <div className="flex justify-start gap-3">{renderStars()}</div>;
};

export default StarRating;
