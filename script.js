const centers = ["BBSS", "BBCT", "ABMSS", "ABMCT"];
const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// People with cumulative counts (start empty or fill with previous week)
let people = [
  { name: "@myrulz4107", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@gulahangus", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@alexzandra_1", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@apinmaa", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@pressielicious", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@damzhensem", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@krrot.", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@farizhaziqq", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@zzfumi99", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  { name: "@dyoduolist", counts: { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 }, history: [] },
  // add remaining people...
];

// Assign one center per day per person (balanced)
function assignBalancedWeek() {
  weekDays.forEach(day => {
    let centerLoad = { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 };

    // Count previous assignments to calculate load
    people.forEach(p => {
      Object.keys(p.counts).forEach(c => {
        centerLoad[c] += p.counts[c];
      });
    });

    // Assign centers
    people.forEach(p => {
      // Choose the center they've done least (min count)
      let minCount = Math.min(...centers.map(c => p.counts[c]));
      let leastCenters = centers.filter(c => p.counts[c] === minCount);

      // Among leastCenters, pick the one with lowest global load
      let newCenter = leastCenters.sort((a,b) => centerLoad[a]-centerLoad[b])[0];

      // Update counts and history
      p.counts[newCenter]++;
      p.history.push(newCenter);
      centerLoad[newCenter]++;
    });
  });
}

// Render tables per day
function renderWeekTables() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  weekDays.forEach((day, idx) => {
    const h2 = document.createElement("h2");
    h2.textContent = day;
    output.appendChild(h2);

    const table = document.createElement("table");
    const header = document.createElement("tr");
    header.innerHTML = "<th>No</th><th>Name</th><th>Center</th>";
    table.appendChild(header);

    people.forEach((p, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${i+1}</td><td>${p.name}</td><td>${p.history[idx]}</td>`;
      table.appendChild(row);
    });

    output.appendChild(table);

    // Tally per center
    const tally = { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 };
    people.forEach(p => tally[p.history[idx]]++);
    const tallyDiv = document.createElement("div");
    tallyDiv.innerHTML = `<strong>Center Tally:</strong> BBSS: ${tally.BBSS}, BBCT: ${tally.BBCT}, ABMSS: ${tally.ABMSS}, ABMCT: ${tally.ABMCT}`;
    output.appendChild(tallyDiv);
  });
}

// Generate button click
document.getElementById("generate").addEventListener("click", () => {
  assignBalancedWeek();
  renderWeekTables();
});
