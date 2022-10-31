import { Component, OnInit } from "@angular/core";
import { MomentService } from "src/app/services/moment.service";

import { IMoment } from "src/app/interfaces/Moment";
import { environment } from "src/environments/environment";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  allMoments: IMoment[] = [];
  moments: IMoment[] = [];
  baseApiUrl = environment.baseApiUrl;
  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoment().subscribe((response) => {
      const data = response.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString("pt-BR");
      });

      this.allMoments = data;
      this.moments = data;
    });
  }
}
