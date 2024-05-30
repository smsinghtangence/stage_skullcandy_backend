module.exports = ({ env }) => ({
  //...
  'import-export-entries': {
    enabled: true,
    config: {
      // See `Config` section.
    },
  },
   
  email: {
    provider: 'sendmail',
    providerOptions: {
      dkim: {
        privateKey: 'replace-with-dkim-private-key',
        keySelector: 'abcd', // the same as the one set in DNS txt record, use online dns lookup tools to be sure that is retreivable
      },
    },
    settings: {
      defaultFrom: 'noreply@tangence.com',
      defaultReplyTo: 'noreply@tangence.com',
    },
  },
  // 
});