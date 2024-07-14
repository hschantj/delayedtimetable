let defaultDuration = 35
const timeTable = {
    "juniorTimeTable": [
        { key: 'classPeriod', value: defaultDuration }, // 第一节
        { key: 'classPeriod', value: defaultDuration }, // 第二节
        { key: 'classRecess', value: 30 }, // 下课
        { key: 'classPeriod', value: defaultDuration }, // 第三节
        { key: 'classPeriod', value: defaultDuration }, // 第四节
        { key: 'classBreak', value: 5 }, // 小休(1)
        { key: 'classPeriod', value: defaultDuration }, // 第五节
        { key: 'classRecess', value: 35 }, // 下课
        { key: 'classPeriod', value: 40 }, // 第六节
        { key: 'classPeriod', value: defaultDuration }, // 第七节
        { key: 'classBreak', value: 5 }, // 小休(2)
        { key: 'classPeriod', value: defaultDuration }, // 第八节
        { key: 'classPeriod', value: defaultDuration }, // 第九节
        { key: 'classBreak', value: 10 }, // 小休(3)
        { key: 'classPeriod', value: defaultDuration }, // 第十节
        { key: 'classPeriod', value: defaultDuration }, // 第十一节
    ],
    "seniorTimeTable": [
        { key: 'classPeriod', value: defaultDuration }, // 第一节
        { key: 'classPeriod', value: defaultDuration }, // 第二节
        { key: 'classRecess', value: 30 }, // 下课
        { key: 'classPeriod', value: defaultDuration }, // 第三节
        { key: 'classPeriod', value: defaultDuration }, // 第四节
        { key: 'classBreak', value: 5 }, // 小休(1)
        { key: 'classPeriod', value: defaultDuration }, // 第五节
        { key: 'classPeriod', value: 40 }, // 第六节
        { key: 'classRecess', value: 35 }, // 下课
        { key: 'classPeriod', value: defaultDuration }, // 第七节
        { key: 'classBreak', value: 5 }, // 小休(2)
        { key: 'classPeriod', value: defaultDuration }, // 第八节
        { key: 'classPeriod', value: defaultDuration }, // 第九节
        { key: 'classBreak', value: 10 }, // 小休(3)
        { key: 'classPeriod', value: defaultDuration }, // 第十节
        { key: 'classPeriod', value: defaultDuration }, // 第十一节
    ]
}
const timeCounter = new Array(13).fill(0)

function setDate() {
    const now = new Date()
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')

    const days = String(now.getDate()).padStart(2, '0')
    const months = String(now.getMonth() + 1).padStart(2, '0')
    const years = now.getFullYear()
    let currentTime = document.getElementById('currentTime')
    let dateFormat = `${days} 日 ${months} 月 ${years} 年`
    let timeFormat = `${hours}:${minutes}:${seconds}`
    currentTime.innerHTML = dateFormat + `<br>` + timeFormat
}

function isValid24HourFormat() {
    let userInput = document.getElementById('stime').value
    const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$|^(?:2[0-3]|[01][0-9])[0-5][0-9]$/
    if (userInput === '')
        userInput = '0800'
    if (!timeRegex.test(userInput))
        alert('请输入有效的24小时制时间（例如：0800）。\nPlease enter a valid 24-hour time format (e.g. 0800)')
    else
        GenerateTimetable(userInput)
}

function GenerateTimetable(userInput) {
    let defaultStartTime = 480 // 预设08:00上课，480 = 8 * 60 minutes
    let currentStartTime = parseInt(userInput.substring(0, 2)) * 60 + parseInt(userInput.substring(2, 4))
    let delayedPeriodCount = Math.floor(((currentStartTime > defaultStartTime) ? currentStartTime - defaultStartTime : 0) / 5)
    UpdateTimetable("juniorTimeTable", currentStartTime, delayedPeriodCount)
    UpdateTimetable("seniorTimeTable", currentStartTime, delayedPeriodCount)
}

function UpdateTimetable(tableName, currentStartTime, delayedPeriodCount) {
    var startTime = currentStartTime
    var endTime = 0
    var reducedTime = 0
    var count = 1

    var timeHolder = new Array(11).fill(0)
    for (let index = 0; index < delayedPeriodCount; index++) {
        var counter = index % 11
        timeHolder[counter] += 1
    }

    document.querySelector(`#${tableName} #time0`).innerHTML = `${ConverTime(465)}<br>${ConverTime(currentStartTime)}`
    var timeCounter = 0;
    for (let index = 0; index < timeTable[tableName].length; index++) {
        if (timeTable[tableName][index].key !== 'classBreak' && timeTable[tableName][index].key !== 'classRecess') {
            reducedTime = timeTable[tableName][index].value - (timeHolder[timeCounter] * 5)
            timeCounter++
        }
        else
            reducedTime = timeTable[tableName][index].value

        endTime = startTime + reducedTime
        if (timeTable[tableName][index].key !== 'classBreak') {
            document.querySelector(`#${tableName} #time${count}`).innerHTML = `${ConverTime(startTime)}<br>${ConverTime(endTime)}`
            count++
        }
        startTime = endTime
    }
}

function ConverTime(timeInMinutes) {
    let hours = Math.floor(timeInMinutes / 60)
    let minutes = timeInMinutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} `
}

function UpdateColor() {

}

setInterval(setDate, 1000)
setDate()
GenerateTimetable("0800")