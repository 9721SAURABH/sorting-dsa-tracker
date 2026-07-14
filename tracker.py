"""
tracker.py
CLI for logging and reviewing DSA practice.

Usage:
    python tracker.py add --title "Two Sum" --topic "Arrays" --difficulty "Easy" \
        --platform "LeetCode" --time_minutes 15
    python tracker.py list
    python tracker.py summary
"""

import argparse
from db import add_problem, list_problems, get_summary, init_db
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "dsa_tracker.db")


def cmd_add(args):
    add_problem(args.title, args.topic, args.difficulty, args.platform, args.time_minutes)
    print(f"Logged: {args.title} ({args.topic}, {args.difficulty})")


def cmd_list(args):
    rows = list_problems()
    if not rows:
        print("No problems logged yet.")
        return
    print(f"{'ID':<4}{'Title':<25}{'Topic':<15}{'Difficulty':<10}{'Platform':<12}{'Time(min)':<10}{'Solved At'}")
    for row in rows:
        print(f"{row[0]:<4}{row[1]:<25}{row[2]:<15}{row[3]:<10}{row[4] or '-':<12}{row[5] or '-':<10}{row[6]}")


def cmd_summary(args):
    rows = get_summary()
    if not rows:
        print("No data yet.")
        return
    print(f"{'Topic':<15}{'Solved':<10}{'Avg Time (min)'}")
    for topic, solved, avg_time in rows:
        avg_display = f"{avg_time:.1f}" if avg_time else "-"
        print(f"{topic:<15}{solved:<10}{avg_display}")


def main():
    if not os.path.exists(DB_FILE):
        init_db()

    parser = argparse.ArgumentParser(description="DSA Practice Tracker")
    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add", help="Log a solved problem")
    add_parser.add_argument("--title", required=True)
    add_parser.add_argument("--topic", required=True)
    add_parser.add_argument("--difficulty", required=True, choices=["Easy", "Medium", "Hard"])
    add_parser.add_argument("--platform", default=None)
    add_parser.add_argument("--time_minutes", type=int, default=None)
    add_parser.set_defaults(func=cmd_add)

    list_parser = subparsers.add_parser("list", help="List all logged problems")
    list_parser.set_defaults(func=cmd_list)

    summary_parser = subparsers.add_parser("summary", help="Show summary by topic")
    summary_parser.set_defaults(func=cmd_summary)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
