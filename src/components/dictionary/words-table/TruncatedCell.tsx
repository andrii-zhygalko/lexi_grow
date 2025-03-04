import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Icon from '@/components/common/Icon';

interface TruncatedCellProps {
  content: string;
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
}

export function TruncatedCell({
  content,
  isExpanded,
  onClick,
  className,
}: TruncatedCellProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        setIsTruncated(element.scrollWidth > element.clientWidth);
      }
    };

    checkTruncation();

    window.addEventListener('resize', checkTruncation);

    return () => {
      window.removeEventListener('resize', checkTruncation);
    };
  }, [content]);

  return (
    <div
      ref={contentRef}
      onClick={isTruncated || isExpanded ? onClick : undefined}
      className={cn(
        'transition-all duration-200 relative group',
        !isExpanded && 'truncate',
        (isTruncated || isExpanded) &&
          'cursor-pointer hover:text-brand-primary',
        isExpanded && 'whitespace-normal break-words',
        className
      )}
      title={isTruncated && !isExpanded ? content : 'Click to collapse'}
      aria-expanded={isExpanded}
    >
      {content}

      {(isTruncated || isExpanded) && (
        <span
          className={cn(
            'ml-1 opacity-0 group-hover:opacity-100 inline-flex items-center transition-all duration-200',
            isExpanded && 'opacity-100'
          )}
        >
          <Icon
            id="#arrow-down"
            className={cn(
              'h-4 w-4 fill-brand-primary transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </span>
      )}
    </div>
  );
}
