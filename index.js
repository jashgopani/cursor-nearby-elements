exports.nearbyElements = function (directions, offset) {
    const angles = Array(directions ?? 8)
        .fill(0.25)
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
            if (element && acc.findIndex((ae) => ae.id === element.id) < 0) {
                if (predicate === null || (predicate && predicate(element)))
                    return [...acc, modifier ? modifier(element) : element];
            }

            return acc;
        }, []);
    };
};
