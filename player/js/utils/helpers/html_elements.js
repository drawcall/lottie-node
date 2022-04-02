function createTag(type) {
  if (type === "canvas") return new lottiejs.canvas.Canvas(1, 1);
  else if (type === "image") return new lottiejs.canvas.Image();

  return null;
}
