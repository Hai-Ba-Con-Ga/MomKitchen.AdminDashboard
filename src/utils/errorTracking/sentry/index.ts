import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://a7168e5713f74609b399a46881fcbbe7@o4505181028679680.ingest.sentry.io/4505181031432192",  
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
    new Sentry.BrowserProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
