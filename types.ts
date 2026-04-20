export enum EngineVersion {
  UE5_0 = "UE5_0",
  UE5_1 = "UE5_1",
  UE5_2 = "UE5_2",
  UE5_3 = "UE5_3",
  UE5_4 = "UE5_4",
  UE5_5 = "UE5_5",
}

export enum ToolType {
  RETOC = "Retoc",
  CASTOC = "Castoc",
}

export interface GameProfile {
  id: string;
  name: string;
  rootPath: string;
  paksPath: string;
  aesKey: string;
  engineVersion: EngineVersion;
}

export interface AppSettings {
  retocPath: string;
  castocPath: string;
}

export interface GithubRelease {
  tag_name: string;
  html_url: string;
  prerelease: boolean;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'error' | 'success' | 'command';
  message: string;
}