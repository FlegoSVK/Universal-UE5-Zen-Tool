import { createContext, useContext } from 'react';

export type Language = 'sk' | 'en';

export const translations = {
  sk: {
    appTitle: 'Universal UE5 Zen Tool',
    profilesTab: 'Profily Hier',
    opsTab: 'Operácie',
    settingsTab: 'Nastavenia',
    recommended: 'Odporúčané pre väčšinu hier',
    experimental: 'Experimentálna podpora',
    legacy: 'Legacy (Odporúčané)',
    modern: 'Moderné / Exp.',
    
    // ProfileTab
    noProfiles: 'Žiadne profily neboli načítané.',
    currentProfile: 'Aktuálny Profil Hry',
    selectGame: 'Vyberte hru, ktorú chcete modovať.',
    newGame: 'Nová Hra',
    deleteProfile: 'Zmazať tento profil',
    profileName: 'Názov Profilu',
    profileNamePlaceholder: 'Napr. Stalker 2',
    engineVersion: 'Verzia Enginu (Unreal Version)',
    engineImportant: 'Dôležité pre správne balenie (Grounded 2 je zvyčajne 5.3 alebo 5.4).',
    detectedGame: 'Rozpoznaná hra',
    recommendedVersion: 'Odporučená verzia:',
    apply: 'Použiť',
    rootPath: 'Koreňový Priečinok Hry (Root Path)',
    rootPathPlaceholder: 'Napr. C:\\XboxGames\\Grounded2',
    rootPathHelp: 'Hlavný priečinok inštalácie hry (napr. steamapps/common/GameName).',
    paksPath: 'Priečinok s .pak súbormi (Paks Path)',
    paksPathPlaceholder: 'Napr. C:\\XboxGames\\Grounded2\\Maine\\Content\\Paks',
    paksPathHelp: 'Zvyčajne v: Game/Content/Paks. Tu program hľadá .utoc a .ucas súbory.',
    aesKey: 'AES Kľúč',
    optional: '(Voliteľné)',
    aesKeyHelp: 'Hexadecimálny kľúč potrebný len ak sú súbory hry šifrované.',
    saveProfile: 'Uložiť Nastavenia Profilu',
    pasteClipboard: 'Prilepiť text zo schránky',
    pasteError: 'Nepodarilo sa prečítať schránku. Uistite sa, že ste udelili povolenie.',
    newGameDefaultName: 'Nová Hra',

    // OperationsTab
    extractionTitle: 'Extrakcia (Zen → Legacy)',
    extractionDesc: 'Rozbalenie súborov hry (.utoc/.ucas → .uasset)',
    filterPath: 'Cesta Filtra (Konkrétny súbor .uasset)',
    filterPathPlaceholder: '/GameName/Content/Path/To/Asset.uasset',
    extractOutput: 'Výstupný priečinok extrakcie',
    extractOutputPlaceholder: 'D:\\Modding\\Extracted',
    generateCommand: 'GENEROVAŤ PRÍKAZ',
    errorExtract: 'Chyba: Vyplňte cestu filtra a výstupný priečinok.',
    
    packingTitle: 'Balenie (Legacy → Zen)',
    packingDesc: 'Zabalenie upravených súborov do .utoc/.ucas',
    sourcePath: 'Zdrojový priečinok módu (Source)',
    sourcePathPlaceholder: 'F:\\Preklady\\Grounded 2\\Export',
    destFolder: 'Priečinok pre export (Kde uložiť .utoc)',
    destFolderPlaceholder: 'F:\\Preklady\\Grounded 2',
    modNameLabel: 'Názov Módu (Pattern: z_Nazov_LANG_ID_P)',
    toolLabel: 'Nástroj:',
    versionLabel: 'Verzia:',
    errorPack: 'Chyba: Vyplňte zdrojový a cieľový priečinok.',

    generatedCommand: 'Vygenerovaný Príkaz',
    copy: 'KOPÍROVAŤ',
    copied: 'SKOPÍROVANÉ',
    copyHelp: 'Skopírujte tento príkaz a vložte ho do PowerShell okna (Admin).',

    // SettingsTab
    toolConfig: 'Konfigurácia Nástrojov',
    retocPath: 'Cesta k retoc.exe',
    retocPlaceholder: 'Napr. F:\\Preklady\\Grounded 2\\retoc.exe',
    castocPath: 'Cesta k castoc.exe',
    castocPlaceholder: 'Napr. C:\\Tools\\castoc.exe',
    castocHelp: 'Alternatívny nástroj (voliteľné).',
    updateCheck: 'Kontrola Aktualizácií',
    checkNow: 'Skontrolovať Teraz',
    checking: 'Kontrolujem...',
    openGithub: 'Otvoriť na GitHub',
    
    // Language
    language: 'Jazyk (Language)',
  },
  en: {
    appTitle: 'Universal UE5 Zen Tool',
    profilesTab: 'Game Profiles',
    opsTab: 'Operations',
    settingsTab: 'Settings',
    recommended: 'Recommended for most games',
    experimental: 'Experimental support',
    legacy: 'Legacy (Recommended)',
    modern: 'Modern / Exp.',
    
    // ProfileTab
    noProfiles: 'No profiles loaded.',
    currentProfile: 'Current Game Profile',
    selectGame: 'Select the game you want to mod.',
    newGame: 'New Game',
    deleteProfile: 'Delete this profile',
    profileName: 'Profile Name',
    profileNamePlaceholder: 'e.g. Stalker 2',
    engineVersion: 'Engine Version (Unreal Version)',
    engineImportant: 'Important for correct packing (Grounded 2 is usually 5.3 or 5.4).',
    detectedGame: 'Detected game',
    recommendedVersion: 'Recommended version:',
    apply: 'Apply',
    rootPath: 'Game Root Path',
    rootPathPlaceholder: 'e.g. C:\\XboxGames\\Grounded2',
    rootPathHelp: 'Main game installation folder (e.g. steamapps/common/GameName).',
    paksPath: 'Paks Folder Path',
    paksPathPlaceholder: 'e.g. C:\\XboxGames\\Grounded2\\Maine\\Content\\Paks',
    paksPathHelp: 'Usually in: Game/Content/Paks. The program looks for .utoc and .ucas files here.',
    aesKey: 'AES Key',
    optional: '(Optional)',
    aesKeyHelp: 'Hexadecimal key needed only if the game files are encrypted.',
    saveProfile: 'Save Profile Settings',
    pasteClipboard: 'Paste from clipboard',
    pasteError: 'Failed to read clipboard. Make sure you granted permission.',
    newGameDefaultName: 'New Game',

    // OperationsTab
    extractionTitle: 'Extraction (Zen → Legacy)',
    extractionDesc: 'Unpack game files (.utoc/.ucas → .uasset)',
    filterPath: 'Filter Path (Specific .uasset file)',
    filterPathPlaceholder: '/GameName/Content/Path/To/Asset.uasset',
    extractOutput: 'Extraction Output Folder',
    extractOutputPlaceholder: 'D:\\Modding\\Extracted',
    generateCommand: 'GENERATE COMMAND',
    errorExtract: 'Error: Fill in the filter path and output folder.',
    
    packingTitle: 'Packing (Legacy → Zen)',
    packingDesc: 'Pack modified files to .utoc/.ucas',
    sourcePath: 'Mod Source Folder',
    sourcePathPlaceholder: 'F:\\Translations\\Grounded 2\\Export',
    destFolder: 'Export Folder (Where to save .utoc)',
    destFolderPlaceholder: 'F:\\Translations\\Grounded 2',
    modNameLabel: 'Mod Name (Pattern: z_Name_LANG_ID_P)',
    toolLabel: 'Tool:',
    versionLabel: 'Version:',
    errorPack: 'Error: Fill in the source and destination folders.',

    generatedCommand: 'Generated Command',
    copy: 'COPY',
    copied: 'COPIED',
    copyHelp: 'Copy this command and paste it into a PowerShell window (Admin).',

    // SettingsTab
    toolConfig: 'Tool Configuration',
    retocPath: 'Path to retoc.exe',
    retocPlaceholder: 'e.g. F:\\Translations\\Grounded 2\\retoc.exe',
    castocPath: 'Path to castoc.exe',
    castocPlaceholder: 'e.g. C:\\Tools\\castoc.exe',
    castocHelp: 'Alternative tool (optional).',
    updateCheck: 'Update Check',
    checkNow: 'Check Now',
    checking: 'Checking...',
    openGithub: 'Open on GitHub',
    
    // Language
    language: 'Language',
  }
} as const;

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  lang: Language;
  t: (key: TranslationKey) => string;
}

export const I18nContext = createContext<I18nContextType>({
  lang: 'sk',
  t: (key) => translations.sk[key]
});

export const useTranslation = () => useContext(I18nContext);
