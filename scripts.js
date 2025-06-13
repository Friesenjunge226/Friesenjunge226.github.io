const userid = 4502323;

fetch(`https://ifixit-guide-api.ifixit.com/api/v2/users/${userid}`)
  .then(response => {
    if (!response.ok) throw new Error("Netzwerkantwort war nicht okay");
    return response.json();
  })
  .then(data => {
    const statsDiv = document.getElementById("stats");
    statsDiv.innerHTML = `
      <p><strong>Benutzername:</strong> ${data.username}</p>
      <p><strong>Reputation:</strong> ${data.reputation}</p>
      <p><strong>Mitglied seit:</strong> ${new Date(data.join_date * 1000).toLocaleDateString('de-DE')}</p>
      <p><strong>Gold-Badges:</strong> ${data.badge_counts.gold}</p>
      <p><strong>Silber-Badges:</strong> ${data.badge_counts.silver}</p>
      <p><strong>Bronze-Badges:</strong> ${data.badge_counts.bronze}</p>
      <p><strong>Zusammenfassung:</strong> ${data.summary}</p>
    `;
  })
  .catch(error => {
    document.getElementById("stats").textContent = "Fehler beim Laden der Daten: " + error.message;
  });
