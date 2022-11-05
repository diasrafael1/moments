import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IMoment } from "src/app/interfaces/Moment";
import { MomentService } from "src/app/services/moment.service";

@Component({
  selector: "app-edit-moment",
  templateUrl: "./edit-moment.component.html",
  styleUrls: ["./edit-moment.component.css"],
})
export class EditMomentComponent implements OnInit {
  moment!: IMoment;
  btnText = "Editar";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private momentService: MomentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }
}
