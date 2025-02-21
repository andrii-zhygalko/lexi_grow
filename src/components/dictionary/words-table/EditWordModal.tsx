import { Modal } from '@/components/common/Modal';
import { EditWordForm } from '@/components/forms/dictionary-forms/EditWordForm';
import { EditWordFormData, WordResponse } from '@/lib/types/dictionary';

interface EditWordModalProps {
  word: WordResponse;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditWordFormData) => void;
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
      description="Update word translation"
      className="w-[628px]"
      hideTitle={true}
      hideDescription={true}
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
