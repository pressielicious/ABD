const centers = ["BBSS", "BBCT", "ABMSS", "ABMCT"];

// People list (replace empty arrays with previous assignments if any)
let people = [
  { name: "@myrulz4107", centers: [] },
  { name: "@gulahangus", centers: [] },
  { name: "@alexzandra_1", centers: [] },
  { name: "@apinmaa", centers: [] },
  { name: "@pressielicious", centers: [] },
  { name: "@damzhensem", centers: [] },
  { name: "@krrot.", centers: [] },
  { name: "@farizhaziqq", centers: [] },
  { name: "@zzfumi99", centers: [] },
  { name: "@dyoduolist", centers: [] },
  { name: "@el123__", centers: [] },
  { name: "@luqvanderlinde", centers: [] },
  { name: "@fasyaleleh", centers: [] },
  { name: "@jomalik.11", centers: [] },
  { name: "@vfxjja", centers: [] },
  { name: "@fatcat39", centers: [] },
  { name: "@weywen.", centers: [] },
  { name: "@ihikome", centers: [] },
  { name: "@ezzy1816", centers: [] },
  { name: "@iska0832", centers: [] },
  { name: "@502035375338815489", centers: [] },
  { name: "@unknownpeople2205", centers: [] },
  { name: "@heroro90", centers: [] },
  { name: "@makmin1612", centers: [] },
  { name: "@maellambong07", centers: [] },
  { name: "@aydin3991", centers: [] },
  { name: "@syamm_.", centers: [] },
  { name: "@emieazehan", centers: [] },
  { name: "@frhnhkim", centers: [] },
  { name: "@mellahmad", centers: [] },
  { name: "@xyuunv", centers: [] },
  { name: "@synn2k", centers: [] },
  { name: "@p0jie.", centers: [] },
  { name: "@ashhz7", centers: [] },
  { name: "@par0yy", centers: [] },
  { name: "@samud.muda.mudi", centers: [] },
  { name: "@taimanobi", centers: [] },
  { name: "@calvyn2", centers: [] },
  { name: "@.skrtskrt", centers: [] },
  { name: "@zafrannn__", centers: [] },
];

const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// Assign one new center per person per day, carrying forward previous assignments
function assignNextDay() {
  let centerLoad = { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 };

  // Count existing assignments to calculate load
  people.forEach(p => p.centers.forEach(c => centerLoad[c]++));

  let dayAssignments = people.map(person => {
    let available = centers.filter(c => !person.centers.includes(c));
    let newCenter = available.length > 0
      ? available.sort((a,b) => centerLoad[a]-centerLoad[b])[0]
      : null;

    if(newCenter) {
      person.centers.push(newCenter);
      centerLoad[newCenter]++;
    }

    return { name: person.name, centers: [...person.centers] };
  });

  return dayAssignments;
}

// Render single day table
function renderDayTable(dayName, dayAssignments) {
  const output = document.getElementById("output");

  const h2 = document.createElement("h2");
  h2.textContent = dayName;
  output.appendChild(h2);

  const table = document.createElement("table");
  const header = document.createElement("tr");
  header.innerHTML = "<th>No</th><th>Name</th><th>Centers</th>";
  table.appendChild(header);

  dayAssignments.forEach((person, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i+1}</td><td>${person.name}</td><td>${person.centers.join(", ")}</td>`;
    table.appendChild(row);
  });

  output.appendChild(table);

  const tally = { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 };
  dayAssignments.forEach(p => p.centers.forEach(c => tally[c]++));
  const tallyDiv = document.createElement("div");
  tallyDiv.innerHTML = `<strong>Center Tally:</strong> BBSS: ${tally.BBSS}, BBCT: ${tally.BBCT}, ABMSS: ${tally.ABMSS}, ABMCT: ${tally.ABMCT}`;
  output.appendChild(tallyDiv);
}

// Click event for Generate button
let dayIndex = 0;
document.getElementById("generate").addEventListener("click", () => {
  if(dayIndex >= weekDays.length) {
    alert("All 7 days have been generated!");
    return;
  }

  const dayAssignments = assignNextDay();
  renderDayTable(weekDays[dayIndex], dayAssignments);
  dayIndex++;
});
