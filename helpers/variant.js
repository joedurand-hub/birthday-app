export const cc = (...classNames) => {
  return classNames
    .filter((className) => typeof className === "string")
    .join(" ");
};
