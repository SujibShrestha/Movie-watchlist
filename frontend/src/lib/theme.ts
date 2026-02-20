export const toggleDark = () => {
  document.documentElement.classList.toggle("dark");
  return document.documentElement.classList.contains("dark");
};
