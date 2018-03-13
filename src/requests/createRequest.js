export default (method, url) => {
    return (params) => {
        const requestPromise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = (e) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                        return;
                    }
                }

                reject(xhr.statusText);
            };

            let paramString = '?';

            // client secret should not be exposed in a web application.
            const formattedParams = [
                'client_id=YTZT1ZRTVMXA52INRENW43SXOYHUL1XTZAIKJBMR1I0TDAWK',
                'client_secret=DVRI3XOQAXWIIMGTGC1RS5TJ0NAMXZQZF1PALE3DXUMQ4AUJ',
                'v=20180312'
            ];
            for (var param in params) {
                if (params.hasOwnProperty(param)) {
                    formattedParams.push(`${param}=${params[param]}`);
                }
            }
            paramString = '?' + formattedParams.join('&');

            xhr.open(method, url + paramString);
            xhr.send();
        });

        return requestPromise;
    };
};
