const serialize = (data) =>
    JSON.stringify (data).replace(/\//g, '\\/');

export default (app, data) => {

    return `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Relay Items List</title>

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
                <link rel="stylesheet" href="/styles.css">

                <script id="preloadedData" type="application/json">${serialize (data)}</script>
            </head>

            <body>
                <div id="root">${app}</div>

                <script src="/vendor.js"></script>
                <script src="/bundle.js"></script>
            </body>
        </html>`
}

