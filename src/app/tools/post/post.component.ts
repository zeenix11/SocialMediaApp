import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplayComponent } from '../replay/replay.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData!: PostData;
  @Output() likePostToggle: EventEmitter<PostData> = new EventEmitter;
  creatorName?: string;
  creatorDecription?: string;
  firestore = new FirebaseTSFirestore();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCreatorInfo();
  }
  getCreatorInfo() {
    this.firestore.getDocument(
      {
        path: ["Users", this.postData.creatorId],
        onComplete: result => {
          let userDoc = result.data();
          this.creatorName = userDoc!['publicName'];
          this.creatorDecription = userDoc!['description'];
        }
      }
    );
  }

  onReplayClick() {
    this.dialog.open(ReplayComponent, { data: this.postData.postId });
  }

  likeClick() {
    console.log("click")
  }


}
