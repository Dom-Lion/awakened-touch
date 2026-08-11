# Awakened Touch — Ubud, Bali

Website für Awakened Touch, eine Praxis für sakrale Körperarbeit (Tantramassage) in Ubud, Bali.

- **Live-Version:** `/index.html` (helles Wellness-Design, DE/EN umschaltbar)
- **Alternative Version:** `/v1/index.html` (frühere, dunklere Designvariante)

## Struktur

- `index.html`, `ueber-mich.html`, `angebot.html`, `kontakt.html` — Hauptseiten
- `css/`, `js/`, `images/` — Assets der Hauptversion
- `v1/` — komplette alternative Designversion (eigenständig, eigene Assets)

## Kontaktformular aktivieren

Das Formular auf der Kontaktseite nutzt [Web3Forms](https://web3forms.com). Um es zu aktivieren:

1. Auf web3forms.com mit `info@awakened-touch.com` einen kostenlosen Access Key erstellen.
2. In `kontakt.html` (und `v1/kontakt.html`) den Platzhalter `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` durch den Key ersetzen.

Bis dahin funktioniert der `mailto:`-Link als direkter Kontaktweg.
