import { useEffect, useState } from 'react';

export const useFetch = (key, query) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setLoading(true);
		query()
			.then((response) => {
				setData(response);
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}, [key ? key : '']);

	return { data, loading, error };
};
