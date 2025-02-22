import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/common/Icon';
import type { TrainingAnswer, TrainingTask } from '@/lib/types/training';
import { UI_CONFIG, VALIDATION_PATTERNS } from '@/lib/constants/training';
import { Loader2 } from 'lucide-react';

interface TrainingRoomProps {
  task: TrainingTask;
  isLastTask: boolean;
  onNext: (answer: string) => void;
  onSave: (lastAnswer?: string) => void;
  onCancel: () => void;
  error?: string | null;
  isSubmitting: boolean;
  answers: TrainingAnswer[];
}

export function TrainingRoom({
  task,
  answers,
  isLastTask,
  onNext,
  onSave,
  onCancel,
  isSubmitting,
}: TrainingRoomProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateInput = (value: string) => {
    if (!value) return true;
    const pattern = VALIDATION_PATTERNS[task.task];
    if (!pattern.test(value)) {
      setValidationError(UI_CONFIG[task.task].validationError);
      return false;
    }
    setValidationError('');
    return true;
  };

  const canSave = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return false;

    const pattern = VALIDATION_PATTERNS[task.task];
    return pattern.test(trimmedValue);
  };

  const handleNext = () => {
    if (validateInput(value.trim())) {
      onNext(value.trim());
      setValue('');
    }
  };

  const handleSaveClick = () => {
    if (validateInput(value.trim())) {
      onSave(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isLastTask) {
        if (validateInput(value.trim()) && canSave()) {
          onSave(value.trim());
        }
      } else {
        handleNext();
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [task]);

  const questionValue = task.task === 'en' ? task.ua : task.en;
  const config = UI_CONFIG[task.task];

  return (
    <>
      <div className="rounded-[15px] bg-background-white p-[18px]">
        <div className="flex">
          <div className="relative h-[302px] flex-1 rounded-l-lg border-r border-border-light bg-background-secondary p-[22px]">
            <div className="relative flex items-center justify-between">
              <Input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => validateInput(value)}
                onKeyDown={handleKeyDown}
                placeholder={config.placeholder}
                className="w-full border-none bg-transparent pl-0 pr-2 font-primary text-xl font-medium text-text-primary placeholder:text-text-primary placeholder:pl-1 placeholder:translate-y-0.5 focus-visible:ring-0"
              />
              <div className="flex items-center">
                <Icon
                  id={
                    task.task === 'ua'
                      ? '#flag-ukraine'
                      : '#flag-united-kingdom'
                  }
                  className="h-8 w-8"
                  aria-hidden="true"
                />
                <span className="ml-2 font-primary text-base font-medium leading-6 text-text-primary">
                  {task.task === 'ua' ? 'Ukrainian' : 'English'}
                </span>
              </div>
            </div>
            {validationError && (
              <p className="absolute mt-1 text-xs text-status-errorDark">
                {validationError}
              </p>
            )}
            {!isLastTask && (
              <Button
                variant="ghost"
                onClick={handleNext}
                className="absolute px-2 bottom-6 flex items-center font-primary text-base font-medium text-text-secondary/50 transition-colors duration-200 hover:text-brand-primary group"
              >
                Next
                <Icon
                  id="#arrow-right"
                  className="mb-1 ml-2 h-5 w-5 stroke-brand-primary fill-none transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            )}
          </div>
          <div className="flex-1 rounded-r-lg bg-background-secondary p-[22px]">
            <div className="flex items-center justify-between">
              <span className="-mb-1 font-primary text-xl font-medium text-text-primary">
                {questionValue}
              </span>
              <div className="flex items-center">
                <Icon
                  id={
                    task.task === 'en'
                      ? '#flag-ukraine'
                      : '#flag-united-kingdom'
                  }
                  className="h-8 w-8"
                  aria-hidden="true"
                />
                <span className="ml-2 font-primary text-base font-medium leading-6 text-text-primary">
                  {task.task === 'en' ? 'Ukrainian' : 'English'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex gap-2.5">
        <Button
          onClick={handleSaveClick}
          className="relative h-14 w-[200px] rounded-[30px] bg-brand-primary font-primary text-lg font-bold leading-7 text-text-inverse transition-colors duration-200 hover:bg-brand-primaryHover disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || (!canSave() && answers.length === 0)}
        >
          {isSubmitting && (
            <Loader2 className="absolute left-14 mb-1 h-5 w-5 animate-spin shrink-0" />
          )}
          Save
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="h-14 w-[200px] rounded-[30px] border-brand-primary font-primary text-lg font-bold leading-7 text-brand-primary"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
