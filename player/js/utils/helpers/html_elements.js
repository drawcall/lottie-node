function createTag(type) {
  console.trace(2222);
  switch (type) {
    case "img":
    case "image":
      return new lottiejs.canvas.Image();

    default:
      return new lottiejs.canvas.Canvas(1, 1);
  }
}
