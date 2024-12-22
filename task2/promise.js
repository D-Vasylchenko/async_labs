const promiseBasedFilter = (inputArray, predicateFunction, maxConcurrency = Infinity) => {
    const resultsArray = [];
    let currentIndex = 0;

    const processNext = () => {
        if (currentIndex >= inputArray.length) return Promise.resolve();

        const itemIndex = currentIndex++;
        return Promise.resolve(predicateFunction(inputArray[itemIndex]))
            .then((isMatch) => {
                if (isMatch) {
                    resultsArray.push(inputArray[itemIndex]);
                }
            })
            .then(() => processNext());
    };

    // Initialize at most `maxConcurrency` parallel operations
    const activePromises = Array(Math.min(maxConcurrency, inputArray.length))
        .fill(null)
        .map(() => processNext());

    return Promise.all(activePromises).then(() => resultsArray);
};
