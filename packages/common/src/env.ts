import { createEnv } from "@t3-oss/env-core";
import type { ZodRawShape, ZodObject } from "zod";

interface CreateServiceEnvOptions<TSchema extends ZodRawShape> {
  serviceName: string;
  schema: ZodObject<TSchema>;
  runtimeEnv?: NodeJS.ProcessEnv;
}

export function createServiceEnv<TSchema extends ZodRawShape>({
  serviceName,
  schema,
  runtimeEnv = process.env,
}: CreateServiceEnvOptions<TSchema>) {
  return createEnv({
    server: schema.shape,
    runtimeEnv,
    emptyStringAsUndefined: true,
    onValidationError: (error) => {
      throw new Error(
        `[${serviceName}] Environment validation failed:\n${JSON.stringify(error, null, 2)}`,
      );
    },
  });
}
