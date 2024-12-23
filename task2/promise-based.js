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

// test cases
const numbersArray = [12, 15, 20, 25, 30, 35, 40, 45, 50];
const isMultipleOfFive = async (num) => num % 5 === 0;

promiseBasedFilter(numbersArray, isMultipleOfFive, 3).then((filteredResults) => {
    console.log(filteredResults); //output: [15, 20, 25, 30, 35, 40, 45, 50]
});

const isGreaterThanTwenty = async (num) => num > 20;
promiseBasedFilter(numbersArray, isGreaterThanTwenty, 2).then((filteredResults) => {
    console.log(filteredResults); //output: [25, 30, 35, 40, 45, 50]
});