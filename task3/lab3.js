//poromise-based map function with AbortController support
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
