/**
 * This returns a function that can be used to find elements near your cursor. The parameters are some configurations which can be set accoriding to use case.
 * @param {Number} directions Number of directions to look for nearby elements around cursor [default is 8]
 * @param {Number} offset The distance from the cursor at which we look for elements [default is 69]
 * @returns Function(event,predicate,modifier)
 */
const nearbyElements = function (directions, offset) {
    directions = directions ?? 8;
    offset = offset ?? 69;

    const angles = Array(directions)
        .fill((2 / directions).toFixed(2))
        .map((val, i) => {
            return Math.PI * i * val;
        });

    const isFunction = (obj) => {
        return typeof obj === "function" && obj;
    };

    return (e, predicate, modifier, offsetPoints, shouldSkipAngle) => {
        const x = e.clientX; //x position within the element.
        const y = e.clientY; //y position within the element.
        const memo = [];
        if (offsetPoints) {
            const zi = offsetPoints.indexOf(0);
            if (zi > -1) {
                offsetPoints.splice(zi, 1);
                if (e.target) {
                    if (!predicate || (isFunction(predicate) && predicate(e.target))) {
                        memo.push(isFunction(modifier) ? modifier(e.target) : e.target);
                    }
                }
            }
        }
        return angles.reduce((acc, rad, angleIndex) => {
            if (isFunction(shouldSkipAngle) && shouldSkipAngle(rad, angleIndex)) {
                return acc;
            }
            const offsets = offsetPoints ?? [1];
            const elements = offsets.reduce((elementAccumulator, o) => {
                const cx = Math.floor(x + Math.cos(rad) * offset * o);
                const cy = Math.floor(y + Math.sin(rad) * offset * o);
                const element = document.elementFromPoint(cx, cy);

                if (
                    element &&
                    elementAccumulator.findIndex((ae) => ae.id === element.id) < 0 &&
                    acc.findIndex((ae) => ae.id === element.id) < 0
                ) {
                    if (!predicate || (isFunction(predicate) && predicate(element))) {
                        return [
                            ...elementAccumulator,
                            isFunction(modifier) ? modifier(element) : element,
                        ];
                    }
                }
                return elementAccumulator;
            }, []);
            return acc.concat(elements);
        }, memo);
    };
};

export { nearbyElements };
