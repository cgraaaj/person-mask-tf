import { environment } from "../environments/environment";

export class AppConfig {
  public readonly DOMAIN = environment.apiURL;
  public readonly PredictImage = this.DOMAIN + "/admin/portfolio/astralis";
  // public readonly PredictImage = this.DOMAIN +'predict/';
}
