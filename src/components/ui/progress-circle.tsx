import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/constants/colors';

interface ProgressCircleProps {
  value: number;
  size?: number;
  thickness?: number;
  fillColor?: string;
  backgroundColor?: string;
  className?: string;
}

export function ProgressCircle({
  value,
  size = 26,
  thickness = 4,
  fillColor = colors.progress.fill,
  backgroundColor = colors.progress.background,
  className,
}: ProgressCircleProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  const center = size / 2;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);

  return (
    <div
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={thickness}
          className="transition-all duration-300"
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={fillColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
    </div>
  );
}
