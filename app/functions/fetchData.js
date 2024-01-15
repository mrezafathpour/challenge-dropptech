const FetchData = async () => {
	try {
		const response = await fetch('https://api.punkapi.com/v2/beers');

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data;
	}
	catch (error) {
		console.error('Error fetching data:', error);
	}
};

export default FetchData;