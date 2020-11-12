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

/**
 * Format the runtime of a movie
 * Given in minutes, transformed in hours
 * @param {Number} runtime
 * @returns {string}
 */
export function formatRuntime(runtime) {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (runtime >= 60) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

/**
 * Filter crew member to only get Director, Story, Screenplay, Writer
 * @param {array} array
 * @returns {array}
 */
export function filterCrew(array) {
    let result = array.reduce((h, { job, id, name }) => {
        return Object.assign(h, { [name]: (h[name] || []).concat({ job, id, name }) });
    }, {});

    let finalArray = [];
    Object.entries(result).map((data) => {
        finalArray[data[0]] = [];
        return data[1].map((res) => {
            let avaibleJob = ["Director", "Story", "Screenplay", "Writer"];
            if (avaibleJob.includes(res.job)) {
                finalArray[res.name].push([res.job]);
                finalArray[res.name].id = res.id;
            }
            return finalArray;
        });
    });
    for (var propName in finalArray) {
        if (finalArray[propName].length === 0) {
            delete finalArray[propName];
        }
    }
    return finalArray;
}
