import {debounce} from 'throttle-debounce';

export function handleNumber(value, func) {
    // Only allow numbers
    if (!isNaN(value) && parseInt(value) >= 0)
        debounce(500, func(parseInt(value)));
    // Except for blanks to allow deleting a value
    if (value == '')
        debounce(500, func(value));
}

export function roundIntervalToWeeks(interval : number) {
    let weeks = Math.floor(interval / 7);
    
    if (interval % 7 >= 2)
        weeks += 1;
    return weeks * 7;
}

export function displayIntervalInWeeks(interval : number) {
    let weeks = Math.floor(interval / 7);

    if(weeks === 0)
        return '';
    
    return weeks;
}