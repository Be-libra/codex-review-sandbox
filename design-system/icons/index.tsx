interface IconProps {
  size?: number;
  className?: string;
}

export const StarIcon = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M8 1.5l2 4.4 4.5.5-3.3 3.1.8 4.5L8 11.8l-4 2.2.8-4.5L1.5 6.4 6 5.9 8 1.5z" stroke="currentColor" />
  </svg>
);

export const TrashIcon = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3 5h10M6.5 5V3.5h3V5M5 5l.7 8h4.6L11 5" stroke="currentColor" />
  </svg>
);

export const SpinnerIcon = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeDasharray="24" />
  </svg>
);
