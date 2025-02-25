import { Dashboard } from '@/components/dictionary/dashboard/Dashboard';

export default function DictionaryPage() {
  return (
    <div className="min-h-screen bg-background-page px-4 md:px-8 pt-8 md:pt-20 lg:px-[100px] lg:pt-20 pb-12 lg:max-w-[1440px] mx-auto">
      <Dashboard variant="dictionary" />
    </div>
  );
}
