# Deploy Medline.md pe Hetzner Cloud (Docker + Caddy)

Ghid complet pentru a pune site-ul live pe un VPS Hetzner, cu HTTPS automat.

## 0. Ce cumperi pe hetzner.com
- **Hetzner Cloud → Shared vCPU → CAX11** (ARM, 2 vCPU, 4 GB RAM, 40 GB) — ~€3.79/lună
- **Locație**: Nuremberg / Falkenstein (Germania) sau Helsinki (Finlanda)
- **Imagine OS**: **Ubuntu 24.04**
- Adaugă **cheia ta SSH** la creare (Security → SSH Keys) — recomandat în loc de parolă

> CAX11 e mai mult decât suficient. Site-ul ar merge și pe ceva mai mic.

---

## 1. Conectează-te la server
```bash
ssh root@IP_SERVER
```

## 2. Firewall (deschide doar ce trebuie)
```bash
apt update && apt upgrade -y
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable
```

## 3. Instalează Docker + Compose
```bash
curl -fsSL https://get.docker.com | sh
docker --version && docker compose version
```

## 4. Adu codul pe server
Repo-ul e **privat**, deci ai 2 opțiuni:

**A) Cu GitHub CLI (simplu):**
```bash
apt install -y gh git
gh auth login        # urmează pașii (alege HTTPS + autentificare în browser/token)
gh repo clone dooggee462/medline-md
cd medline-md
```

**B) Cu token (fără gh):** creează un Personal Access Token pe GitHub (Settings → Developer settings → Tokens, scope `repo`), apoi:
```bash
apt install -y git
git clone https://TOKEN@github.com/dooggee462/medline-md.git
cd medline-md
```

## 5. Setează domeniul
1. La furnizorul domeniului **medline.md**, creează un record **A**:
   - `medline.md` → IP_SERVER
   - `www.medline.md` → IP_SERVER
2. Editează `Caddyfile` și pune domeniul + emailul tău:
```bash
nano Caddyfile
```

> 💡 Vrei să testezi întâi fără domeniu? În `Caddyfile` comentează blocul cu domeniul și
> decomentează blocul `:80 { ... }`, apoi accesează `http://IP_SERVER`.

## 6. Pornește totul
```bash
docker compose up -d --build
```
- Prima dată durează 1-2 minute (build).
- Caddy obține **automat certificatul HTTPS** de la Let's Encrypt (dacă DNS-ul e setat).
- Gata: **https://medline.md** e live. 🎉

Verifică:
```bash
docker compose ps        # ambele containere "running"
docker compose logs -f   # urmărește log-urile (Ctrl+C ca să ieși)
```

---

## Actualizări viitoare (după ce schimbăm ceva)
```bash
cd medline-md
git pull
docker compose up -d --build
```

## Comenzi utile
```bash
docker compose down          # oprește site-ul
docker compose restart       # repornește
docker compose logs web      # log-uri doar pentru aplicație
docker system prune -f       # curăță imagini vechi (eliberează spațiu)
```

## Recomandări
- **Backup**: activează snapshot-uri în panoul Hetzner (mic cost, salvează tot serverul).
- **Analytics**: pune ID-urile în `lib/site.ts` → `analytics` înainte de build (sau pe server, apoi `docker compose up -d --build`).
- **Securitate**: ține serverul actualizat (`apt update && apt upgrade`), folosește doar SSH cu cheie.
