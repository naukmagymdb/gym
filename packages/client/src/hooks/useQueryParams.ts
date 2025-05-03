import { useState } from 'react';

export const useQueryParams = (sortFields: string[], defaultSort?: string) => {
  //   const [page, setPage] = useState(1);
  //   const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState<string>(defaultSort || sortFields[0]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const queryParams = new URLSearchParams();
  //   queryParams.set('page', page.toString());
  //   queryParams.set('limit', limit.toString());
  queryParams.set('sortBy', sort);
  queryParams.set('order', order);
  if (search) queryParams.set('search', search);
  if (filter && filter !== 'all') queryParams.set('filter', filter);

  return {
    // page,
    // setPage,
    // limit,
    // setLimit,
    sort,
    setSort,
    order,
    setOrder,
    search,
    setSearch,
    filter,
    setFilter,
    queryParams,
  };
};
