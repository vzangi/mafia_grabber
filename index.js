const api = require('./api/mafia')
const inyanApi = require('./api/inyan')
const parseGame = require('./utils/parser')
const getCurrentDate = require('./utils/dates')

const start = async () => {
    const games = await getTodayGames()

    games.map(async (game) => {
        const check = await inyanApi.check(game)
        if (check) return

        const data = await parseGame(game)
        inyanApi.saveGame(data)
    })
}

const getTodayGames = async () => {
    try {
        const response = await api.gamesList(getCurrentDate())
        if (response.r === 'ok') return response.games
    } catch(error) {
        console.log(error)
    }
    return []
}

start()
