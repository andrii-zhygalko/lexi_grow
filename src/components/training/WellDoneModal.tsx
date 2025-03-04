import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Modal } from '@/components/common/Modal';
import type { TrainingResult } from '@/lib/types/training';

interface WellDoneModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  results: TrainingResult[];
}

export function WellDoneModal({
  isOpen,
  onOpenChange,
  results,
}: WellDoneModalProps) {
  const router = useRouter();
  const correctAnswers = results.filter((result) => result.isDone);
  const mistakes = results.filter((result) => !result.isDone);

  const handleClose = () => {
    onOpenChange();
    router.push('/dictionary');
  };

  const getDisplayValue = (result: TrainingResult) =>
    result.task === 'en' ? result.ua : result.en;

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleClose}
      title="Well done"
      description="Training results summary"
      hideDescription={true}
      className="[&_h2]:text-center max-md:min-w-[320px]"
    >
      <div className="mt-7 flex gap-8 md:gap-16">
        <div className="flex-1">
          <p className="font-primary text-base font-normal leading-6 text-text-inverse/50">
            Correct answers:
          </p>
          <ul className="mt-2 space-y-1">
            {correctAnswers.map((result) => (
              <li
                key={`correct-${result._id}-${result.task}`}
                className="font-primary text-xl font-medium text-text-inverse"
              >
                {getDisplayValue(result)}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <p className="font-primary text-base font-normal leading-6 text-text-inverse/50">
            Mistakes:
          </p>
          <ul className="mt-2 space-y-1">
            {mistakes.map((result) => (
              <li
                key={`mistake-${result._id}-${result.task}`}
                className="font-primary text-xl font-medium text-text-inverse"
              >
                {getDisplayValue(result)}
              </li>
            ))}
          </ul>
          <Image
            src="/images/open_book.png"
            alt="Open book"
            width={152}
            height={121}
            className="h-auto w-[152px] md:w-[225px] translate-x-4 md:translate-x-14 translate-y-10"
          />
        </div>
      </div>
    </Modal>
  );
}
