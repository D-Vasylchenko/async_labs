//promise-based map function with abort controller
const promiseBasedMap = (items, signal, asyncMapper) => {
    return Promise.all(
        items.map(async (item) => {
            if (signal?.aborted) {
                throw new Error("Operation aborted");
            }

            try {
                return await asyncMapper(item, signal);
            } catch (error) {
                if (signal?.aborted) {
                    throw new Error(`Operation aborted for item: ${item}`);
                }
                throw error;
            }
        })
    );
};
//test cases
//test case 1:map numbers to their double
const controller1 = new AbortController();
const signal1 = controller1.signal;
const numbers1 = [1, 2, 3, 4];

setTimeout(() => controller1.abort(), 5000); //abort after 5000 ms

promiseBasedMap(
    numbers1,
    signal1,
    (num, signal) => {
        return new Promise((resolve, reject) => {
            if (signal.aborted) {
                reject(new Error("Aborted"));
            }

            const onAbort = () => {
                clearTimeout(timeout);
                reject(new Error(`Operation aborted for number ${num}`));
            };

            signal.addEventListener("abort", onAbort);

            const timeout = setTimeout(() => {
                signal.removeEventListener("abort", onAbort);
                resolve(num * 2); // Double the value
            }, 1000);
        });
    }
)
    .then((result) => {
        console.log("Test case 1 - Mapped result:", result);
    })
    .catch((error) => {
        console.error("Test case 1 - Error:", error.message);
    });

//test case 2: map numbers and simulate abort
const controller2 = new AbortController();
const signal2 = controller2.signal;
const numbers2 = [5, 6, 7, 8];

controller2.abort(); // abort immediately

promiseBasedMap(
    numbers2,
    signal2,
    (num, signal) => {
        return new Promise((resolve, reject) => {
            if (signal.aborted) {
                reject(new Error("Aborted"));
            }

            const onAbort = () => {
                clearTimeout(timeout);
                reject(new Error(`Operation aborted for number ${num}`));
            };

            signal.addEventListener("abort", onAbort);

            const timeout = setTimeout(() => {
                signal.removeEventListener("abort", onAbort);
                resolve(num * 2); // Double the value
            }, 1000);
        });
    }
)
    .then((result) => {
        console.log("Test case 2 - Mapped result:", result);
    })
    .catch((error) => {
        console.error("Test case 2 - Error:", error.message);
    });

//test case 3
const controller3 = new AbortController();
const signal3 = controller3.signal;
const numbers3 = [9, 10, 11, 12];

setTimeout(() => controller3.abort(), 3000); // Abort after 3000 ms

promiseBasedMap(
    numbers3,
    signal3,
    (num, signal) => {
        return new Promise((resolve, reject) => {
            if (signal.aborted) {
                reject(new Error("Aborted"));
            }

            const onAbort = () => {
                clearTimeout(timeout);
                reject(new Error(`Operation aborted for number ${num}`));
            };

            signal.addEventListener("abort", onAbort);

            const timeout = setTimeout(() => {
                signal.removeEventListener("abort", onAbort);
                resolve(num * 3); // Triple the value
            }, 1500);
        });
    }
)
    .then((result) => {
        console.log("Test case 3 - Mapped result:", result);
    })
    .catch((error) => {
        console.error("Test case 3 - Error:", error.message);
    });