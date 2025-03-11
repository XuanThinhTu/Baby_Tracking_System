import { useState, useEffect, useCallback } from 'react';
import { getRequest, postRequest, putRequest, deleteRequest, setAuthToken } from '../apiServices';
import { useAuth } from './useAuth';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const useApi = (initialUrl: string = '', method: HttpMethod = 'GET', initialBody: any = null) => {
  const { getToken } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(
    async (url: string = initialUrl, newMethod: HttpMethod = method, body: any = initialBody) => {

      let token = await getToken();

      if (token) setAuthToken(token);

      setLoading(true);
      setError(null);
      try {
        let response;
        switch (newMethod) {
          case 'GET':
            response = await getRequest(url);
            break;
          case 'POST':
            response = await postRequest(url, body);
            break;
          case 'PUT':
            response = await putRequest(url, body);
            break;
          case 'DELETE':
            response = await deleteRequest(url);
            break;
          default:
            throw new Error('Invalid HTTP method');
        }
        setData(response);
        return response;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [initialUrl, method, initialBody]
  );

  useEffect(() => {
    if (initialUrl && method === 'GET') {
      fetchData();
    }
  }, [initialUrl, fetchData]);

  return { data, loading, error, fetchData };
};

export default useApi;
