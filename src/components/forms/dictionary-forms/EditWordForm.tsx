import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/form-fields/FormField';
import { Input } from '@/components/forms/form-fields/Input';
import Icon from '@/components/common/Icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  EditWordFormData,
  WordResponse,
  WordCategory,
} from '@/lib/types/dictionary';
import { editWordSchema } from '@/lib/schemas/dictionary/edit-word';

interface EditWordFormProps {
  word: WordResponse | null;
  categories: WordCategory[];
  onSubmit: (data: EditWordFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function EditWordForm({
  word,
  categories,
  onSubmit,
  onCancel,
  isSubmitting,
}: EditWordFormProps) {
  const [selectedRadio, setSelectedRadio] = useState<boolean | undefined>(
    word?.category === 'verb' ? word.isIrregular || false : undefined
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditWordFormData>({
    resolver: yupResolver(editWordSchema),
    defaultValues: {
      en: word?.en,
      ua: word?.ua,
      category: word?.category,
      isIrregular: word?.isIrregular,
    },
  });

  const selectedCategory = watch('category');

  const handleCategoryChange = (value: string) => {
    setValue('category', value as WordCategory, { shouldValidate: true });
    if (value !== 'verb') {
      setValue('isIrregular', undefined);
      setSelectedRadio(undefined);
    } else if (value === 'verb' && word?.category === 'verb') {
      setValue('isIrregular', word?.isIrregular || false);
      setSelectedRadio(word?.isIrregular || false);
    } else {
      setValue('isIrregular', false);
      setSelectedRadio(false);
    }
  };

  const handleRadioChange = (value: boolean) => {
    setSelectedRadio(value);
    setValue('isIrregular', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-10">
        <Select
          value={selectedCategory || ''}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger
            variant="modal"
            className="max-w-[210px] rounded-[15px] shadow-none mt-6"
            aria-label="Select word category"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="max-w-[204px] bg-background-white shadow-lg">
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="mb-1 last:mb-0 py-0 font-primary text-base font-medium text-text-secondary focus:bg-transparent focus:text-brand-primary"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="absolute left-0 mt-1 text-xs text-status-errorDark">
            {errors.category.message}
          </p>
        )}
        {selectedCategory === 'verb' && (
          <div
            className="absolute left-0 -bottom-8 flex gap-4"
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
                    value={value.toString()}
                    onChange={() => handleRadioChange(value)}
                    checked={selectedRadio === value}
                    className="peer sr-only"
                    aria-checked={selectedRadio === value}
                  />
                  <Icon
                    id="#radio-btn"
                    className="absolute inset-0 size-[18px] fill-none stroke-[1.5] stroke-radio-uncheckedLight group-hover:stroke-radio-hoverLight transition-colors duration-200 peer-checked:opacity-0"
                  />
                  <Icon
                    id="#radio-btn-checked"
                    className="absolute scale-125 inset-0 size-[18px] stroke-[3] fill-radio-checkedLight stroke-radio-checked opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                  />
                </div>
                <span className="font-primary text-base font-normal text-text-inverse">
                  {label}
                </span>
              </label>
            ))}
          </div>
        )}
        {errors.isIrregular && (
          <p className="absolute left-0 -bottom-12 text-xs text-status-errorDark">
            {errors.isIrregular.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center gap-8">
        <div className="w-[354px]">
          <FormField error={errors.ua?.message} variant="modal">
            <Input
              variant="light"
              placeholder="Enter word"
              className="placeholder:pl-1 placeholder:translate-y-0.5"
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
      <div className="mt-6 flex items-center gap-8">
        <div className="w-[354px]">
          <FormField error={errors.en?.message} variant="modal">
            <Input
              variant="light"
              placeholder="Enter translation"
              className="placeholder:pl-1 placeholder:translate-y-0.5"
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
      <div className="mt-8 flex gap-2.5">
        <Button
          type="submit"
          className="flex-1 h-[56px] rounded-[30px] bg-background-white hover:bg-background-secondary hover:text-brand-primary font-primary text-lg font-bold leading-7 text-text-primary relative"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="mb-1 h-5 w-5 animate-spin shrink-0 absolute left-[76px] " />
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
