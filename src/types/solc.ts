export type solcInputSources = Record<string, { content: string }>;

export type solcError = {
  formattedMessage: string;
  message: string;
  severity: "error" | "warning";
};

export type solcOutput = {
  contracts: Record<string, Record<string, object>>;
  errors?: Array<solcError>;
};
