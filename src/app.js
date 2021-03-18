import { PLATFORM } from "aurelia-pal";
import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { PostService } from "./common/services/post-service";
import { AuthService } from "./common/services/auth-service";

@inject(PostService, AuthService, EventAggregator)
export class App {
  constructor(PostService, AuthService, EventAggregator) {
    this.postSetvice = PostService;
    this.authService = AuthService;
    this.eventAggregator = EventAggregator;
  }

  attached() {
    this.currentUser = this.authService.currentUser;
    this.subscribtion = this.eventAggregator.subscribe("user", (user) => {
      this.currentUser = this.authService.currentUser;
    });

    this.updateSidebar();
    this.postSubscribtion = this.eventAggregator.subscribe(
      "post-updated",
      (updateAt) => {
        this.updateSidebar();
      }
    );
  }

  updateSidebar() {
    this.postSetvice
      .allTags()
      .then((data) => {
        this.tags = data.tags;
      })
      .catch((error) => {
        this.error = error.message;
      });

    this.postSetvice
      .allArchives()
      .then((data) => {
        this.archives = data.archives;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  detached() {
    this.subscribtion.dispose();
    this.postSubscribtion.dispose();
  }

  logout() {
    this.authService
      .logout()
      .then((data) => {
        this.eventAggregator.publish("user", null);
        console.log(data.success);
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  configureRouter(config, router) {
    this.router = router;

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
      {
        route: "tag/:tag",
        name: "tag-view",
        moduleId: PLATFORM.moduleName("posts/tag-view"),
        title: "View Post by Tag",
      },
      {
        route: "archive/:archive",
        name: "archive-view",
        moduleId: PLATFORM.moduleName("posts/archive-view"),
        title: "View Post by Archive",
      },
      {
        route: "login",
        name: "login",
        moduleId: PLATFORM.moduleName("auth/login"),
        title: "Log In",
      },
      {
        route: "signup",
        name: "signup",
        moduleId: PLATFORM.moduleName("auth/signup"),
        title: "Sigh Up",
      },
      {
        route: "create-post",
        name: "create-post",
        moduleId: PLATFORM.moduleName("posts/create"),
        title: "Create Post",
      },
    ]);
  }
}
