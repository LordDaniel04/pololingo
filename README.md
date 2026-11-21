# Pololingo

Persönliche Polnisch-App, ausgelegt auf schnelles Sprechen statt auf Punkte.

## Am Handy
Online unter https://lorddaniel04.github.io/pololingo/ . In Chrome öffnen → Menü ⋮ → „App installieren“ / „Zum Startbildschirm hinzufügen“.

## Am PC starten
Doppelklick auf **start.bat** (oder die Verknüpfung „Pololingo“ auf dem Desktop).
Das startet einen kleinen Server (minimiertes Fenster) und öffnet die App in **Microsoft Edge** unter http://localhost:5180.
Edge ist wichtig: Es bringt gute polnische Stimmen (Zofia, Marek) und die Spracherkennung mit.
Tipp: In Edge über „…“ → „Apps“ → „Diese Seite als App installieren“ bekommst du ein eigenes Fenster.

## Methode
| Baustein | Warum |
|---|---|
| Sätze statt Einzelwörter, nach Nutzen sortiert | Häufige Wörter in echtem Kontext, sofort benutzbar |
| FSRS-Wiederholung | Jede Karte kommt genau dann, wenn du sie fast vergessen hättest |
| Sprechen-Karten (Deutsch → Polnisch laut) | Aktiver Abruf, das Training fürs echte Gespräch |
| Hören-Karten (Polnisch → Bedeutung) | Hörverstehen |
| Spracherkennung 🎙 | Direkte Rückmeldung, welche Wörter gesessen haben |
| Shadowing mit Aufnahme | Aussprache, Rhythmus, Tempo |
| Geschichten | Verständlicher Input knapp über deinem Niveau |
| Meine Sätze | Sentence Mining aus Serien, Podcasts, Chats |

Täglich: „Lernen“ abarbeiten (15–20 Min.), danach eine Geschichte oder Shadowing.

## Daten
Alles liegt im Browser (localStorage von Edge). Unter ⚙ → „Sicherung speichern“ ab und zu exportieren.

## Eigene Inhalte
Sätze und Geschichten stehen in `data.js`. Neue Sätze nur **hinten** an eine Lektion anhängen, sonst verrutschen die Karten.
