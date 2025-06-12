import {useEffect, useRef, useState} from "react";

export const useGridItemHeight = () => {
    const [itemHeight, setItemHeight] = useState(0);
    const firstItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            if (firstItemRef.current) {
                setItemHeight(firstItemRef.current.offsetHeight);
            }
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);
        if (firstItemRef.current) resizeObserver.observe(firstItemRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    return {firstItemRef, itemHeight};
};