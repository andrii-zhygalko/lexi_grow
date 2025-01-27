interface IconProps {
  id: string;
  className?: string;
}

const Icon = ({ id, className = '' }: IconProps) => {
  return (
    <svg className={className}>
      <use href={`/sprite.svg${id}`} />
    </svg>
  );
};

export default Icon;
