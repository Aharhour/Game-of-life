document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById('avatar');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Voeg een klik-eventlistener toe aan de avatar
    avatar.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Voeg een klik-eventlistener toe aan het window
    window.addEventListener('click', (event) => {
        if (!event.target.matches('#avatar')) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            }
        }
    });
});

// Functie om de avatar bij te werken op basis van het geselecteerde karakter
function updateAvatar() {
    // Een map van karakternamen naar avatarafbeeldingen
    const avatarMap = {
        'Geralt': 'images/gerald-avatar.png',
        'Triss': 'images/triss-avatar.png',
        'Vesemir': 'images/vesemir-avatar.png',
        'Caesar': 'images/caesar-avatar.png',
        'Yennefer': 'images/yennefer-avatar.png'
    };

    // Verkrijg het geselecteerde karakter uit localStorage
    const selectedCharacter = localStorage.getItem('selectedCharacter');
    if (selectedCharacter && avatarMap[selectedCharacter]) {
        document.getElementById('avatar').src = avatarMap[selectedCharacter];
    }
}

window.onload = updateAvatar;