import { TestBed } from '@angular/core/testing';

import { StudySetService } from './study-set.service';

describe('StudyService', () => {
  let service: StudySetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudySetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
