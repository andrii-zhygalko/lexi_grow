import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
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

      <EditWordForm
        word={word}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
