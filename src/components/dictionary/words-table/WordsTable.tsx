import { TruncatedCell } from './TruncatedCell';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Icon from '@/components/common/Icon';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { WordResponse } from '@/lib/types/dictionary';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';
import { deleteWord } from '@/redux/features/dictionary/operations';
import { showSuccess } from '@/lib/utils';
import { WORDS_PER_PAGE } from '@/lib/constants/dashboard';

type WordsTableProps = {
  words: WordResponse[];
  isLoading: boolean;
} & (
  | {
      variant: 'dictionary';
      onEditWord: (word: WordResponse) => void;
    }
  | {
      variant: 'recommend';
      onWordAdd: (wordId: string) => void;
      addingWordIds?: string[];
    }
);

const columnHelper = createColumnHelper<WordResponse>();

const baseCellStyles =
  'h-[69px] py-[14px] lg:h-[72px] px-[10px] md:px-[14px] lg:px-[22px] font-primary text-sm md:text-lg lg:text-xl';

const tableBorderStyles = 'border-b border-table-border';

const columnWidths = {
  dictionary: {
    word: 'w-[25%] min-w-[82px] max-w-[82px] md:w-[25%] md:min-w-[160px] md:max-w-[160px] lg:w-[25%] lg:min-w-[180px]',
    translation:
      'w-[35%] min-w-[116px] max-w-[116px] md:w-[25%] md:min-w-[169px] w-[25%] lg:min-w-[180px]',
    category:
      'hidden md:md:table-cell md:w-[22%] md:min-w-[151px] md:max-w-[151px] lg:w-[20%] lg:min-w-[140px]',
    progress:
      'w-[25%] min-w-[95px] md:w-[18%] md:min-w-[122px] lg:w-[15%] lg:min-w-[120px]',
    actions:
      'w-[15%] min-w-[50px] md:w-[10%] md:min-w-[66px] lg:w-[15%] lg:min-w-[100px]',
  },
  recommend: {
    word: 'w-[25%] min-w-[90px] max-w-[90px] md:w-[25%] md:min-w-[180px] md:max-w-[180px] lg:w-[30%] lg:min-w-[200px]',
    translation:
      'w-[35%] min-w-[116px] max-w-[116px] md:w-[25%] md:min-w-[180px] md:max-w-[180px] lg:w-[30%] lg:min-w-[200px]',
    category:
      'w-[25%] min-w-[99px] max-w-[99px] md:w-[25%] md:min-w-[160px] md:max-w-[160px] lg:w-[20%] lg:min-w-[140px]',
    actions:
      'w-[15%] min-w-[38px] md:w-[25%] md:min-w-[148px] md:max-w-[148px] lg:w-[20%] lg:min-w-[160px]',
  },
} as const;

export function WordsTable(props: WordsTableProps) {
  const { variant, words, isLoading } = props;
  const dispatch = useAppDispatch();
  const [deletingWordIds, setDeletingWordIds] = useState<string[]>([]);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const handleDeleteWord = (wordId: string) => {
    setDeletingWordIds((prev) => [...prev, wordId]);

    dispatch(deleteWord(wordId))
      .then((result) => {
        if (deleteWord.fulfilled.match(result)) {
          showSuccess('Word deleted successfully');
        }
      })
      .finally(() => {
        setDeletingWordIds((prev) => prev.filter((id) => id !== wordId));
      });
  };

  const handleCellClick = (rowId: string) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const columns = [
    columnHelper.accessor('en', {
      header: () => (
        <div className="flex items-center justify-between">
          <span>Word</span>
          <Icon
            id="#flag-united-kingdom"
            className="h-8 w-8 hidden md:block"
            aria-hidden="true"
          />
        </div>
      ),
      cell: (info) => (
        <TruncatedCell
          content={info.getValue()}
          isExpanded={expandedRowId === info.row.id}
          onClick={() => handleCellClick(info.row.id)}
        />
      ),
    }),
    columnHelper.accessor('ua', {
      header: () => (
        <div className="flex items-center justify-between">
          <span>Translation</span>
          <Icon
            id="#flag-ukraine"
            className="h-8 w-8 hidden md:block"
            aria-hidden="true"
          />
        </div>
      ),
      cell: (info) => (
        <TruncatedCell
          content={info.getValue()}
          isExpanded={expandedRowId === info.row.id}
          onClick={() => handleCellClick(info.row.id)}
        />
      ),
    }),
    columnHelper.accessor('category', {
      header: () => <div>Category</div>,
      cell: (info) => (
        <TruncatedCell
          content={info.getValue()}
          isExpanded={expandedRowId === info.row.id}
          onClick={() => handleCellClick(info.row.id)}
          className="capitalize"
        />
      ),
    }),
    ...(variant === 'dictionary'
      ? [
          columnHelper.accessor('progress', {
            header: 'Progress',
            cell: ({ getValue }) => {
              const value = getValue();
              return (
                <div className="flex justify-center md:justify-start items-center">
                  <div className="hidden md:block w-[48px] text-left">
                    <span>{value}%</span>
                  </div>
                  <div className="mb-1 md:ml-1.5">
                    <ProgressCircle value={value} />
                  </div>
                </div>
              );
            },
          }),
        ]
      : []),
    columnHelper.accessor('_id', {
      header: '',
      cell: ({ row }) => {
        const { _id: id } = row.original;
        if (variant === 'dictionary') {
          const isDeleting = deletingWordIds.includes(id);

          return (
            <div className="flex justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="font-secondary md:text-lg lg:text-[22px] font-semibold px-2 "
                  >
                    ...
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto px-6 py-3 bg-background-white"
                  align="end"
                >
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      className="flex justify-start items-center p-1 w-full"
                      onClick={() => props.onEditWord(row.original)}
                    >
                      <Icon
                        id="#edit"
                        className="mb-1 h-5 w-5 stroke-text-primary fill-none mr-2"
                        aria-hidden="true"
                      />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex justify-start items-center p-1 w-full text-text-error hover:text-text-error"
                      onClick={() => handleDeleteWord(id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      ) : (
                        <Icon
                          id="#delete"
                          className="mb-1 h-5 w-5 stroke-current fill-none mr-2"
                          aria-hidden="true"
                        />
                      )}
                      <span>Delete</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          );
        }

        const isAdding =
          variant === 'recommend' && props.addingWordIds?.includes(id);

        return (
          <Button
            variant="ghost"
            className="px-0 lg:px-1 flex flex-col lg:flex-row w-full md:w-auto md:items-start lg:items-center gap-0.5 lg:gap-2 font-primary text-sm lg:text-base font-medium text-text-primary transition-colors duration-200 hover:text-brand-primary group"
            onClick={() => variant === 'recommend' && props.onWordAdd(id)}
            disabled={isAdding}
          >
            <span className="hidden md:block ">Add to dictionary</span>
            {isAdding ? (
              <Loader2 className="h-5 w-5 animate-spin shrink-0" />
            ) : (
              <Icon
                id="#arrow-right"
                className="h-5 w-5 stroke-brand-primary fill-none shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            )}
          </Button>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const TableWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-[15px] bg-background-white p-0 md:p-[18px] min-h-[552px] md:min-h-[588px] lg:min-h-[612px] ">
      <div className="w-full overflow-x-auto">
        <table className="w-full lg:min-w-[800px] border-separate border-spacing-0">
          {children}
        </table>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <TableWrapper>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={cn(
                    baseCellStyles,
                    tableBorderStyles,
                    'h-[69px] py-[14px] lg:h-[72px] lg:py-[18px] bg-table-row text-left font-primary text-base md:text-lg lg:text-xl font-medium',
                    columnWidths[variant][
                      header.id.split(
                        '_'
                      )[0] as keyof (typeof columnWidths)[typeof variant]
                    ],
                    index === 0 && 'rounded-tl-lg',
                    index === headerGroup.headers.length - 1 && 'rounded-tr-lg',
                    index !== 0 && 'border-l border-table-border'
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {Array.from({ length: WORDS_PER_PAGE }).map((_, rowIndex) => (
            <tr key={rowIndex} className="">
              {Array.from({ length: columns.length }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    baseCellStyles,
                    tableBorderStyles,
                    'bg-table-cell h-[69px] py-[14px] lg:h-[72px] lg:py-[18px]',
                    columnWidths[variant][
                      Object.keys(columnWidths[variant])[
                        colIndex
                      ] as keyof (typeof columnWidths)[typeof variant]
                    ],
                    colIndex !== 0 && 'border-l border-table-border',
                    colIndex === 0 && rowIndex === 2 && 'rounded-bl-lg',
                    colIndex === columns.length - 1 &&
                      rowIndex === 2 &&
                      'rounded-br-lg'
                  )}
                >
                  <div className="h-6 lg:w-32 bg-background-skeleton rounded-2xl animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    );
  }

  if (words.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px] rounded-[15px] bg-background-white">
        <p className="font-primary text-lg text-text-secondary">
          No words found
        </p>
      </div>
    );
  }

  return (
    <TableWrapper>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <th
                key={header.id}
                className={cn(
                  baseCellStyles,
                  tableBorderStyles,
                  'h-[69px] py-[14px] lg:h-[72px] lg:py-[18px] bg-table-row text-left font-primary text-base md:text-lg lg:text-xl font-medium',
                  columnWidths[variant][
                    header.id.split(
                      '_'
                    )[0] as keyof (typeof columnWidths)[typeof variant]
                  ],
                  index === 0 && 'rounded-tl-lg',
                  index === headerGroup.headers.length - 1 && 'rounded-tr-lg',
                  index !== 0 && 'border-l border-table-border'
                )}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={cn(
              'hover:bg-gray-50 transition-colors duration-200',
              expandedRowId === row.id && 'bg-gray-50'
            )}
          >
            {row.getVisibleCells().map((cell, index) => (
              <td
                key={cell.id}
                className={cn(
                  baseCellStyles,
                  tableBorderStyles,
                  'bg-table-cell transition-all duration-200',
                  'overflow-hidden',
                  columnWidths[variant][
                    Object.keys(columnWidths[variant])[
                      index
                    ] as keyof (typeof columnWidths)[typeof variant]
                  ],
                  index !== 0 && 'border-l border-table-border',
                  index === 0 &&
                    row.index === table.getRowModel().rows.length - 1 &&
                    'rounded-bl-lg',
                  index === row.getVisibleCells().length - 1 &&
                    row.index === table.getRowModel().rows.length - 1 &&
                    'rounded-br-lg'
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
}
