import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ImagePredictComponent } from "./image-predict/image-predict.component";

const routes: Routes = [
  // {
  // path: '',
  // component: AppComponent,
  // children: [
  {
    path: "image",
    component: ImagePredictComponent,
  },
  {
    path: "**",
    redirectTo: "image",
  },
  // ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
