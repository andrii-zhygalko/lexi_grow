import { Modal } from '@/components/common/Modal';
import { EditWordForm } from '@/components/forms/dictionary-forms/EditWordForm';
import {
  EditWordFormData,
  WordCategory,
  WordResponse,
} from '@/lib/types/dictionary';

interface EditWordModalProps {
  word: WordResponse | null;
  categories: WordCategory[];
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (data: EditWordFormData) => void;
  isSubmitting: boolean;
}

export function EditWordModal({
  word,
  categories,
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: EditWordModalProps) {
  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Edit Word"
      description="Update word details"
      className="w-[628px]"
      hideDescription={true}
    >
      <EditWordForm
        word={word}
        categories={categories}
        onSubmit={onSubmit}
        onCancel={onOpenChange}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
