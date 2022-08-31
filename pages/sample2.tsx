import React, { useMemo } from 'react';
import useFetchPokemonList from '@/hooks/useFetchPokemonList';
import Card from '@/components/Card';
import useIntersect from '@/hooks/useIntersect';

const Sample2 = () => {
  const PAGE_SIZE = 10;
  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchPokemonList({ size: PAGE_SIZE });
  const datas = useMemo(() => (data ? data.pages.flatMap(({ data }) => data.results) : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <div>
        {datas &&
          datas.map(({ name, url }) => {
            const id = Number(new URL(url).pathname.split('/').at(-2));

            return (
              <Card key={url}>
                <div>
                  <img
                    alt=""
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    style={{ width: '70px' }}
                  />
                </div>
                <Spec title="Name" data={name} />
                <Spec title="ID" data={id} />
              </Card>
            );
          })}
        <div className="target" style={{ height: '1px' }} ref={ref}>
          이 부분이 viewport 내에 위치하게되면 다음 데이터를 불러옵니다.
        </div>
      </div>
    </>
  );
};

export default Sample2;

const Spec = ({ title, data }: { title: string; data: string | number }) => {
  return (
    <>
      <div style={{ width: '100px', textAlign: 'center' }}>
        <b style={{ display: 'block', marginBottom: '10px' }}>{title}</b>
        <span style={{ display: 'block' }}>{data}</span>
      </div>
    </>
  );
};
