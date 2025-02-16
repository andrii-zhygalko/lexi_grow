'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/forms/form-fields/Input';
import { FormField } from '@/components/forms/form-fields/FormField';
import Icon from '@/components/common/Icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddWordFormData, WordCategory } from '@/lib/types/dictionary';
import { addWordSchema } from '@/lib/schemas/dictionary/add-word';

interface AddWordFormProps {
  categories: WordCategory[];
  onSubmit: (data: AddWordFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function AddWordForm({
  categories,
  onSubmit,
  onCancel,
  isSubmitting,
}: AddWordFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddWordFormData>({
    resolver: yupResolver(addWordSchema),
    defaultValues: {
      en: '',
      ua: '',
      category: null,
      isIrregular: undefined,
    },
  });

  const selectedCategory = watch('category');

  const handleCategoryChange = (value: string) => {
    setValue('category', value as WordCategory, { shouldValidate: true });
    if (value !== 'verb') {
      setValue('isIrregular', undefined, { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
      <div className="relative">
        <Select
          value={selectedCategory || ''}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger
            className="h-12 rounded-[15px] border-border-inputLight px-6 py-3 font-primary text-base font-medium text-text-inverse"
            aria-label="Select word category"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="rounded-[15px] bg-background-white p-6 shadow-lg">
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="mb-2 font-primary text-base font-medium text-text-secondary hover:text-brand-primary"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="mt-1 text-sm text-text-error">
            {errors.category.message}
          </p>
        )}
      </div>

      {selectedCategory === 'verb' && (
        <div
          className="absolute left-0 mt-2 flex gap-4"
          role="radiogroup"
          aria-label="Verb type"
        >
          {[
            { label: 'Regular', value: false },
            { label: 'Irregular', value: true },
          ].map(({ label, value }) => (
            <label
              key={label}
              className="group flex cursor-pointer items-center gap-2"
            >
              <div className="relative h-[18px] w-[18px]">
                <input
                  type="radio"
                  {...register('isIrregular')}
                  value={String(value)}
                  checked={watch('isIrregular') === value}
                  className="peer sr-only"
                  aria-checked={watch('isIrregular') === value}
                />
                <Icon
                  id="#radio-btn"
                  className="absolute inset-0 size-[18px] fill-none stroke-[1.5] stroke-radio-uncheckedLight transition-colors duration-200 peer-checked:opacity-0"
                />
                <Icon
                  id="#radio-btn-checked"
                  className="absolute inset-0 size-[18px] scale-125 fill-radio-checkedLight stroke-[3] stroke-radio-checked opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                />
              </div>
              <span className="font-primary text-base font-normal text-text-inverse">
                {label}
              </span>
            </label>
          ))}
          {errors.isIrregular && (
            <p className="mt-1 text-sm text-text-error">
              {errors.isIrregular.message}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-8">
        <div className="w-[354px]">
          <FormField error={errors.ua?.message}>
            <Input
              variant="light"
              placeholder="Enter word"
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
      <div className="flex items-center gap-8">
        <div className="w-[354px]">
          <FormField error={errors.en?.message}>
            <Input
              variant="light"
              placeholder="Enter translation"
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
      <div className="mt-8 flex justify-end gap-4">
        <Button
          type="submit"
          className="flex-1 h-[56px] rounded-[30px] bg-background-white hover:bg-background-secondary hover:text-brand-primary font-primary text-lg font-bold leading-7 text-text-primary relative"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="mb-1 h-5 w-5 animate-spin shrink-0 absolute left-20 " />
          )}
          Add
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
