import { useToast } from '@/hooks/use-toast';

export const useAppToast = () => {
  const { toast } = useToast();

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
        title: 'Success',
        description: message,
        duration: 2000,
      });
    },
  };
};
