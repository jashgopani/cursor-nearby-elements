/**
 * This returns a function that can be used to find elements near your cursor. The parameters are some configurations which can be set accoriding to use case.
 * @param {Number} directions Number of directions to look for nearby elements around cursor [default is 8]
 * @param {Number} offset The distance from the cursor at which we look for elements [default is 69]
 * @returns Function(event,predicate,modifier)
 */
exports.nearbyElements = function (directions, offset) {
    const angles = Array(directions ?? 8)
        .fill((360 / directions).toFixed(2))
        .map((val, i) => {
            return Math.PI * i * val;
        });

    offset = offset ?? 69;

    return (e, predicate, modifier) => {
        const x = e.clientX; //x position within the element.
        const y = e.clientY; //y position within the element.
        return angles.reduce((acc, rad) => {
            const cx = Math.floor(x + Math.cos(rad) * offset);
            const cy = Math.floor(y + Math.sin(rad) * offset);
            const element = document.elementFromPoint(cx, cy);
            if (element !== null && element !== undefined && acc.findIndex((ae) => ae.id === element.id) < 0) {
                if (predicate === null || (predicate && predicate(element)))
                    return [...acc, modifier ? modifier(element) : element];
            }
            return acc;
        }, []);
    };
};
