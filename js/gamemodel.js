import { Ui } from "./ui.js";

export class Games {
    constructor() {
        this.GetGames = 'mmorpg';
        document.querySelectorAll('.nav-item a').forEach((link) => {
          link.addEventListener('click', (e) => {
            document.querySelector('.nav-item .active').classList.remove('active');
            e.target.classList.add('active');
            this.getGames(e.target.dataset.category); 
          });
        });
        this.ui = new Ui();

      }

    async getGames(category) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '9d82bafe64msh0cf936ff4f313c2p19bc6ajsn29e45be7e0b2',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const apiKey = await fetch(url, options);
            const result = await apiKey.json();
        } catch (error) {
            console.error(error);
        }
    }



 
    
   
}