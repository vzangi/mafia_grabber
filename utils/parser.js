const cheerio = require('cheerio')
const api = require('../api/mafia')

parseGame = async (game) => {
    
    const response = await api.gameLog(game.id)
    if (response.r !== 'ok') {
        throw new Error('Лог партии не найден')
    }

    const $ = cheerio.load(response.log.summary)

    const rez = {
        number: game.id,
        creator: getCreator($),
        create_date: game.end_dt.substr(0, 10),
        create_time: game.end_dt.substr(11, 8),
        street_name: api.getStreetName(game.ul),
        players_count: game.player_count,
        winner: api.getResult(game.result),
        players_names: ',' + response.log.players.map(pl => pl.nick).join(',') + ',',
        first_zek: getZek($, game),
        first_trup: getTrup($),
        first_prova: getProva($)
    }
    getTrup($)
    return rez
}

getCreator = ($) => {
    return $('.text:first b').text()
}

getZek = ($, game) => {
    try {
        let marker = ' в тюрьму'
        if (game.ul === 'ul3') {
            marker = ' имеет очень низкую репутацию'
        }
        let zekText = $(`.text b:contains('${marker}'):first`).text()
        
        const reg = '^(.*) отправлен.*в тюрьму|^(.*) имеет очень низкую репутацию в городе'
        const zekReg = zekText.match(reg)
        const role_nik = zekReg[1] || zekReg[2]

        return getNik(role_nik)
    } catch(error) {
        return ''
    }
}

getTrup = ($) => {
    try {
        const trupText = $('.text b:contains(" убит"):first').text()
        const reg = '^(.*) убит'
        const trupReg = trupText.match(reg)
        const role_nik = trupReg[1]

        return getNik(role_nik)
    } catch (error) {
        return ''
    }
}

getProva = ($) => {
    const provaText = $('.move-kom:contains(" проверил жителя"):first').text()
    try {
        const reg = '^.*проверил жителя (.*).'
        const provaReg = provaText.match(reg)
        const role_nik = provaReg[1]

        return role_nik
    } catch (error) {
        return ''
    }
}

getNik = (role_nik) => {
    let nik = role_nik
    if (/^Внебрач.*/.test(nik)) {
        nik = nik.substr(nik.indexOf(' ') + 1)
        nik = nik.substr(nik.indexOf(' ') + 1)
    }
    nik = nik.substr(nik.indexOf(' ') + 1)
    return nik
}

module.exports = parseGame