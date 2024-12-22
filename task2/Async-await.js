// async/await solution for map
const asyncBasedMap = async (inputArray, transformFunction) => {
    const transformedResults = [];
    for (const [index, element] of inputArray.entries()) {
        transformedResults.push(await transformFunction(element, index, inputArray));
    }
    return transformedResults;
};

const numbers = [1, 2, 3, 4];

const multiplyByTwoAsync = (number) =>
    new Promise((resolve) => setTimeout(() => resolve(number * 2), 1000));

//example usage
(async () => {
    try {
        const result = await asyncBasedMap(numbers, multiplyByTwoAsync);
        console.log("Mapped result:", result); // Output: [2, 4, 6, 8]
    } catch (error) {
        console.error("Error:", error);
    }
})();
