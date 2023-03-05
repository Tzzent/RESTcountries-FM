import { useState, useEffect } from "react";

export function useRequest(query: object | undefined | null, props: Array<string> | undefined | null) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setData(null);
      await fetch('/data.json')
        .then(response => response.json())
        .then(result => {
          if (!query || !Object.keys(query).length) {
            setData(result);
          } else {
            const finalData = findNecessary(query, props, result);
            setData(finalData);
          }
          setLoading(false);
        })
        .catch(error => {
          setError(`Error: ${error.message}`);
          setLoading(false);
        })
    }
    fetchData();

  }, [query]);

  return [data, loading, error];
}

function findNecessary(query: object | any, props: Array<string> | null | undefined, result: Array<object>) {
  const keys: string[] = Object.keys(query);
  if (props) {
    const datos = result.filter((res: any) => {
      return res[keys[0]].toLowerCase().includes(query[keys[0]].toLowerCase());
    })
    return datos;
  }
  return null;
}


