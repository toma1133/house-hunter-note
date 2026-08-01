/**
 * Formats a number or string into a thousand-separated string (e.g. 1580 -> "1,580").
 * Returns empty string if value is null/undefined/NaN.
 */
export const formatNumber = (
    val: number | string | null | undefined,
    options?: { decimals?: number }
): string => {
    if (val === null || val === undefined || val === "") return "";
    const num = typeof val === "string" ? parseFloat(val.replace(/,/g, "")) : val;
    if (isNaN(num)) return "";

    if (options?.decimals !== undefined) {
        const parts = num.toFixed(options.decimals).split(".");
        parts[0] = Number(parts[0]).toLocaleString("en-US");
        return parts.join(".");
    }

    return num.toLocaleString("en-US");
};

/**
 * Parses a thousand-separated string into a raw string number or number for input handling.
 */
export const parseFormattedNumber = (val: string): string => {
    return val.replace(/,/g, "");
};
