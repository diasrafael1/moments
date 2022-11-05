import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MomentService } from "src/app/services/moment.service";
import { IMoment } from "src/app/interfaces/Moment";
import { environment } from "src/environments/environment";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { MessagesService } from "src/app/services/messages.service";

@Component({
  selector: "app-moment",
  templateUrl: "./moment.component.html",
  styleUrls: ["./moment.component.css"],
})
export class MomentComponent implements OnInit {
  moment?: IMoment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluído com sucesso!");
    this.router.navigate(["/"]);
  }
}
