import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { config, S3, CognitoIdentityCredentials } from 'aws-sdk';

@Injectable({
  providedIn: 'root',
})
export class AwsS3ServiceService {
  constructor() {}

  async fileEvent(fileInput: any) {
    const file = fileInput.target.files[0];

    var albumBucketName = 'amplify-footballmanager-dev-84130-deployment';
    var bucketRegion = 'USEast(N.Virginia) us-east-1';
    var IdentityPoolId = 'us-east-1_PFkmjcivc';
    var IdentityPoolRegion = 'us-east-1';

    if (typeof AWS != 'undefined') {
      console.log('initializing s3 : done');
      AWS.config.region = bucketRegion;
      AWS.config.update({
        region: IdentityPoolRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId,
        }),
      });

      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: albumBucketName },
        httpOptions: { timeout: 1800000 },
      });

      s3.upload(
        {
          Key: file.name,
          Bucket: albumBucketName,
          Body: file,
          ACL: 'public-read',
        },
        (err: any) => {
          if (err) {
            console.log(err.message);
          }
        }
      );
    } else {
      console.log('initializing s3 : redo');
      // setTimeout(initializeS3, 1000);
    }

  }
}
