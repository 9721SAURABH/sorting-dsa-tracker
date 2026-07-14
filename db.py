"""
db.py
Sets up the SQLite database and provides helper functions
used by tracker.py.

Run directly to (re)create the database:
    python db.py
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "dsa_tracker.db")
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "schema.sql")


def get_connection():
    return sqlite3.connect(DB_PATH)


def init_db():
    conn = get_connection()
    with open(SCHEMA_PATH, "r") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()
    print(f"Database initialized at {DB_PATH}")


def add_problem(title, topic, difficulty, platform, time_minutes):
    conn = get_connection()
    conn.execute(
        "INSERT INTO problems (title, topic, difficulty, platform, time_minutes) "
        "VALUES (?, ?, ?, ?, ?)",
        (title, topic, difficulty, platform, time_minutes),
    )
    conn.commit()
    conn.close()


def list_problems():
    conn = get_connection()
    cursor = conn.execute(
        "SELECT id, title, topic, difficulty, platform, time_minutes, solved_at "
        "FROM problems ORDER BY solved_at DESC"
    )
    rows = cursor.fetchall()
    conn.close()
    return rows


def get_summary():
    conn = get_connection()
    cursor = conn.execute(
        "SELECT topic, COUNT(*) as solved, AVG(time_minutes) as avg_time "
        "FROM problems GROUP BY topic ORDER BY solved DESC"
    )
    rows = cursor.fetchall()
    conn.close()
    return rows


if __name__ == "__main__":
    init_db()
