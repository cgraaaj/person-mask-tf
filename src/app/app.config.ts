import { environment } from "../environments/environment";

export class AppConfig {
  public readonly DOMAIN = environment.apiURL;
  public readonly PredictImage = this.DOMAIN +'predict/';
}
