export function pathColorPercentage(percentage) {
    if (percentage > 69) {
        return "rgb(34, 202, 119)";
    } else if (percentage > 39) {
        return "rgb(205, 206, 59)";
    } else if (percentage > 0) {
        return "rgb(217, 55, 111)";
    } else {
        return "rgb(102, 102, 102)";
    }
}
export function trailColorPercentage(percentage) {
    if (percentage > 69) {
        return "rgba(34, 202, 119, 0.5)";
    } else if (percentage > 39) {
        return "rgba(205, 206, 59, 0.5)";
    } else if (percentage > 0) {
        return "rgba(217, 55, 111, 0.5)";
    } else {
        return "rgb(102, 102, 102)";
    }
}
