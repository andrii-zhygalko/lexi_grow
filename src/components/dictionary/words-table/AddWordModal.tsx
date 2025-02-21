import { Modal } from '@/components/common/Modal';
import { AddWordForm } from '@/components/forms/dictionary-forms/AddWordForm';
import { WordCategory, AddWordFormData } from '@/lib/types/dictionary';

interface AddWordModalProps {
  categories: WordCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddWordFormData) => void;
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
      title="Add word"
      description="Adding a new word to the dictionary is an important step in enriching the language base and expanding the vocabulary."
      className="w-[628px]"
    >
      <AddWordForm
        categories={categories}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
