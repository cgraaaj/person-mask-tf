import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ImagePredictComponent } from "./image-predict.component";

describe("ImagePredictComponent", () => {
  let component: ImagePredictComponent;
  let fixture: ComponentFixture<ImagePredictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePredictComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
