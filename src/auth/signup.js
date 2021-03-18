import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { AuthService } from "../common/services/auth-service";

@inject(AuthService, Router, EventAggregator)
export class Signup {
  constructor(AuthService, Router, EventAggregator) {
    this.authService = AuthService;
    this.router = Router;
    this.eventAggregator = EventAggregator;
    this.error = null;
  }

  signup() {
    this.error = null;

    this.authService
      .signup(this.name)
      .then((data) => {
        this.eventAggregator.publish("user", data.name);
        this.router.navigateToRoute("home");
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}
