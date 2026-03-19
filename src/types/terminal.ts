export type EntryType = 'input' | 'output' | 'error' | 'success' | 'system';

export interface TerminalEntry {
  type: EntryType;
  text: string;
}

export interface HistoryEntry {
  command: string;
  timestamp: number;
}
