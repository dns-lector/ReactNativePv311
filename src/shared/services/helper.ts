function displayDate(moment:string|Date):string {
    const date = typeof moment == "string"
    ? new Date(moment)
    : moment;

    const dateIso = date.toISOString();
    const today = new Date();
    if(dateIso.substring(0,10) == today.toISOString().substring(0,10)) {
        return dateIso.substring(11,19);
    }

    let yesterday = today;
    yesterday.setDate(today.getDate() - 1);



    return moment.toString();
}

export {displayDate};