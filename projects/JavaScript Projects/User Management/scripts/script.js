// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    let users = JSON.parse(localStorage.getItem('users')) || []; // Load users from local storage or initialize as empty array

    // Function to update local storage
    function saveUsersToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Registration form submission
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        users.push({ firstName, lastName, email, password, status: 'sign out' });
        saveUsersToLocalStorage();
        alert('Registration successful!');
        document.getElementById('registrationForm').reset();
        updateUserTable();
    });

    // Sign-in form submission
    document.getElementById('signInForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            alert('Sign in successful!');
            user.status = 'sign in';
            saveUsersToLocalStorage();
            updateUserTable();
            document.getElementById('signInForm').reset();
        } else {
            alert('Sign in failed. Please check your credentials.');
        }
    });

    function updateUserTable() {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear previous data

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td class="${user.status === 'sign in' ? 'status-signin' : 'status-signout'}">${user.status}</td>
          <td>
            ${user.status === 'sign in' ? `<button class="signout" onclick="signOutUser('${user.email}')">Sign Out</button>` : ''}
            <button class="delete" onclick="deleteUser('${user.email}')">Delete</button>
            <button class="edit" onclick="showEditModal('${user.email}')">Edit</button>
          </td>
        `;
            userList.appendChild(row);
        });
    }

    window.signOutUser = function (email) {
        const user = users.find(u => u.email === email);
        if (user) {
            user.status = 'sign out';
            saveUsersToLocalStorage();
            updateUserTable();
        }
    }

    window.deleteUser = function (email) {
        users = users.filter(u => u.email !== email);
        saveUsersToLocalStorage();
        updateUserTable();
    }

    window.showEditModal = function (email) {
        const user = users.find(u => u.email === email);
        if (user) {
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPassword').value = user.password;
            document.getElementById('originalEmail').value = user.email;

            const modal = document.getElementById('editUserModal');
            modal.style.display = 'block';
        }
    }

    document.getElementById('editUserForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const firstName = document.getElementById('editFirstName').value;
        const lastName = document.getElementById('editLastName').value;
        const email = document.getElementById('editEmail').value;
        const password = document.getElementById('editPassword').value;
        const originalEmail = document.getElementById('originalEmail').value;

        const userIndex = users.findIndex(u => u.email === originalEmail);
        if (userIndex !== -1) {
            // Check if new email is already taken by another user
            if (email !== originalEmail && users.some(u => u.email === email)) {
                alert('Email is already taken by another user.');
                return;
            }

            users[userIndex].firstName = firstName;
            users[userIndex].lastName = lastName;
            users[userIndex].email = email;
            users[userIndex].password = password;
            saveUsersToLocalStorage();
            updateUserTable();

            const modal = document.getElementById('editUserModal');
            modal.style.display = 'none';
        }
    });

    // Close modal when clicking on <span> (x)
    document.querySelector('.close').onclick = function () {
        const modal = document.getElementById('editUserModal');
        modal.style.display = 'none';
    }

    // Close modal when clicking outside of the modal
    window.onclick = function (event) {
        const modal = document.getElementById('editUserModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Initial call to update the user table when the page loads
    updateUserTable();
});
