const filterWithPromises = (items, asyncPredicate) => {
    return Promise.all(
        items.map(async (item) => {
            const predicateResult = await asyncPredicate(item);
            return predicateResult ? item : null;
        })
    ).then((results) => results.filter((item) => item !== null));
};

//test cases
const numericArray = [10, 15, 20, 25, 30, 35];
const charArray = ['x', 'y', 'z', 'h', 'e', 'o'];

// test case 1:filter eeven numbers
filterWithPromises(
    numericArray,
    (number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(number % 2 === 0);
            }, 500);
        });
    }
)
    .then((result) => {
        console.log('Even numbers:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

//test case 2:filter characters
filterWithPromises(
    charArray,
    (char) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('hello'.includes(char));
            }, 500);
        });
    }
)
    .then((result) => {
        console.log('Characters in "hello":', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

//test case 3:handle rejection in the predicate
filterWithPromises(
    charArray,
    (char) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Test rejection error'));
            }, 500);
        });
    }
)
    .then((result) => {
        console.log('Filtered characters:', result);
    })
    .catch((error) => {
        console.error('Caught error:', error.message);
    });

//test case 4: filter numbers/20
filterWithPromises(
    numericArray,
    (number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(number > 20);
            }, 500);
        });
    }
)
    .then((result) => {
        console.log('Numbers greater than 20:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
