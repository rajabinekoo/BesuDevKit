export type solcInputSources = Record<string, { content: string }>;

export type solcError = {
  formattedMessage: string;
  message: string;
};

export type solcOutput = {
  contracts: Record<string, Record<string, object>>;
  errors?: Array<solcError>;
};
