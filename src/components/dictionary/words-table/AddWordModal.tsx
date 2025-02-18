import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { AddWordForm } from '@/components/forms/dictionary-forms/AddWordForm';
import { WordCategory, AddWordFormData } from '@/lib/types/dictionary';

interface AddWordModalProps {
  categories: WordCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddWordFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function AddWordModal({
  categories,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: AddWordModalProps) {
  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title="Add Word"
      description="Create new word translation"
      className="w-[628px]"
      contentClassName="rounded-[30px] shadow-lg bg-brand-primary px-16 py-12 relative"
    >
      <Button
        variant="ghost"
        className="absolute right-5 top-5 p-0 group"
        onClick={onClose}
      >
        <Icon
          id="#close"
          className="h-8 w-8 stroke-text-inverse fill-none group-hover:scale-110 transition-scale duration-200"
          aria-hidden="true"
        />
      </Button>

      <h2 className="font-primary text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-text-inverse">
        Add word
      </h2>

      <p className="mt-5 font-primary text-xl font-normal leading-[30px] text-text-inverse/80">
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>

      <AddWordForm
        categories={categories}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
