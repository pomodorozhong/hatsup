# Six Thinking Hats prototype

A full-screen interactive cheat sheet for Edward de Bono's Six Thinking Hats framework, built with vanilla JavaScript and Tailwind CSS.

## Run locally

```bash
npm run build
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Select any hat to see its description, prompts, and suggested use.

For phone testing, bind the server to your network interface:

```bash
npm run build
python3 -m http.server 8000 --bind 0.0.0.0
```

Open `http://YOUR_COMPUTER_IP:8000` on a phone connected to the same Wi-Fi.

## Development

Run `npm run dev` to rebuild the Tailwind output whenever source files change. The server still needs to be started separately.
