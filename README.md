🛠️ Universal UE5 Zen Tool
Universal UE5 Zen Tool je špecializované grafické rozhranie (GUI) určené pre modérov a prekladateľov pracujúcich s hrami na Unreal Engine 5. Tento nástroj eliminuje potrebu manuálneho písania zložitých príkazov do terminálu a poskytuje prehľadný workflow pre prácu s .utoc a .ucas archívmi.
🚀 Kľúčové Vlastnosti
1. Manažment Hier (Profily)
Ukladanie neobmedzeného množstva profilov pre rôzne hry.
Definícia koreňového adresára hry, cesty k PAK súborom a AES dešifrovacích kľúčov.
Databáza hier: Obsahuje preddefinované verzie enginu pre populárne tituly (Stalker 2, Tekken 8, Silent Hill 2, atď.).
2. Operácie s Archívmi
Extrakcia (Zen → Legacy): Prevod moderných Zen archívov do editovateľných .uasset súborov. Podpora filtrovania konkrétnych súborov pre rýchlejšiu prácu.
Balenie (Legacy → Zen): Zabalenie upravených súborov (napr. lokalizácie) späť do formátu, ktorý hra dokáže načítať.
Automatické Názvoslovie: Generuje názvy súborov podľa štandardov (napr. z_Project_SK_300_P.utoc), ktoré zabezpečujú prioritu načítania módu.
3. Integrácia Nástrojov
Podpora pre Retoc (odporúčaný pre stabilitu).
Podpora pre Castoc (experimentálny nástroj pre špecifické prípady).
Možnosť nastaviť vlastné cesty k .exe súborom nástrojov v nastaveniach.
4. Systém Kontroly Aktualizácií
Aktívne sledovanie verzií pre retoc a UAssetGUI.
Rýchle odkazy na stiahnutie najnovších verzií priamo z GitHubu.
📦 Inštalácia a Používanie
Prvotné nastavenie:
Prejdite do karty Nastavenia.
Zadajte cesty k vašim lokálnym verziám retoc.exe alebo castoc.exe.
Vytvorenie profilu:
V karte Profily Hier pridajte novú hru.
Zadajte názov a cesty k súborom hry. Ak aplikácia rozpozná hru, ponúkne vám automatické nastavenie verzie enginu.
Generovanie príkazu:
V karte Operácie zvoľte, či chcete extrahovať alebo baliť.
Vyplňte potrebné cesty.
Kliknite na GENEROVAŤ PRÍKAZ.
Skopírujte príkaz a vložte ho do PowerShellu spusteného ako správca.
🛠️ Technické Detaily
Frontend: React 19, TypeScript
Styling: Tailwind CSS (Moderný Dark Mode / Slate téma)
Ikony: Lucide React
Perzistencia: Browser LocalStorage API
API: GitHub REST API (pre kontrolu aktualizácií)
⚠️ Dôležité informácie
Tento nástroj neupravuje súbory priamo. Je to generátor príkazov, ktoré musíte spustiť vo vašom systéme.
Pre správne fungovanie balenia je nevyhnutné zvoliť správnu verziu Unreal Enginu v profile hry.
Pri extrakcii šifrovaných hier je nutné zadať platný AES kľúč.
