document.addEventListener('DOMContentLoaded', async function() {
    const navbarContainer = document.getElementById('navbar-container');
    const xhr =await new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            navbarContainer.innerHTML = this.responseText;
            setNavbarState();
            setNavBar();
        }
    };
    await xhr.open('GET', 'navbar.html', true);
    xhr.send();
});

const setNavBar =  () => {
    if (!window.location.href.endsWith('index.html' || 'index')) {
        console.log('hey')
        const navItemDropdown = document.querySelector('.nav-item.dropdown.fs-3');
        const searchComponents = document.querySelector('.search-components');
        const searchBar = document.querySelector('.search-bar');

        console.log(navItemDropdown);

        if (navItemDropdown) {
            navItemDropdown.style.display = 'none';
        }

        if (searchComponents) {
            searchComponents.style.display = 'none';
        }

        if (searchBar) {
            searchBar.style.display = 'none';
        }
    }
};

const setNavbarState = async () => {
    try {
        const response = await fetch(baseUrl + '/auth/status', {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        if (data.status) {
            // User is logged in
            document.getElementById("signupNav").style.display = "none";
            document.getElementById("loginNav").style.display = "none";
            document.getElementById("logoutNav").style.display = "block";
            document.getElementById("userProfile").style.display = "block";

            if (data.user.isAdmin) {
                // User is also an admin
                document.getElementById("adminNav").style.display = "block";
            }
        } else {
            document.getElementById("signupNav").style.display = "block";
            document.getElementById("loginNav").style.display = "block";
            document.getElementById("adminNav").style.display = "none";
            document.getElementById("logoutNav").style.display = "none";
            document.getElementById("userProfile").style.display = "none";
            welcomeMessage.text('Welcome to Stoic Reads book store! Browse books from our collections! Sign up or login to make a purchase.');
        }
    } catch (error) {
        console.error('Error fetching user status:', error);
    }
};

document.addEventListener('DOMContentLoaded', setNavbarState);
document.addEventListener('DOMContentLoaded', setNavBar);
