import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import type { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config() {
    return {
      name: 'kenascam',
      region: 'ap-southeast-1',

    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site',{
        customDomain: {
          domainName: stack.stage === 'prod' ? 'kenascam.xyz' : 'staging.kenascam.xyz',
          isExternalDomain: true,
          cdk: {
            certificate: Certificate.fromCertificateArn(stack, 'Certificate', stack.stage === 'prod' ? 'arn:aws:acm:us-east-1:190930221916:certificate/234c0969-497c-4690-98ee-be86ec6ba87b' : 'arn:aws:acm:us-east-1:190930221916:certificate/13a860f7-b554-4841-afb5-09a19d863113'),
          }
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });

      site.attachPermissions(['s3'])
    });
  },
} satisfies SSTConfig;
