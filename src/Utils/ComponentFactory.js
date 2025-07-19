let idCounter = -1;

export function createComponent(type) {
  if (type === "FrontPage") {
    return {
      id: (++idCounter).toString(),
      type: "FrontPage",
      destination: "",
      days: "",
      nights: "",
      image: "",  // Important: initialize image
    };
  }
  if (type === "Day") {
    return {
      id: (++idCounter).toString(),
      type: "Day",
      title: `DAY ${idCounter}`,
      subtitle: "",
      entries: [],
    };
  }
  return null;
}