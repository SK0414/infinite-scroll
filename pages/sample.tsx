import Card from '@/components/Card';
import useFetchUsers from '@/hooks/useFetchUsers';
import useIntersect from '@/hooks/useIntersect';
import React, { useMemo } from 'react';

const Sample = () => {
  const PAGE_SIZE = 10;
  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchUsers({ size: PAGE_SIZE });
  const datas = useMemo(() => (data ? data.pages.flatMap(({ data }) => data.contents) : []), [data]);

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
          datas.map(({ id, name }) => (
            <Card key={id}>
              <div>
                <span>id: {id}</span>
              </div>
              <div>
                <span>name:{name}</span>
              </div>
            </Card>
          ))}
        <div className="target" style={{ height: '1px' }} ref={ref} />
      </div>
    </>
  );
};

export default Sample;
