import {debounce} from 'throttle-debounce';

export function handleNumber(value, func) {
    // Only allow numbers
    if (!isNaN(value) && parseInt(value) >= 0)
        debounce(500, func(parseInt(value)));
    // Except for blanks to allow deleting a value
    if (value == '')
        debounce(500, func(value));
}

export function roundDaysToNearestWeek(interval : number) {
    let weeks = Math.floor(interval / 7);
    const weeksRoundUpValue = 2;

    if (interval % 7 >= weeksRoundUpValue)
        weeks += 1;
    return weeks * 7;
}

// takes an interval value in days rounded to the nearest week
export function displayIntervalInWeeks(interval : number) {
    let weeks = interval / 7;

    // if the number of weeks is zero then send a blanc to the control
    // Stops inserting zero when the user blanks the field
    if(interval === 0)
        return '';
    
    return weeks;
}