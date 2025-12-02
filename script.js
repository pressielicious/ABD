const centers = ["BBSS", "BBCT", "ABMSS", "ABMCT"];

// People list from your data
let people = [
  { name: "@myrulz4107", centers: ["BBSS", "ABMCT"] },
  { name: "@gulahangus", centers: ["BBCT"] },
  { name: "@alexzandra_1", centers: ["BBCT", "ABMSS"] },
  { name: "@apinmaa", centers: ["ABMSS", "BBCT"] },
  { name: "@pressielicious", centers: ["BBCT", "ABMSS"] },
  { name: "@damzhensem", centers: ["BBCT", "ABMSS"] },
  { name: "@krrot.", centers: ["BBSS", "ABMCT"] },
  { name: "@farizhaziqq", centers: ["BBSS", "ABMCT"] },
  { name: "@zzfumi99", centers: ["BBCT", "ABMSS"] },
  { name: "@dyoduolist", centers: ["BBCT", "BBSS"] },
  { name: "@el123__", centers: ["BBCT", "BBSS"] },
  { name: "@luqvanderlinde", centers: ["ABMSS", "BBSS"] },
  { name: "@fasyaleleh", centers: ["ABMSS", "BBCT"] },
  { name: "@jomalik.11", centers: ["ABMCT", "ABMSS"] },
  { name: "@vfxjja", centers: ["ABMSS", "BBCT"] },
  { name: "@fatcat39", centers: ["ABMSS", "BBSS"] },
  { name: "@weywen.", centers: ["BBCT", "BBSS"] },
  { name: "@ihikome", centers: ["BBCT", "ABMSS"] },
  { name: "@ezzy1816", centers: ["BBSS", "ABMCT"] },
  { name: "@iska0832", centers: ["ABMCT", "BBSS"] },
  { name: "@502035375338815489", centers: ["BBSS"] },
  { name: "@unknownpeople2205", centers: ["ABMCT", "BBCT"] },
  { name: "@heroro90", centers: ["BBSS", "ABMCT"] },
  { name: "@makmin1612", centers: ["BBSS", "ABMSS"] },
  { name: "@maellambong07", centers: ["BBCT", "ABMSS"] },
  { name: "@aydin3991", centers: ["BBCT", "ABMCT"] },
  { name: "@syamm_.", centers: ["BBSS", "ABMCT"] },
  { name: "@emieazehan", centers: ["ABMSS", "ABMCT"] },
  { name: "@frhnhkim", centers: ["BBSS", "ABMCT"] },
  { name: "@mellahmad", centers: ["ABMSS", "BBCT"] },
  { name: "@xyuunv", centers: ["ABMCT", "BBSS"] },
  { name: "@synn2k", centers: ["ABMCT", "ABMSS"] },
  { name: "@p0jie.", centers: [] },
  { name: "@ashhz7", centers: ["ABMCT", "BBSS"] },
  { name: "@par0yy", centers: ["BBSS", "ABMCT"] },
  { name: "@samud.muda.mudi", centers: ["ABMSS", "BBCT"] },
  { name: "@taimanobi", centers: ["ABMCT", "ABMSS"] },
  { name: "@calvyn2", centers: ["ABMCT", "BBCT"] },
  { name: "@.skrtskrt", centers: ["ABMSS", "BBCT"] },
  { name: "@zafrannn__", centers: ["ABMSS", "BBCT"] },
];

const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function assignWeekly() {
  const weekHistory = {};

  weekDays.forEach(day => {
    let centerLoad = { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 };

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

    weekHistory[day] = dayAssignments;
  });

  return weekHistory;
}

function renderWeekTable(history) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  weekDays.forEach(day => {
    const h2 = document.createElement("h2");
    h2.textContent = day;
    output.appendChild(h2);

    const table = document.createElement("table");
    const header = document.createElement("tr");
    header.innerHTML = "<th>No</th><th>Name</th><th>Centers</th>";
    table.appendChild(header);

    history[day].forEach((person, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${i+1}</td><td>${person.name}</td><td>${person.centers.join(", ")}</td>`;
      table.appendChild(row);
    });

    output.appendChild(table);

    const tally = { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 };
    history[day].forEach(p => p.centers.forEach(c => tally[c]++));
    const tallyDiv = document.createElement("div");
    tallyDiv.innerHTML = `<strong>Center Tally:</strong> BBSS: ${tally.BBSS}, BBCT: ${tally.BBCT}, ABMSS: ${tally.ABMSS}, ABMCT: ${tally.ABMCT}`;
    output.appendChild(tallyDiv);
  });
}

document.getElementById("generate").addEventListener("click", () => {
  const weekHistory = assignWeekly();
  renderWeekTable(weekHistory);
});
