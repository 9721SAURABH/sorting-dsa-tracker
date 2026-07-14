# 📊 Sorting Visualizer & DSA Tracker

Two small tools in one repo:
1. An **interactive browser-based visualizer** for Merge, Quick, and Bubble Sort
2. A **CLI-based DSA practice tracker** backed by SQL for logging daily coding practice

## 📂 Project Structure
```
sorting-dsa-tracker/
├── visualizer/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── tracker/
│   ├── tracker.py       # CLI tool
│   ├── db.py            # SQLite setup + queries
│   └── schema.sql       # Table schema
└── README.md
```

## 1️⃣ Sorting Visualizer

An interactive visualizer that shows how **Bubble Sort**, **Merge Sort**, and
**Quick Sort** operate step by step on a randomly generated array, with
adjustable array size and animation speed.

### Run it
Just open `visualizer/index.html` in any browser — no build step needed.

### Features
- Live bar-chart animation of the array as it sorts
- Choose algorithm (Bubble / Merge / Quick)
- Adjustable array size and speed slider
- Comparison counter and time-elapsed counter to visualize complexity tradeoffs

## 2️⃣ DSA Practice Tracker (CLI + SQL)

A simple command-line tool to log problems you solve daily (topic, difficulty,
platform, time taken) into a local SQLite database, so you can track your
consistency over time.

### Setup
```bash
cd tracker
python db.py       # creates dsa_tracker.db with schema
```

### Usage
```bash
# Log a solved problem
python tracker.py add --title "Two Sum" --topic "Arrays" --difficulty "Easy" --platform "LeetCode" --time_minutes 15

# View your log
python tracker.py list

# View a summary of practice by topic
python tracker.py summary
```

### Example output
```
$ python tracker.py summary

Topic         Solved   Avg Time (min)
Arrays        12       18.3
DP            5        41.2
Graphs        3        35.0
```

## 🔧 Tech Stack
JavaScript (Canvas API) · Java (algorithm reference implementations) · Python · SQLite

## 📌 Future Improvements
- Add Heap Sort and Insertion Sort to the visualizer
- Add streak tracking and a GitHub-style contribution heatmap to the tracker
- Deploy visualizer to GitHub Pages

## 📝 License
MIT
