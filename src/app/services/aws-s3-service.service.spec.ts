import { TestBed } from '@angular/core/testing';

import { AwsS3ServiceService } from './aws-s3-service.service';

describe('AwsS3ServiceService', () => {
  let service: AwsS3ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsS3ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
