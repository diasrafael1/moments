import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { MomentService } from "src/app/services/moment.service";
import { CommentService } from "src/app/services/comment.service";
import { IMoment } from "src/app/interfaces/Moment";
import { IComment } from "src/app/interfaces/Comment";
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
  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get("text")!;
  }
  get username() {
    return this.commentForm.get("username")!;
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluído com sucesso!");
    this.router.navigate(["/"]);
  }

  onSubmit(formDirective: FormGroupDirective) {}
}
