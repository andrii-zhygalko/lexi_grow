import { toast } from '@/hooks/use-toast';

export const useAppToast = () => {
  return {
    showError: (error: string) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
        duration: 2000,
      });
    },
    showSuccess: (message: string) => {
      toast({
        variant: 'success',
        title: 'Success',
        description: message,
        duration: 2000,
      });
    },
  };
};

export const showError = (error: string) => {
  toast({
    variant: 'destructive',
    title: 'Error',
    description: error,
    duration: 2000,
  });
};

export const showSuccess = (message: string) => {
  toast({
    variant: 'success',
    title: 'Success',
    description: message,
    duration: 2000,
  });
};
