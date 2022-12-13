import { useCallback } from 'react';

const useFetch = () => {
  const httpRequest = useCallback(async (requestConfig, id) => {
    const url = !id
      ? 'https://pre-onboarding-selection-task.shop/todos'
      : `https://pre-onboarding-selection-task.shop/todos/${id}`;

    try {
      const response = await fetch(url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return { httpRequest };
};

export default useFetch;
