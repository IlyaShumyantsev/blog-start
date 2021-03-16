export class App {
  constructor() {
    this.title = "";
  }

  configureRouter(config, router) {
    config.title = "My blog";
    config.map([
      {
        route: "",
        name: "home",
        moduleId: PLATFORM.moduleName("posts/index"),
        title: "All Posts",
      },
      {
        route: "posts/:slug",
        name: "post-view",
        moduleId: PLATFORM.moduleName("posts/view"),
        title: "View Post",
      },
    ]);
  }
}
