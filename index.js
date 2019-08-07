const exp = require('express');

const app = exp();


app.get('/', (req, res) => {
    res.send('Am On')
})


const PORT = process.env.PORT || 9999
app.listen(PORT);