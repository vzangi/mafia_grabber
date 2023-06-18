const axios = require('axios')
const inyan_api = 'https://klan-inyan.ru/api/'

class InyanApi {

    request = async (method, params) => {
        const response = await axios.get(inyan_api + method, { params })
        return response
    }

    check = async (game) => {
        const number = game.id
        const response = await this.request('check_game_number', { number })
        return response.data.in_base == 1
    }

    saveGame = (data) => {
        axios.post(inyan_api + 'save_game_statistic', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        console.log(data.number);
    }
}

module.exports = new InyanApi()