import type { TObjectG } from '../../../../general.type';

type TLogsBySource = string[];
type TLogsNoSource = TObjectG<string[]>;
type TLogsBySources = TLogsBySource | TLogsNoSource;

export type { TLogsBySource, TLogsNoSource, TLogsBySources };
