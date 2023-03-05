import './Home.scss';
import { useState, useEffect } from 'react';
import InputSearch from '../../components/InputSearch';
import Dropbox from '../../components/Dropbox';
import { useRequest } from '../../hooks';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Card, CardActionArea, CardMedia } from '@mui/material';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ICountryCard from '../../interfaces/ICountryCard';
import { useNavigate } from 'react-router-dom';

interface MediaProps {
  loading: boolean,
  data: Array<object>,
  error: string,
  page: number,
  itemsPerPage: number,
};

function Media({ loading, data, error, page, itemsPerPage }: MediaProps) {

  const [filteredData, setFilteredData] = useState<Array<object>>([]);


  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const startIndex: number = (page - 1) * itemsPerPage;
      const endIndex: number = startIndex + itemsPerPage;
      const newData: Array<object> = data.slice(startIndex, endIndex);
      setFilteredData(newData);
    }
  }, [data, page]);

  return (
    <>
      <div className='cards__container'>
        {(loading || !filteredData ? Array.from(new Array(8)) : filteredData).map((item: ICountryCard, index) => (
          <CardActionArea key={index} onClick={() => { navigate(`/home/${item.name}/details`); window.scrollTo(0, 0); }} >
            <Card className='element'>
              {item ? (
                <CardMedia
                  component="img"
                  height="250"
                  image={item.flag}
                  alt={item.name}
                />
              ) : (
                <Skeleton variant="rectangular" height={180} style={{ minWidth: '300px' }} />
              )}
              {item ? (
                <Box sx={{ p: 2 }}>
                  <h3 className='title__country'>{item.name}</h3>
                  <ul className='characteristics'>
                    <li><span>Pupulation: </span>{item.population}</li>
                    <li><span>Region: </span>{item.region}</li>
                    <li><span>Capital: </span>{item.capital}</li>
                  </ul>
                </Box>
              ) : (
                <Box sx={{ pt: 3, pl: 2, pb: 2 }}>
                  <Typography paddingBottom={.8} variant="h4">{loading && <Skeleton width="40%" />}</Typography>
                  <Skeleton width="70%" />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Box>
              )}
            </Card>
          </CardActionArea>
        ))
        }
      </div>

    </>

  );
}

export default function Home() {
  const [query, setQuery] = useState<object | null>({});
  const [region, setRegion] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage: number = 8;


  const [data, loading, error] = useRequest(query, ['flag', 'name', 'population', 'region', 'capital']);

  function changeRegion(region: string) {
    setRegion(region);
    setQuery({ region });
  }

  function handleSearchCountry(country: string) {
    setQuery(country ? { name: country } : null);
  }

  function handleOnFocus() {
    setPage(1);
    setRegion(null);
  }


  return (
    <main role='main' className="home__container">
      <div className='head'>
        <InputSearch handleSearchCountry={handleSearchCountry} handleOnFocus={handleOnFocus} />
        <Dropbox region={region} changeRegion={changeRegion} />
      </div>
      <div>
        <Media
          loading={loading as boolean}
          data={data as Array<object>}
          error={error as string}
          page={page as number}
          itemsPerPage={itemsPerPage as number}
        />
        <div className='pagination__container'>
          {
            data &&
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
              />
            </Stack>
          }
        </div>
      </div>
    </main>
  )
}