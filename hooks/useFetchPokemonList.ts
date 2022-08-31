import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface IPokemonList {
  name: string;
  url: string;
}

interface PaginationResponse<T> {
  results: T[];
  count: number;
  next: string;
  previous: string;
}

const useFetchPokemonList = ({ size }: { size: number }) =>
  useInfiniteQuery(
    ['pokemonList'],
    ({ pageParam = 0 }: QueryFunctionContext) =>
      axios.get<PaginationResponse<IPokemonList>>('https://pokeapi.co/api/v2/pokemon', {
        params: { offset: pageParam, limit: size },
      }),
    {
      getNextPageParam: ({ data: { next } }) => (next ? Number(new URL(next).searchParams.get('offset')) : undefined),
    }
  );

export default useFetchPokemonList;
