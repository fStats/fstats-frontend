export const getGradientColor = (value: number, minValue: number, maxValue: number, skipOffset: boolean): string => {
    const offset = skipOffset ? value : Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue)));
    return `rgb(${Math.round(5 + 28 * offset)}, ${Math.round(5 + 186 * offset)}, ${Math.round(5 + 95 * offset)})`;
};
