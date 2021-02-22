import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Photos } from "./interfaces/photo";
import { startingPage } from "./interfaces/starting-page";
import { NasaService } from "./services/nasa.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "nasa";

  rovers: string[] = ["Curiosity", "Opportunity", "Spirit"];
  cameras: string[] = [
    "Front Hazard Avoidance Camera",
    "Rear Hazard Avoidance Camera",
  ];

  userOptions = new FormGroup({
    roverName: new FormControl("", Validators.required),
    cameraName: new FormControl("", Validators.required),
    solNumber: new FormControl(null, Validators.max(1000)),
  });

  arrPhotos: Observable<Photos[]>;

  startingPageInfo: startingPage;
  items: number = 2;

  constructor(private nasaService: NasaService) {
    this.startingPageInfo = {
      date: "",
      explanation: "",
      media_type: "",
      service_version: "",
      title: "",
      url: "",
    };
  }

  ngOnInit(): void {
    this.nasaService.getStartingPage().subscribe((data) => {
      this.startingPageInfo = data;
    });
  }

  makeRequest() {
    if (this.userOptions.invalid) {
      alert("Provide empty fileds.");
      return;
    }
    this.arrPhotos = null;
    this.items = 2;

    this.arrPhotos = this.nasaService.getSelectedPhoto(
      this.transformRover,
      this.solNumber.value,
      this.transformCamera,
      this.items
    );

    this.arrPhotos.subscribe((d) => {
      if (!d.length) {
        alert("There are no photos on this sol");
      }
    });
  }

  loadMore() {
    this.items += 2;
    this.arrPhotos = this.nasaService.getSelectedPhoto(
      this.transformRover,
      this.solNumber.value,
      this.transformCamera,
      this.items
    );
  }

  changeCamera(event) {
    this.userOptions.get("cameraName").setValue(event.target.value);
  }

  changeRover(event) {
    this.userOptions.get("roverName").setValue(event.target.value);
  }

  get solNumber() {
    return this.userOptions.get("solNumber");
  }

  get roverName() {
    return this.userOptions.get("roverName").value;
  }

  get cameraName() {
    return this.userOptions.get("cameraName").value;
  }

  get transformRover() {
    return this.roverName.toLowerCase();
  }

  get transformCamera() {
    switch (this.cameraName) {
      case "Front Hazard Avoidance Camera":
        return "fhaz";
      case "Rear Hazard Avoidance Camera":
        return "rhaz";
      default:
        break;
    }
  }
}
