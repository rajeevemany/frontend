import { NextResponse } from "next/server";

export async function GET() {
  const recruits = [
    {
      id: 1,
      name: "Alex Chen",
      classYear: 2026,
      priority: "High",
      notes: "Top 20 nationally, strong baseline game",
      lastContacted: "2026-02-10",
    },
    {
      id: 2,
      name: "Mateo Alvarez",
      classYear: 2025,
      priority: "Medium",
      notes: "Excellent doubles instincts, needs serve development",
      lastContacted: "2026-01-25",
    },
    {
      id: 3,
      name: "Ryan O'Neill",
      classYear: 2026,
      priority: "Watch",
      notes: "Big upside, inconsistent results",
      lastContacted: "2025-12-15",
    },
  ];

  return NextResponse.json(recruits);
}
