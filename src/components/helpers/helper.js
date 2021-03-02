module.exports = {
    getRandomNumber: () => {
        return new Date().getTime();
    },
    getTimeStamp: (today) => {
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let hours = String(today.getHours()).padStart(2, '0');
        let minutes = String(today.getMinutes()).padStart(2, '0');
        let seconds = String(today.getSeconds()).padStart(2, '0');
        
        let date = `${dd}-${mm}-${yyyy}`;
        let time = `${hours}:${minutes}:${seconds}`;

        return `${date} ${time}`;
    }
}