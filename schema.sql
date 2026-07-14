CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    topic TEXT NOT NULL,
    difficulty TEXT CHECK(difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
    platform TEXT,
    time_minutes INTEGER,
    solved_at TEXT DEFAULT (datetime('now'))
);
