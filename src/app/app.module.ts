import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppConfig } from "./app.config";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatToolbarModule,
} from "@angular/material";
import { ImagePredictComponent } from "./image-predict/image-predict.component";

@NgModule({
  declarations: [AppComponent, FileUploadComponent, ImagePredictComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
