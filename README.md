# 🛠️ Universal UE5 Zen Tool

Universal UE5 Zen Tool je moderné grafické rozhranie (GUI) určené pre modérov a prekladateľov pracujúcich s hrami na **Unreal Engine 5**. Tento nástroj eliminuje potrebu manuálneho písania zložitých príkazov do terminálu a poskytuje prehľadný workflow pre prácu s `.utoc` a `.ucas` archívmi.

## 🚀 Kľúčové Vlastnosti

### 1. Manažment Hier (Profily)
*   Ukladanie neobmedzeného množstva profilov pre rôzne hry.
*   Definícia koreňového adresára hry, cesty k PAK súborom a AES dešifrovacích kľúčov.
*   **Databáza hier:** Obsahuje preddefinované verzie enginu pre populárne tituly.

### 2. Operácie s Archívmi
*   **Extrakcia (Zen → Legacy):** Prevod moderných Zen archívov do editovateľných `.uasset` súborov.
*   **Balenie (Legacy → Zen):** Zabalenie upravených súborov (napr. lokalizácie) späť do formátu, ktorý hra dokáže načítať.
*   **Automatické Názvoslovie:** Generuje názvy súborov podľa štandardov pre správnu prioritu načítania.

### 3. Integrácia Nástrojov
*   Podpora pre **Retoc** (odporúčaný pre stabilitu).
*   Podpora pre **Castoc** (moderný/experimentálny nástroj).
*   Možnosť nastaviť vlastné cesty k `.exe` súborom nástrojov.

## 💾 Perzistencia a ukladanie dát
*   **LocalStorage Integrácia:** Všetky nastavenia a profily sú uložené vo vašom prehliadači.
*   **Žiadny cloud:** Vaše dáta nikdy neopúšťajú váš počítač.

## 📦 Inštalácia a Používanie
1. Prejdite do karty **Nastavenia** a zadajte cesty k `retoc.exe` alebo `castoc.exe`.
2. V karte **Profily Hier** pridajte hru a nastavte cesty k jej súborom.
3. V karte **Operácie** vygenerujte potrebný príkaz.
4. Skopírujte príkaz a vložte ho do PowerShellu (ako Správca).

---
*Vyvinuté pre UE5 Modding Komunitu.*
