export const timestampToTime = (TimeStampDate: number | Date | undefined) => {
    try {
        const formatter = new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            // The 'calendar' option is not included here as it's not standard in all environments
        });

        return formatter.format(TimeStampDate)
    } catch (error) {
        return error?.toString()
    }
}