export class Ui {
  constructor() {
    this.gameArr = []
    this.getApi()
  }
  async getApi() {
    const url =
      'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter'
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9d82bafe64msh0cf936ff4f313c2p19bc6ajsn29e45be7e0b2',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }

    try {
      const response = await fetch(url, options)
      this.gameArr = await response.json()
      this.displayGameCards()
      console.log(this.gameArr)
    } catch (error) {
      console.error(error)
    }
  }

  displayGameCards() {
    let gameBox = ''
    for (let i = 0; i < this.gameArr.length; i++) {
      gameBox += `<div class="col-lg-3 col-md-12 ">
                  <div data-id="${this.gameArr[i].id}" class="card-holder border border-black p-3  align-items-center h-100 w-100  " >  
                    <div id="img-card" class="img-holder rounded "><img src="${this.gameArr[i].thumbnail}" class="w-100" alt=""></div>
                    <div class="text-area pt-3 h-100 ">
                      <div class="d-flex justify-content-between align-items-baseline">
                        <h3 class="w-75 fw-normal fs-6">${this.gameArr[i].title}</h3>
                        <span class="bg-primary border-5 rounded-pill px-2 py-1">free</span>
                      </div>
                      <p id="description " class="fw-semibold fs-6  read-more" >${this.gameArr[i].short_description}</p>
                      <footer class="">
                        <div class="position-relative bottom-0 w-100 mt-auto d-flex justify-content-between align-items-baseline">
                          <span class="bg-danger px-2 py-1 rounded" >${this.gameArr[i].genre}</span>
                          <span class="bg-success px-2 py-1 rounded" >${this.gameArr[i].platform}</span>
                        </div>
                      </footer>
                      <button class="btn btn-primary show-more mt-3 " data-game-id="${this.gameArr[i].id}">Show More</button> 
                    </div>
                  </div>
                </div>`
    }

    document.getElementById('gamecards').innerHTML += gameBox

    document.querySelectorAll('.show-more').forEach(button => {
      button.addEventListener('click', event => {
        const gameId = event.target.getAttribute('data-game-id')
        this.displayGameDetails(gameId)
      })
    })
  }

  async displayGameDetails(gameId) {
    document.querySelector('.navsection').classList.remove('d-block')
    document.querySelector('.navsection').classList.add('d-none')
    document.querySelector('.more-Details').classList.add('d-block')
    document.querySelector('.more-Details').classList.remove('d-none')

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9d82bafe64msh0cf936ff4f313c2p19bc6ajsn29e45be7e0b2',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }

    try {
      const response = await fetch(url, options)
      const game = await response.json()

      document.querySelector('.more-Details img').src = game.thumbnail
      document.querySelector('.more-Details h2').textContent = game.title
      document.querySelector(
        '.more-Details p:nth-of-type(1)'
      ).textContent = `Category: ${game.genre}`
      document.querySelector(
        '.more-Details p:nth-of-type(2)'
      ).textContent = `Platform: ${game.platform}`
      document.querySelector(
        '.more-Details p:nth-of-type(3)'
      ).textContent = `Status: ${game.status}`
      document.querySelector('.more-Details span:last-of-type').textContent =
        game.short_description
    } catch (error) {
      console.error('Error fetching game details:', error)
    }

    document.getElementById('btnClose').addEventListener('click', () => {
      document.querySelector('.more-Details').classList.add('d-none')
      document.querySelector('.more-Details').classList.remove('d-block')
      document.querySelector('.navsection').classList.remove('d-none')
      document.querySelector('.navsection').classList.add('d-block')
    })
  }
}
