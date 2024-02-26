let dDuration = 35;
var seniorTimeTable = [
    { key: "cPeriod", value: dDuration }, // 第一节
    { key: "cPeriod", value: dDuration }, // 第二节
    { key: "break", value: 30 },          // 下课
    { key: "cPeriod", value: dDuration }, // 第三节
    { key: "cPeriod", value: dDuration }, // 第四节
    { key: "break", value: 5 },           // 小休
    { key: "cPeriod", value: dDuration }, // 第五节
    { key: "cPeriod", value: 40 },        // 第六节
    { key: "break", value: 35 },          // 下课
    { key: "cPeriod", value: dDuration }, // 第七节
    { key: "break", value: 5 },           // 小休
    { key: "cPeriod", value: dDuration }, // 第八节
    { key: "cPeriod", value: dDuration }, // 第九节
    { key: "break", value: 10 },          // 小休
    { key: "cPeriod", value: dDuration }, // 第十节
    { key: "cPeriod", value: dDuration }, // 第十一节
];
var juniorTimeTable = [
    { key: "cPeriod", value: dDuration }, // 第一节
    { key: "cPeriod", value: dDuration }, // 第二节
    { key: "break", value: 30 },          // 下课
    { key: "cPeriod", value: dDuration }, // 第三节
    { key: "cPeriod", value: dDuration }, // 第四节
    { key: "break", value: 5 },           // 小休
    { key: "cPeriod", value: dDuration }, // 第五节
    { key: "break", value: 35 },          // 下课
    { key: "cPeriod", value: 40 },        // 第六节
    { key: "cPeriod", value: dDuration }, // 第七节
    { key: "break", value: 5 },           // 小休
    { key: "cPeriod", value: dDuration }, // 第八节
    { key: "cPeriod", value: dDuration }, // 第九节
    { key: "break", value: 10 },          // 小休
    { key: "cPeriod", value: dDuration }, // 第十节
    { key: "cPeriod", value: dDuration }, // 第十一节
];

function genTimeTable(userInput) {
    let dStartTime = 480;
    const startTime = userInput;

    let selectedGrade;
    const gradeOption = document.getElementsByName('grade');
    for (const option of gradeOption) {
        if (option.checked) {
            selectedGrade = option.value;
            break;
        }
    }

    let timetable = [];
    let tempTable = [];
    let titlecontent = "";
    if (selectedGrade === "jr") {
        for (let i = 0; i < juniorTimeTable.length; i++) {
            tempTable.push([juniorTimeTable[i].value, juniorTimeTable[i].key]);
        }
        titlecontent = "初中时间表";
    }
    else if (selectedGrade === "sr") {
        for (let i = 0; i < seniorTimeTable.length; i++) {
            tempTable.push([seniorTimeTable[i].value, seniorTimeTable[i].key]);
        }
        titlecontent = "高中时间表";
    }
    document.getElementById('timetableTitle').innerText = titlecontent;
    let totalminutes = parseInt(startTime.substring(0, 2)) * 60 + parseInt(startTime.substring(2, 4));
    let totaldelayTime = (totalminutes > dStartTime) ? totalminutes - dStartTime : 0;
    let count = Math.floor(totaldelayTime / 5);
    let index = 0;
    while (count > 0) {
        index %= tempTable.length;
        if (tempTable[index][1] !== 'break') {
            tempTable[index][0] -= 5;
            count -= 1;
        }
        index += 1;
    }

    let currentTime = totalminutes;
    for (let i = 0; i < tempTable.length; i++) {
        let aTime = currentTime;
        let bTime = currentTime + tempTable[i][0];
        if (tempTable[i][1] == 'cPeriod')
            timetable.push([converTime(aTime), converTime(bTime), tempTable[i][1]]);
        currentTime = bTime;
    }

    for (let i = 0; i < 11; i++) {
        context = 'time' + (i + 1);
        document.getElementById(context).innerHTML = timetable[i][0] + '<br>' + timetable[i][1];
    }

}

function converTime(timeInMinutes) {
    let hours = Math.floor(timeInMinutes / 60);
    let minutes = timeInMinutes % 60;
    return `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}`;
}

function isValid24HourTime() {
    let userInput = document.getElementById("stime").value;
    const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$|^(?:2[0-3]|[01][0-9])[0-5][0-9]$/;
    if (userInput === "") {
        userInput = '0800';
    }
    if (!timeRegex.test(userInput))
        alert('請輸入有效的24小時制時間（例如：08:00）。');
    else
        genTimeTable(userInput);
}
window.onload = function () {
    document.querySelector('input[name="grade"][value="jr"]').checked = true;
};
