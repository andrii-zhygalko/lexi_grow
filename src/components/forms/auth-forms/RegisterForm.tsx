'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { signup } from '@/redux/features/auth/operations';
import { RegisterFormData, registerSchema } from '@/lib/schemas/auth/register';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { FormField } from '../form-fields/FormField';
import { Input } from '../form-fields/Input';
import { ApiError, useAppToast } from '@/lib/utils';
import { getErrorMessage } from '@/lib/utils';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showError } = useAppToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(signup(data)).unwrap();
      router.push('/dictionary');
    } catch (error) {
      showError(getErrorMessage(error as ApiError));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[375px] rounded-t-[25px] bg-brand-primaryLight px-4 pb-[57px] pt-8 md:px-16 md:pb-12 md:pt-12 md:rounded-[30px] md:max-w-[628px]"
    >
      <h1 className="mb-10 font-primary text-[30px] font-semibold leading-8 tracking-[-0.6px] text-text-primary md:text-[40px] md:leading-[48px] md:tracking-[-0.8px]">
        Register
      </h1>
      <p className="mb-4 font-primary text-base leading-6 text-text-secondary md:text-xl md:leading-[30px] md:text-text-secondary/80">
        To start using our services, please fill out the registration form
        below:
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="[&>*+*]:mt-6 [&>:last-child]:mt-8"
        noValidate
      >
        <FormField error={errors.name?.message}>
          <Input
            {...register('name')}
            type="text"
            placeholder="Name"
            autoComplete="name"
            disabled={isSubmitting}
            error={!!errors.name}
          />
        </FormField>

        <FormField error={errors.email?.message}>
          <Input
            {...register('email')}
            type="email"
            placeholder="Email"
            autoComplete="email"
            disabled={isSubmitting}
            error={!!errors.email}
          />
        </FormField>

        <FormField error={errors.password?.message}>
          <div className="relative">
            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="new-password"
              disabled={isSubmitting}
              error={!!errors.password}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[18px] top-1/2 -translate-y-1/2"
              disabled={isSubmitting}
            >
              <Icon
                id={showPassword ? '#eye_open' : '#eye_hidden'}
                className="h-5 w-5 text-text-primary stroke-text-primary fill-none"
              />
            </Button>
          </div>
        </FormField>

        <Button
          type="submit"
          size="login"
          className="md:text-lg md:leading-7"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            'Register'
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-4 block text-center font-primary text-base font-bold leading-6 text-text-secondary underline hover:text-text-primary"
      >
        Login
      </Link>
    </motion.div>
  );
}
