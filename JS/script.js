document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById('avatar');
    const dropdownMenu = document.getElementById('dropdown-menu');

    avatar.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', (event) => {
        if (!event.target.matches('#avatar')) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            }
        }
    });
});

function updateAvatar() {
    const avatarMap = {
        'Geralt': 'images/gerald-avatar.png',
        'Triss': 'images/triss-avatar.png',
        'Vesemir': 'images/vesemir-avatar.png',
        'Caesar': 'images/caesar-avatar.png',
        'Yennefer': 'images/yennefer-avatar.png'
    };

    const selectedCharacter = localStorage.getItem('selectedCharacter');
    if (selectedCharacter && avatarMap[selectedCharacter]) {
        document.getElementById('avatar').src = avatarMap[selectedCharacter];
    }
}

window.onload = updateAvatar;