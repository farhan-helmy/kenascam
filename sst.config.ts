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
      const site = new NextjsSite(stack, 'site');

      stack.addOutputs({
        SiteUrl: site.url,
      });

      site.attachPermissions(['s3'])
    });
  },
} satisfies SSTConfig;
