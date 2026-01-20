export const aboutController = {
  index: {
    handler(request, h) {
      const viewData = {
        title: "Weather",
      };
      console.log("about rendering");
      return h.view("about-view", viewData);
    },
  },
};
