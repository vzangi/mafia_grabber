const axios = require('axios')
const mafia_api = 'https://www.mafiaonline.ru/api/api.php'

const roles = [
    'Честный',
    'Мафия',
    'Комиссар',
    'Внебрачное дитя босса',
    'Сержант',
    'Доктор',
    'Маньяк',
    'Босс',
    'Хулиган',
    'Шериф',
    'Телохранитель',
    'Адвокат',
    'Ниндзя',
    'Самурай',
]

const streets = {
    ul1: 'Улица Крещения',
    ul2: 'Улица Ожидания',
    ul3: 'Сумеречный переулок',
    ulv: 'VIP-клуб',
}

const results = [
    'Остановена',
    'Ничья',
    'Честные',
    'Мафия',
    'Маньяк',
    'Якудза',
]

class MafiaApi {

    request = async (params) => {
        const res = await axios.get(mafia_api, { params })
        return res.data
    }

    version = async () => {
        return await this.request({ action: 'ver' })
    }

    playerInfo = async (nik) => {
        return await this.request({ action: 'info', param: nik, stat: 'no' })
    }

    log = async(params) => {
        return await this.request({ action: 'log', ...params })
    }

    gameInfo = async (gameId) => {
        return await this.log({ param: 'info', id: gameId })
    }

    gameLog = async (gameId) => {
        return await this.log({ param: 'log', id: gameId })
    }

    gamesList = async (date) => {
        return await this.log({ param: 'list', date })
    }

    currentGames = async () => {
        return await this.log({ param: 'current' })
    }

    getStreetName = (street) => streets[street]

    getResult = (result) => results[result]
}

module.exports = new MafiaApi()