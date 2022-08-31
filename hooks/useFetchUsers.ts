import { User } from '@/mocks/handlers/users';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface PaginationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

const userKeys = {
  all: ['data'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const
};

const useFetchUsers = ({ size }: { size: number }) =>
  useInfiniteQuery(
    userKeys.lists(),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      axios.get<PaginationResponse<User>>('/users', {
        params: { page: pageParam, size }
      }),
    {
      getNextPageParam: ({ data: { isLastPage, pageNumber } }) => (isLastPage ? undefined : pageNumber + 1)
    }
  );

export default useFetchUsers;
