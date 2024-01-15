const ArraySort = (array, sortBy, reverse) =>
    array.slice().sort((a, b) => {
        const propA = a[sortBy];
        const propB = b[sortBy];

        if (typeof propA === 'number' && typeof propB === 'number') {
            // Numeric comparison
            return reverse ? propA - propB : propB - propA;
        } else if (typeof propA === 'string' && typeof propB === 'string') {
            // String comparison
            return reverse
                ? propB.localeCompare(propA, undefined, { sensitivity: 'base' })
                : propA.localeCompare(propB, undefined, { sensitivity: 'base' });
        } else {
            // Fallback to default comparison
            return 0;
        }
    });

export default ArraySort;