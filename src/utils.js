function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        let defaultValue = 'Amsterdam, NL';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(position.coords);
            }, positionError => {
                console.warn('Unable to use gelocation, using default location');
                resolve(defaultValue);
            });
        } else {
            console.warn('Browser does not support geolocation, using default location');
            resolve(defaultValue);
        }
    });
}

export {
    getCurrentPosition
};
