import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { Observable, pluck } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Comments } from './comment';

@Component({
  selector: 'hinv-comment',
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {

  comments$ !: Observable<any>;

  comment$ !: Observable<any>;

  comments : Comments[] = [];

  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute) {
    this.comments$ = this.commentService.getComments();

    this.comment$ = this.activatedRoute.data.pipe(pluck('comments'));
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data)=>{
      this.comments = data['comments'];
    });
  }

}
