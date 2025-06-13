fetch("https://www.ifixit.com/api/2.0/users/4502323")
  .then(response => {
    if (!response.ok) {
      throw new Error("Antwort nicht okay");
    }
    return response.json();
  })
  .then(data => {
    const output = `
Benutzername: ${data.username}
Reputation: ${data.reputation}
Badges: ${data.badge_counts.total} total
Bronze: ${data.badge_counts.bronze}
Silber: ${data.badge_counts.silver}
Gold: ${data.badge_counts.gold}
Beigetreten: ${new Date(data.join_date * 1000).toLocaleDateString()}
Teams: ${data.teams.length > 0 ? data.teams.join(", ") : "Keine"}
Profilbild: ${data.image.original}
Link: https://www.ifixit.com/User/${data.username}
    `;
    document.getElementById("ifixit-stats").textContent = output;
  })
  .catch(error => {
    document.getElementById("ifixit-stats").textContent = "Fehler beim Laden der Daten:\n" + error;
  });
