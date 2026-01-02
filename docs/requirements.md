# 📋 Systeemeisen (Requirements) - Data-Driven Team Selection

Dit document beschrijft de functionele en technische vereisten voor het platform om een objectieve teamindeling te realiseren.

## 1. Functionele Eisen

### 1.1 Gebruikersbeheer & Rollen
* **Coach:** Kan uitsluitend data invoeren voor spelers binnen het eigen toegewezen team. Heeft geen inzicht in de wegingen of de advies-indeling van andere teams.
* **Technisch Coördinator (TC):** Heeft volledige leesrechten over alle teams. Kan data 'vlaggen' (markeren) en handmatig overschrijven bij bewezen onjuistheid.
* **Systeem:** Genereert automatisch een teamadvies op basis van het scoring-algoritme.

### 1.2 Data-invoer (Ingestion)
* Het systeem moet invoer accepteren voor:
    * **Presentie:** Percentage bijgewoonde trainingen (0-100%).
    * **Speeltijd:** Totaal aantal minuten gespeeld in competitieverband.
    * **Geboortejaar:** Harde factor voor de initiële indeling in leeftijdscategorieën.
    * **Subjectieve Score:** Beperkt tot een 1-5 schaal op maximaal 4 technische/tactische aspecten.

### 1.3 Scoring & Analyse
* **Wegingsmodel:** Het systeem móet een gewogen gemiddelde berekenen waarbij objectieve data (minuten/presentie) minimaal 65% van de eindscore bepaalt.
* **Trendanalyse:** Het systeem moet verbetering gedurende het seizoen kunnen herkennen als een positieve factor (ontwikkeling).

---

## 2. Anti-Misbruik Eisen (Data Integrity)

### 2.1 Validatie-regels
* Het systeem moet invoer blokkeren of vlaggen indien:
    * De som van de speeltijd van alle spelers in een team onrealistisch hoog is t.o.v. het aantal gespeelde wedstrijden.
    * Een speler een maximale subjectieve score krijgt (5/5) terwijl de presentie lager is dan 50%.
* Het systeem moet 'outliers' (extreme uitschieters) markeren die meer dan 30% afwijken van de teammediaan.

---

## 3. Technische Eisen

### 3.1 Architectuur
* **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+).
* **Dataopslag:** JSON-gebaseerde database (GitHub Repository als backend).
* **Beveiliging:** Authenticatie via GitHub Personal Access Tokens (PAT).

### 3.2 PDF & Rapportage
* Het systeem moet een exportfunctie hebben die een A4-rapport genereert.
* Het rapport moet zowel de visuele radar-chart als de ruwe onderbouwende data bevatten.

---

## 4. Gebruikersinterface (UI/UX)
* **Dashboards:** Moeten 'read-only' zijn voor coaches om beïnvloeding van berekeningen te voorkomen.
* **Toegankelijkheid:** De Coach Command terminal moet geoptimaliseerd zijn voor gebruik op mobiele apparaten (langs de lijn/in de kleedkamer).

---

## 5. Roadmap & Compliance
* **Fase 1:** Basis invoer en JSON-sync (GEREALISEERD).
* **Fase 2:** Validatie-engine en Red-Flag systeem (GEREALISEERD).
* **Fase 3:** Geautomatiseerde team-suggestie logica (GEREALISEERD).
* **Fase 4:** GDPR-compliance (AVG) - Anonimiseren van data voor extern gebruik.
