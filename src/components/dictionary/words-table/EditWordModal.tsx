import { Modal } from '@/components/common/Modal';
import { EditWordForm } from '@/components/forms/dictionary-forms/EditWordForm';
import {
  EditWordFormData,
  WordCategory,
  WordResponse,
} from '@/lib/types/dictionary';

interface EditWordModalProps {
  word: WordResponse;
  categories: WordCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditWordFormData) => void;
  isSubmitting: boolean;
}

export function EditWordModal({
  word,
  categories,
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
      description="Update word details"
      className="w-[628px]"
      hideDescription={true}
    >
      <EditWordForm
        word={word}
        categories={categories}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
