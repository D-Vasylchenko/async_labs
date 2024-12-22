//task1
const TransformArrayAsync = (array, transformFunction, finalCallback) => {
    const results = [];
    let hasErrorOccurred = false;
    let pendingTasks = array.length;

    array.forEach((item, index) => {
        transformFunction(item, (error, transformedValue) => {
            if (hasErrorOccurred) return;

            if (error) {
                hasErrorOccurred = true;
                finalCallback(error, null);
                return;
            }

            results[index] = transformedValue;
            pendingTasks--;

            if (pendingTasks === 0) {
                finalCallback(null, results);
            }
        });
    });
};

const numbers = [1, 2, 3, 4];

TransformArrayAsync(
    numbers,
    (num, callback) => {
        setTimeout(() => {
            callback(null, num * 2);
        }, 1000);
    },
    (error, mappedResults) => {
        if (error) {
            console.log("Error occurred:", error);
        } else {
            console.log("Mapped Array:", mappedResults); //mapped arr [2, 4, 6, 8]
        }
    }
);
