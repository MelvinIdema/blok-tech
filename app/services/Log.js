import * as Sentry from '@sentry/node';
import '@sentry/tracing';

Sentry.init({
  dsn: 'https://5cdee1ce74be453a8a746402daaff2b7@o498758.ingest.sentry.io/5576556',
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

export default function (error) {
  Sentry.captureException(error);
  console.error(error);
}
