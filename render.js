const { ipcRenderer } = require('electron');

console.log("render.js loaded");

document.getElementById("buttonAddUser").addEventListener('click', () => {
    document.getElementById("addUserForm").style.display = "block";
    document.getElementById("buttonAddUser").style.display = "none";
});

document.getElementById("addUserButton").addEventListener("click", () => {
   const name = document.getElementById('userName').value;

   if (name) {
       ipcRenderer.send("add-user", { name });

       document.getElementById("userName").value = '';

       document.getElementById('addUserForm').style.display = 'none';
       document.getElementById('buttonAddUser').style.display = 'block';
   };
});

ipcRenderer.on("update-users", (event, users) => {
    const tableBody = document.getElementById("usersList");
    tableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.name}</td>`;
        tableBody.appendChild(row);
    });
});
