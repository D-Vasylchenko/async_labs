const urls = [
    'https://example.com/api/data1',
    'https://example.com/api/data2',
    'https://example.com/api/data3',
    'https://example.com/api/data4',
    'https://example.com/api/data5'
];

//function to simulate an API request
function simulateApiRequest(url) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Fetched data from: ${url}`);
        }, Math.random() * 2000);
    });
}

//function to process API requests concurrently
async function fetchApiDataConcurrently(urls, concurrencyLimit) {
    console.time('API Fetch Time'); // start

    const results = [];
    const executing = [];

    for (const url of urls) {
        const promise = simulateApiRequest(url).then(result => {
            results.push(result);
        });
        executing.push(promise);

        if (executing.length >= concurrencyLimit) {
            await Promise.race(executing);
            executing.splice(executing.findIndex(p => p === promise), 1);
        }
    }

    await Promise.all(executing);

    results.forEach(result => console.log(result));

    console.timeEnd('API Fetch Time');
}
fetchApiDataConcurrently(urls, 3);
