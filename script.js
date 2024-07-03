document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            window.location.href = `${game}.html`;
        });
    });
});
