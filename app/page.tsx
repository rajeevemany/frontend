type Recruit = {
  id: number;
  name: string;
  classYear: number;
  priority: string;
  notes: string;
  lastContacted: string;
};

async function getRecruits(): Promise<Recruit[]> {
  const res = await fetch("http://localhost:3000/api/recruits", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recruits");
  }

  return res.json();
}

function daysSince(dateString: string): number {
  const last = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - last.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default async function Home() {
  const recruits = await getRecruits();

  const priorityOrder: Record<string, number> = {
    High: 1,
    Medium: 2,
    Watch: 3,
  };

  const sortedRecruits = recruits.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>AI Recruiting Tool – Columbia Men’s Tennis</h1>
      <section style={{ marginTop: "24px", marginBottom: "32px" }}>
  <h2>Recent Recruiting Activity</h2>

  <ul>
    {sortedRecruits.slice(0, 3).map((recruit) => (
      <li key={recruit.id}>
        Contacted {recruit.name} ({daysSince(recruit.lastContacted)} days ago)
      </li>
    ))}
  </ul>
</section>

      <section style={{ marginTop: "32px" }}>
        <h2>Top Priority Recruits</h2>

        {sortedRecruits.map((recruit) => (
          <div
            key={recruit.id}
            style={{
  border: "1px solid #ddd",
  borderLeft: `6px solid ${
    recruit.priority === "High"
      ? "#c1121f"
      : recruit.priority === "Medium"
      ? "#f77f00"
      : "#999"
  }`,
  borderRadius: "8px",
  padding: "16px",
  marginTop: "12px",
  backgroundColor: "#fafafa",
}}
          >
            <h3>{recruit.name}</h3>
            <p>
              <strong>Class:</strong> {recruit.classYear}
            </p>
            <p>
              <strong>Priority:</strong> {recruit.priority}
            </p>
            <p>
  <strong>Last Contacted:</strong>{" "}
  {daysSince(recruit.lastContacted)} days ago
</p>

{daysSince(recruit.lastContacted) > 21 && (
  <p style={{ color: "#c1121f", fontWeight: "bold" }}>
    ⚠ Needs attention — no recent contact
  </p>
)}
            <p>{recruit.notes}</p>
            <p style={{ fontStyle: "italic", color: "#555", marginTop: "8px" }}>
  Coach Notes: (editable soon)
</p>
          </div>
        ))}
      </section>
    </main>
  );
}
