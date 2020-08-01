import { TestBed } from '@angular/core/testing';

import { NewMeetService } from './meet.service';

describe('NewMeetService', () => {
  let service: NewMeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
