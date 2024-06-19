// src/utils.js
export const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  