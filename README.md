# 🏟️ Elite Scout v2: Data-Driven Team Selection Platform

![Versie](https://img.shields.io/badge/versie-2.0.0-gold)
![Status](https://img.shields.io/badge/status-production--ready-green)
![License](https://img.shields.io/badge/license-MIT-blue)

**Elite Scout v2** is een geavanceerd analytics-platform ontworpen om objectieve, transparante en fraudebestendige teamindelingen te realiseren. Door subjectieve coach-beoordelingen te combineren met harde data (aanwezigheid en wedstrijdminuten), elimineert dit systeem "vriendjespolitiek" en onderbouwt het beslissingen met feiten.

---

## 🎯 Kernprincipes
* **Objectiviteit eerst:** Harde data (minuten/presentie) weegt zwaarder dan meningen.
* **Anti-Abuse:** Ingebouwde detectie van onlogische scores en data-manipulatie.
* **Transparantie:** Volledige onderbouwing via PDF-rapportages voor spelers en ouders.
* **Team Allocation:** Geautomatiseerd adviesmodel voor de ideale teamfit.

---

## ⚖️ Het Scoring-Model (65/20/15)
Het platform hanteert een strikt wegingsmodel om de integriteit van de resultaten te waarborgen:

| Component | Gewicht | Bron |
| :--- | :--- | :--- |
| **Objectieve Prestaties** | **65%** | Trainingspresentie & Wedstrijdminuten |
| **Ontwikkeling** | **20%** | Trendanalyse & Omschakelingsdata |
| **Coachbeoordeling** | **15%** | Subjectieve 1-5 schaal (beperkt) |



---

## 🛡️ Anti-Misbruik & Validatie
Het systeem bevat een **Red-Flag Engine** die onregelmatigheden markeert voor de Technisch Coördinator:
* 🚩 **Speeltijd-Bias:** Markering bij hoge scores voor spelers met zeer weinig speelminuten.
* 🚩 **Inconsistentie:** Detectie van extreme uitschieters t.o.v. het teamgemiddelde.
* 🚩 **Data-Gaps:** Waarschuwing bij onvoldoende trainingsdata voor een valide berekening.

---

## 🚀 Installatie & Gebruik

### 1. Repository Inrichten
1. Clone deze repository naar je eigen GitHub account.
2. Zorg dat de map `data/` het bestand `players.json` bevat met een lege array `[]`.
3. Activeer **GitHub Pages** via de instellingen van je repo om het dashboard live te zetten.

### 2. Data Invoeren (Coaches)
Open `coach.html` op je mobiel of tablet.
1. Voer de naam en het geboortejaar van de speler in.
2. Vul de harde cijfers in (minuten en aanwezigheid).
3. Geef de subjectieve ratings (1-5).
4. Gebruik je **GitHub Access Token** om de data naar de cloud te synchroniseren.

### 3. Analyse & Indeling (TC)
Open `index.html` (het Dashboard).
1. Bekijk de **Elite Score** en de gegenereerde **Flags**.
2. Volg het **Team-Allocation Advies** (Selectie A/B of Recreatie).
3. Exporteer de resultaten naar PDF voor officiële dossieropbouw.

---

## 📁 Project Structuur
```text
/
├── index.html          # Intelligence Dashboard & PDF Generator
├── coach.html          # Data Ingestion Terminal (Coach Login)
├── js/
│   └── data_provider.js # Real-time Cloud Sync Logic
├── data/
│   └── players.json    # De gecentraliseerde database
└── docs/
    ├── requirements.md # Technische blauwdruk
    └── anti-abuse-policy.md # Integriteitsregels
