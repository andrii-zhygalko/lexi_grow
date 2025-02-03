'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LoginFormData, loginSchema } from '@/lib/schemas/auth/login';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { FormField } from '../form-fields/FormField';
import { Input } from '../form-fields/Input';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // TODO: Implement login logic
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className='w-full max-w-[375px] rounded-t-[25px] bg-primary-primaryLight px-4 pb-[57px] pt-8 md:px-16 md:pb-12 md:pt-12 md:rounded-[30px] md:max-w-[628px]'
      role='region'
      aria-label='Login form'>
      <h1 className='mb-10 font-primary text-[30px] font-semibold leading-8 tracking-[-0.6px] text-text-primary md:text-[40px] md:leading-[48px] md:tracking-[-0.8px]'>
        Login
      </h1>
      <p className='mb-4 font-primary text-base leading-6 text-text-secondary md:text-xl md:leading-[30px] md:text-text-secondary/80'>
        Please enter your login details to continue using our service:
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='[&>*+*]:mt-6 [&>:last-child]:mt-8'
        noValidate>
        <FormField error={errors.email?.message}>
          <Input
            {...register('email')}
            id='email'
            type='email'
            placeholder='Email'
            autoComplete='email'
            required
            error={!!errors.email}
          />
        </FormField>

        <FormField error={errors.password?.message}>
          <div className='relative'>
            <Input
              {...register('password')}
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              autoComplete='current-password'
              required
              error={!!errors.password}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={togglePasswordVisibility}
              className='absolute right-[18px] top-1/2 -translate-y-1/2'
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <Icon
                id={showPassword ? '#eye_open' : '#eye_hidden'}
                className='h-5 w-5 text-text-primary stroke-text-primary fill-none'
                aria-hidden='true'
              />
            </Button>
          </div>
        </FormField>

        <Button type='submit' size='login' className='md:text-lg md:leading-7'>
          Login
        </Button>
      </form>

      <Link
        href='/register'
        className='mt-4 block text-center font-primary text-base font-bold leading-6 text-text-secondary underline hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-border-hover focus-visible:ring-offset-2'>
        Register
      </Link>
    </motion.div>
  );
}
