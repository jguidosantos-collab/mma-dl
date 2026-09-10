class Media {
    constructor() {
        this.news = [];
        this.playerPopularity = {};
    }

    addNews(title, description, relatedPlayerId = null) {
        const newsItem = {
            id: 'news_' + Date.now(),
            title: title,
            description: description,
            relatedPlayer: relatedPlayerId,
            week: TimeSystem.getWeek(),
            likes: 0
        };

        this.news.push(newsItem);
        return newsItem;
    }

    generateFightNews(fight) {
        const winner = fight.winner;
        const loser = fight.player1.id === winner.id ? fight.player2 : fight.player1;

        const titles = [
            `${winner.name} defeats ${loser.name}!`,
            `Spectacular victory for ${winner.name}!`,
            `${winner.name} rises in rankings after beating ${loser.name}`
        ];

        const title = titles[Math.floor(Math.random() * titles.length)];
        this.addNews(title, `${winner.name} defeated ${loser.name} in an epic battle!`, winner.id);

        return title;
    }

    increasePopularity(playerId, amount) {
        if (!this.playerPopularity[playerId]) {
            this.playerPopularity[playerId] = 0;
        }

        this.playerPopularity[playerId] += amount;
        EventSystem.emit('popularityChanged', { playerId, popularity: this.playerPopularity[playerId] });
    }

    getPopularity(playerId) {
        return this.playerPopularity[playerId] || 0;
    }

    getNews(limit = 10) {
        return this.news.slice(-limit).reverse();
    }

    getPlayerNews(playerId, limit = 5) {
        return this.news.filter(n => n.relatedPlayer === playerId).slice(-limit).reverse();
    }
}

const MediaSystem = new Media();
