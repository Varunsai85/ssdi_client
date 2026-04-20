import type { LucideProps } from 'lucide-react';

const XIcon = ({ color = 'currentColor', className, ...props }: LucideProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    {...props}
  >
    <path d="M18.901 1.152h3.68l-8.033 9.19L24 22.848h-7.406l-5.803-7.597-6.64 7.597h-3.68l8.574-9.814L0 1.152h7.593l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
  </svg>
);

export default XIcon;
