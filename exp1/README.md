# Six Thinking Hats prototype

A full-screen interactive cheat sheet for Edward de Bono's Six Thinking Hats framework, built with vanilla JavaScript and Tailwind CSS.

## Run locally

```bash
npm start
```

Then open <http://localhost:8000>. Select any hat to see its description, prompts, and suggested use.

For phone testing, bind the server to your network interface:

```bash
npm run build
npm run serve
```

Open `http://YOUR_COMPUTER_IP:8000` on a phone connected to the same Wi-Fi.

## Development

Run `npm run dev` to rebuild the Tailwind output whenever source files change. In another terminal, run `npm run serve` to host the app.
