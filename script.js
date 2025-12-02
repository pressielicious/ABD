const centers = ["BBSS","BBCT","ABMSS","ABMCT"];
let people = [
  "@ADIK TONNI","@Aira Sofia","@alex zandra","@Apin Vixon","@Aslan Noah",
  "@Ayden Justin","@BaKa YaLoL","@Bayizz","@Din Irwan","@DYO X",
  "@EL BRIAN","@EL WasHere","@Fasya Leleh","@jesse merlin","@JJA HUP SENG",
  "@keyZ Jahat","@Knox RUSSO","@Kome Siput","@Kyle Harris","@Leman man",
  "@Leman Troyee","@lilz badz","@M L","@Madmin Khalid","@MaeL SiRoco",
  "@Mat dinn","@MAT MIL","@Mat Soud","@Mujibur OKU","@No One",
  "@Noa Quan","@Omar Kay","@Pojie Je","@Rizkyy Nakata","@Royy Rompong",
  "@SAMUD SENROSE","@Tai Man","@Y asahi","@Zack Macarov","@zai chi"
];

// Track previous assignment to alternate BB/ABM
let lastAssignment = {}; // key: worker, value: "BB" or "ABM"

function assignCenters() {
  let assignments = [];

  // Shuffle workers randomly
  people = people.sort(() => Math.random() - 0.5);

  // Track count per center
  let centerCounts = { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 };

  people.forEach(worker => {
    // Determine BB or ABM for today
    let last = lastAssignment[worker] || "ABM"; // default to BB if last was ABM
    let todayPrefix = last === "BB" ? "ABM" : "BB";
    lastAssignment[worker] = todayPrefix; // update for next day

    // Randomly assign SS or CT
    let type = Math.random() < 0.5 ? "SS" : "CT";
    let center = todayPrefix + type;

    // Ensure even distribution among centers
    let minCount = Math.min(...centers.map(c => centerCounts[c]));
    if(centerCounts[center] > minCount){
      let options = centers.filter(c => c.startsWith(todayPrefix) && centerCounts[c] === minCount);
      center = options[Math.floor(Math.random()*options.length)];
    }

    assignments.push({ name: worker, center });
    centerCounts[center]++;
  });

  return assignments;
}

function renderAssignments() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  const table = document.createElement("table");
  const header = document.createElement("tr");
  header.innerHTML = "<th>No</th><th>Name</th><th>Assigned Center</th>";
  table.appendChild(header);

  const assignments = assignCenters();
  assignments.forEach((a, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i+1}</td><td>${a.name}</td><td>${a.center}</td>`;
    table.appendChild(row);
  });

  output.appendChild(table);

  // Tally per center
  const tally = { BBSS:0, BBCT:0, ABMSS:0, ABMCT:0 };
  assignments.forEach(a => tally[a.center]++);
  const tallyDiv = document.createElement("div");
  tallyDiv.innerHTML = `<strong>Center Tally:</strong> BBSS: ${tally.BBSS}, BBCT: ${tally.BBCT}, ABMSS: ${tally.ABMSS}, ABMCT: ${tally.ABMCT}`;
  output.appendChild(tallyDiv);
}

// Generate button
document.getElementById("generate").addEventListener("click", renderAssignments);
