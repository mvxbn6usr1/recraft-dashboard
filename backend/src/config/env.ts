import { z } from 'zod';

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_VERSION: z.string().default('v1'),
  PORT: z.string().transform(Number).default('3000'),

  // Database
  DATABASE_URL: z.string().url(),
  TEST_DATABASE_URL: z.string().url().optional(),

  // Authentication
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FORMAT: z.enum(['dev', 'combined', 'common', 'short', 'tiny']).default('dev'),
});

const validateEnv = () => {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map((issue) => {
        return `${issue.path.join('.')}: ${issue.message}`;
      });
      throw new Error(`Environment validation failed:\n${issues.join('\n')}`);
    }
    throw error;
  }
};

export const env = validateEnv(); 