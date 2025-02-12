'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/common/Icon';

export function Filters() {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Find the word"
          className="h-12 min-w-[300px] rounded-[15px] border-border-default px-6 py-3 font-primary text-base font-medium placeholder:text-text-primary "
        />
        <Icon
          id="#search"
          className="absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 stroke-text-primary fill-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative">
        <Select>
          <SelectTrigger className="h-12 min-w-[200px] rounded-[15px] border-border-default px-6 py-3 font-primary text-base font-medium">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Categories</SelectItem>
            {/* More categories will be added later */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
