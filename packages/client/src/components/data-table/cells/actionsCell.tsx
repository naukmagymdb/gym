'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon, EyeIcon, TrashIcon } from 'lucide-react';

import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { EditIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface ActionCellProps<T> {
  row: Row<T>;
  id: string;
  isLoading: boolean;
  openRoute?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionCell<T>({
  row,
  id,
  isLoading,
  openRoute,
  onEdit,
  onDelete,
}: ActionCellProps<T>) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isLoading}>
          <EllipsisIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit flex flex-col gap-2">
        {openRoute && (
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => {
                router.push(openRoute);
              }}
            >
              <EyeIcon className="w-4 h-4" />
              Open
            </Button>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => {
              onEdit();
              router.push(`${pathname}/${id}/edit`);
            }}
          >
            <EditIcon className="w-4 h-4" />
            Edit
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant="ghost" className="justify-start" onClick={onDelete}>
            <TrashIcon className="w-4 h-4" />
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
