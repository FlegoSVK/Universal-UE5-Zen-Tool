import { EngineVersion, GameProfile, AppSettings } from "./types";

export const DEFAULT_PROFILE: GameProfile = {
  id: "default",
  name: "Nový Profil Hry",
  rootPath: "C:\\Hry\\PrikladHry",
  paksPath: "C:\\Hry\\PrikladHry\\Project\\Content\\Paks",
  aesKey: "",
  engineVersion: EngineVersion.UE5_3,
};

export const DEFAULT_SETTINGS: AppSettings = {
  retocPath: "F:\\Preklady\\_APK\\retoc.exe",
  castocPath: "C:\\Tools\\castoc.exe",
};

export const MOCK_PROFILES: GameProfile[] = [
  {
    id: "1",
    name: "Stalker 2",
    rootPath: "D:\\Games\\Stalker2",
    paksPath: "D:\\Games\\Stalker2\\Stalker2\\Content\\Paks",
    aesKey: "0x123456789ABCDEF...",
    engineVersion: EngineVersion.UE5_1,
  },
  {
    id: "2",
    name: "Grounded 2 (Príklad)",
    rootPath: "C:\\XboxGames\\Grounded2",
    paksPath: "C:\\XboxGames\\Grounded2\\Maine\\Content\\Paks",
    aesKey: "",
    engineVersion: EngineVersion.UE5_4,
  },
];

// Simple lookup for auto-suggestion based on game name substring
export const GAME_ENGINE_DB: Record<string, EngineVersion> = {
  "stalker": EngineVersion.UE5_1,
  "tekken": EngineVersion.UE5_2,
  "lords of the fallen": EngineVersion.UE5_2,
  "remnant": EngineVersion.UE5_1,
  "palworld": EngineVersion.UE5_1,
  "ark": EngineVersion.UE5_2, // Survival Ascended
  "satisfactory": EngineVersion.UE5_3,
  "senua": EngineVersion.UE5_4, // Hellblade 2
  "hellblade": EngineVersion.UE5_4,
  "grounded": EngineVersion.UE5_4, // Example/Prediction
  "fortnite": EngineVersion.UE5_5, // Usually latest
  "silent hill": EngineVersion.UE5_0,
  "jedi": EngineVersion.UE5_0, // Survivor
  "immortals": EngineVersion.UE5_1, // of Aveum
  "talos": EngineVersion.UE5_2, // Principle 2
  "wukong": EngineVersion.UE5_0, // Black Myth (often 5.0 or custom)
};