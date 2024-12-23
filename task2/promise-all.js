const filterWithPromises = (items, asyncPredicate) => {
    return Promise.all(
        items.map(async (item) => {
            const predicateResult = await asyncPredicate(item);
            return predicateResult ? item : null;
        })
    ).then((results) => results.filter((item) => item !== null));
};

