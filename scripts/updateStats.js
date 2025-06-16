const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/stats.json");

fetch("https://www.ifixit.com/api/2.0/users/4502323")
  .then(res => res.json())
  .then(data => {
    const stats = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const today = new Date().toISOString().split("T")[0];

    stats.push({
      date: today,
      reputation: data.reputation,
      badges: {
        bronze: data.badge_counts.bronze,
        silver: data.badge_counts.silver,
        gold: data.badge_counts.gold
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(stats, null, 2));
    console.log("Stats erfolgreich aktualisiert.");
  })
  .catch(err => {
    console.error("Fehler beim Abrufen:", err);
    process.exit(1);
  });
