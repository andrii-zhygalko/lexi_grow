import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background-page">
      <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
