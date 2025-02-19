import { Modal } from '@/components/common/Modal';
import { EditWordForm } from '@/components/forms/dictionary-forms/EditWordForm';
import { EditWordFormData, WordResponse } from '@/lib/types/dictionary';

interface EditWordModalProps {
  word: WordResponse;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditWordFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function EditWordModal({
  word,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: EditWordModalProps) {
  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title="Edit Word"
      description="Edit word translation"
      className="w-[628px]"
      contentClassName="rounded-[30px] shadow-lg bg-brand-primary p-16 relative"
    >
      <EditWordForm
        word={word}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
