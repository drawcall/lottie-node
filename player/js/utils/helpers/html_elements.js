function createTag(type) {
  
  switch (type) {
    case "img":
    case "image":
      return new lottiejs.canvas.Image();

    default:
      return new lottiejs.canvas.Canvas(1, 1);
  }
}
