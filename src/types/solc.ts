export type solcInputSources = Record<string, { content: string }>;

export type solcOutput = { contracts: Record<string, Record<string, object>> };
