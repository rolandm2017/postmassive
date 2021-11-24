function convertWidthToCSS(width) {
    let classForPoll = ".side";
    switch (width) {
        case 0:
            classForPoll = classForPoll + "0";
            break;
        case 10:
            // code blockclassForPoll = ".pct0"
            classForPoll = classForPoll + "10";
            break;
        case 20:
            // code blockclassForPoll = ".pct0"
            classForPoll = classForPoll + "20";
            break;
        case 30:
            classForPoll = classForPoll + "30";
            break;
        case 40:
            classForPoll = classForPoll + "40";
            break;
        case 50:
            classForPoll = classForPoll + "50";
            break;
        case 60:
            classForPoll = classForPoll + "60";
            break;
        case 70:
            classForPoll = classForPoll + "70";
            break;
        case 80:
            classForPoll = classForPoll + "80";
            break;
        case 90:
            classForPoll = classForPoll + "90";
            break;
        case 100:
            classForPoll = classForPoll + "100";
            break;
        default:
            let errMsg = "this should never happen" + width;
            throw errMsg;
        // code block
    }
    return classForPoll;
}

export default convertWidthToCSS;
