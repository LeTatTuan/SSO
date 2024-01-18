

const getLoginPage = (req, res) => {
    const arrMessage = req.flash('data');
    const error = arrMessage[0] ? arrMessage[0] : '';
    const inputEmail = arrMessage[1] ? arrMessage[1] : '';
    const EC = arrMessage[2] ? arrMessage[2] : '';
    return res.render('login.ejs', {
        error,
        inputEmail,
        EC,
    });
}

module.exports = {
    getLoginPage,
}