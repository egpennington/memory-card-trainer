# Card Memory Trainer

A professional React app with Tailwind CSS that helps users train their card-memory skills using either the **Mnemonica stack** or a **randomly shuffled deck**. Includes manual and timed practice modes with a clean, minimalist interface.

---

## ✨ Features

### 🃏 Deck Options
- **Mnemonica Stack**  
  Practice with a fixed Mnemonica stack order for serious card workers and memorized deck routines.
- **Random Shuffled Deck**  
  Use a fully shuffled deck for general memory training and recall practice.

### ⏱ Practice Modes
- **Manual Mode**
  - Flip through cards one by one
  - Reveal/hide toggle for the card face
  - Next/previous navigation
- **Timer Mode**
  - Set an interval (e.g., 1–5 seconds per card)
  - Cards auto-deal at the chosen pace
  - Adjustable speed controls to increase difficulty mid-session

### 📊 Progress & Stats
- Progress tracker showing how many cards have been reviewed in the current session
- Simple stats:
  - Total cards reviewed
  - Average speed based on timer settings and session length
- Option to restart a practice session at any time

### 🎨 User Interface & Accessibility
- Clean, minimalist design built with Tailwind CSS
- Responsive layout that works on mobile, tablet, and desktop
- Keyboard support for navigation (e.g., next/previous, start/stop)
- ARIA labels on interactive controls for better screen-reader compatibility

---

## 🛠 Tech Stack
- React (functional components, hooks)
- JavaScript
- HTML5
- Tailwind CSS
- Your preferred React tooling (e.g., Vite)

---

## 📦 Core Components

- **DeckSelector**  
  Handles switching between Mnemonica and Random deck modes.  
  Options:
  - Deck type (Mnemonica / Random)
  - Reset / reshuffle actions

- **CardViewer**  
  Displays the current card (face or back), and handles reveal/hide logic.

- **PracticeControls**  
  Manual navigation and session controls:
  - Next/Previous card
  - Start/Stop
  - Reset session

- **TimerControls**  
  Timer mode configuration:
  - Set interval speed (1–5 seconds or more)
  - Start/Stop auto-deal
  - Adjust speed during a session

- **StatsTracker**  
  Shows:
  - Total cards reviewed
  - Current position in the deck
  - Derived stats like average speed

> You can add additional components (e.g., layout wrappers, header/footer, etc.) as needed.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install
# or
yarn install

# Start the dev server
npm run dev
# or
yarn dev

npm run build
npm run preview
# or
yarn build
yarn preview

Usage Guide
Select a Deck
Use the Deck Selector to choose:

Mnemonica for fixed stack training

Random for a fresh shuffled deck

Choose Practice Mode
Manual Mode

Use Next/Previous buttons or keyboard shortcuts to move through cards

Use the Reveal/Hide button to show or hide the card face

Timer Mode

Set interval (e.g., 2s per card)

Hit Start to begin automated dealing

Adjust speed on the fly to increase difficulty

Track Progress
Watch the Progress Tracker to see how many cards you’ve gone through

Check Stats to review total cards and average pace

Restart Anytime
Use the Reset controls to reshuffle or restart your practice session

♿ Accessibility
This app aims to be accessible and screen-reader friendly:

Keyboard navigation for key actions (next/previous, start/stop, reveal/hide)

ARIA labels on buttons and interactive UI controls

High-contrast, minimalist design to support focus and readability

📌 Project Status & Future Ideas
Possible future extensions:

Per-card performance tracking (which cards you miss most often)

Multiple pre-defined stacks (Aronson, Si Stebbins, etc.)

User-defined custom stacks

Dark mode toggle

PWA support for offline practice

📄 License
This project is licensed under the MIT License (or your preferred license). You can update this section with the actual license text if needed.
