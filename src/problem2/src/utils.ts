export const removeExt = (filename: string) => filename.replace(/\.[^/.]+$/, "");

export const preventDrillingEvent = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
}