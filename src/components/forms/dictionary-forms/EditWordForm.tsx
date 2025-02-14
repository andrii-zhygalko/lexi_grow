'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/form-fields/FormField';
import { Input } from '@/components/forms/form-fields/Input';
import Icon from '@/components/common/Icon';
import { WordResponse } from '@/lib/types/dictionary';

interface EditWordFormProps {
  word: WordResponse;
  onSubmit: (data: { en: string; ua: string }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const schema = yup.object().shape({
  en: yup
    .string()
    .required('English word is required')
    .matches(
      /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
      'Please enter a valid English word'
    ),
  ua: yup
    .string()
    .required('Ukrainian word is required')
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      'Please enter a valid Ukrainian word'
    ),
});

export function EditWordForm({
  word,
  onSubmit,
  onCancel,
  isSubmitting,
}: EditWordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      en: word.en,
      ua: word.ua,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[20px]">
      <div className="flex items-center gap-8">
        <div className="w-[354px]">
          <FormField error={errors.en?.message}>
            <Input
              variant="light"
              placeholder="Enter word"
              error={!!errors.en}
              {...register('en')}
            />
          </FormField>
        </div>
        <div className="flex items-center">
          <Icon
            id="#flag-united-kingdom"
            className="h-8 w-8"
            aria-hidden="true"
          />
          <span className="ml-2 font-primary text-base font-medium leading-6 text-text-inverse">
            English
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="w-[354px]">
          <FormField error={errors.ua?.message}>
            <Input
              variant="light"
              placeholder="Enter translation"
              error={!!errors.ua}
              {...register('ua')}
            />
          </FormField>
        </div>
        <div className="flex items-center">
          <Icon id="#flag-ukraine" className="h-8 w-8" aria-hidden="true" />
          <span className="ml-2 font-primary text-base font-medium leading-6 text-text-inverse">
            Ukrainian
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-2.5">
        <Button
          type="submit"
          className="flex-1 h-[56px] rounded-[30px] bg-background-white hover:bg-background-secondary hover:text-brand-primary font-primary text-lg font-bold leading-7 text-text-primary relative"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="mb-1 h-5 w-5 animate-spin shrink-0 absolute left-20 " />
          )}
          Save
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="flex-1 h-[56px] rounded-[30px] border border-border-inputAccentLight font-primary text-lg font-bold leading-7 text-text-inverse"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
