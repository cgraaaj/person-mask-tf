import { Component, OnInit } from "@angular/core";
import { AppConfig } from "../app.config";

@Component({
  selector: "app-image-predict",
  templateUrl: "./image-predict.component.html",
  styleUrls: ["./image-predict.component.scss"],
})
export class ImagePredictComponent implements OnInit {
  public predictImg;
  constructor(private _config: AppConfig) {
    this.predictImg = this._config.PredictImage;
  }

  ngOnInit() {}
  onFileSelect(data) {
    console.log(data);
  }
}
