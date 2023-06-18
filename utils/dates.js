const currentDate = new Date()

const getCurrentDate = () => {
    const year = currentDate.getFullYear()
    const month = _(currentDate.getMonth() + 1)
    const day = _(currentDate.getDate())
    return `${year}${month}${day}`
}

const _ = (d) => d > 9 ? d : `0${d}`

module.exports = getCurrentDate