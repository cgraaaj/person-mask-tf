import { Component, OnInit } from "@angular/core";
import { AppConfig } from "../app.config";
import { ResponseModel } from "./Result";

@Component({
  selector: "app-image-predict",
  templateUrl: "./image-predict.component.html",
  styleUrls: ["./image-predict.component.scss"],
})
export class ImagePredictComponent implements OnInit {
  public predictImg;
  hasResp = false;
  data = new ResponseModel();
  constructor(private _config: AppConfig) {
    this.predictImg = this._config.PredictImage;
  }

  ngOnInit() {}
  onFileSelect(data) {
      if(data) {
          this.hasResp = true;
      }
      this.data = data;
    console.log(data);
  }
}
