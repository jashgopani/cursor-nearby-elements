exports.nearbyElements = function (directions = 8, offset = 69) {
    const angles = Array(directions)
        .fill(0.25)
        .map((val, i) => {
            return Math.PI * i * val;
        });

    return (e, predicate = null) => {
        const x = e.clientX; //x position within the element.
        const y = e.clientY; //y position within the element.
        return angles.reduce((acc, rad) => {
            const cx = Math.floor(x + Math.cos(rad) * offset);
            const cy = Math.floor(y + Math.sin(rad) * offset);
            const element = document.elementFromPoint(cx, cy);
            if (
                element &&
                acc.findIndex((ae) => ae.id === element.id) < 0
            ) {
                if (predicate && !predicate(element))
                    return acc;
                else
                    return [...acc, element];
            }

            return acc;
        }, []);
    };
};
