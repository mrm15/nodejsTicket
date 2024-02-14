export const timestampToTime = (TimeStampDate: number | Date | undefined)=>{
    const formatter = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        // The 'calendar' option is not included here as it's not standard in all environments
    });

    return formatter.format(TimeStampDate)
}