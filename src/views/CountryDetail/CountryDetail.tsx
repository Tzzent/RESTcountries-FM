import './CountryDetail.scss';
import { useEffect, useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';
import ICountryDetails from '../../interfaces/ICountryDetails';

export default function CountryDetail() {

  const navigate = useNavigate();
  const { country } = useParams();
  const [borders, setBorders] = useState([]);
  const [data, setData] = useState<ICountryDetails | null>(null);

  useEffect(() => {
    fetchCountry();

  }, []);

  async function fetchCountry() {
    await fetch(`${import.meta.env.BASE_URL}data.json`)
      .then(response => response.json())
      .then(res => {
        const finalData = res.find((r: object) => {
          return (r as { name: string }).name == country;
        })
        setData(finalData)

        let bords = [];
        if (finalData.borders) {
          bords = res.filter((r: object) => {
            return finalData.borders.includes((r as { alpha3Code: string }).alpha3Code);
          })
        }
        setBorders(bords);
      })
      .catch((err) => console.error(err))

  }
  return (
    !data ? <h1>Loading...</h1> :
      <div className='country__details'>
        <button onClick={() => navigate('/home')} className='back__button'><RiArrowLeftLine size={20} />Back</button>
        <div className='detail__container' >
          <div className='image__container'>
            <img src={data?.flag} alt={data?.name} />
          </div>
          <div className='details'>
            <h1>{data?.name}</h1>
            <div className='unlisted'>
              <ul>
                <li><span>Native Name: </span>{data?.nativeName}</li>
                <li><span>Population: </span>{data?.population}</li>
                <li><span>Region: </span>{data?.region}</li>
                <li><span>Sub Region: </span>{data?.subregion}</li>
                <li><span>Capital: </span>{data?.capital}</li>
              </ul>
              <ul>
                <li><span>Top Level Domain: </span>{data?.topLevelDomain}</li>
                <li><span>Currencies: </span>{data?.currencies.map(curr => (curr as { name: string }).name + ', ')}</li>
                <li><span>Languages: </span>{data?.languages.map(lang => (lang as { name: string }).name + ', ')}</li>
              </ul>
            </div>
            <div className='border__countries'>
              <h3>Border Countries</h3>
              <ul>
                {borders.length <= 0 ? 'No borders.' :
                  borders.map((border: object, index: number) => (
                    <li key={index}>{(border as { name: string }).name}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}
