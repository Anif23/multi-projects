import slugify from "slugify";
import crypto from "crypto";

export const generateSlug = (name) =>
    slugify(name, { lower: true, strict: true });

// SKU
export const generateSKU = (name = "", category = "") => {
    const n = name.replace(/\s+/g, "").slice(0, 4).toUpperCase();
    const c = category.replace(/\s+/g, "").slice(0, 4).toUpperCase();
    const r = crypto.randomBytes(3).toString("hex").toUpperCase();

    return `${c}-${n}-${r}`;
};

export const cleanBody = (body) => {
    const data = {};

    Object.entries(body).forEach(([k, v]) => {
        if (v !== undefined && v !== "" && v !== "null") {
            data[k] = v;
        }
    });

    return data;
};

export const parseTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    return tags.split(",").map(t => t.trim()).filter(Boolean);
};

export const toDate = (date) => {
    if (!date) return undefined;
    return new Date(date);
};

export const normalizeValue = (value) => {
    if (value === undefined) return undefined;
    if (value === null) return undefined;
    if (value === "null") return undefined;
    if (value === "") return undefined;

    if (value === "true") return true;
    if (value === "false") return false;

    if (!isNaN(value) && value !== "") return Number(value);

    return value;
};

export const toBoolean = (value) => {
    if (value === true || value === "true" || value === 1 || value === "1") return true;
    if (value === false || value === "false" || value === 0 || value === "0") return false;
    return undefined;
};