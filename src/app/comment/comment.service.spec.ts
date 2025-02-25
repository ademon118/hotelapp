import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { HttpClient } from '@angular/common/http';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports :[HttpClient]
    });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
