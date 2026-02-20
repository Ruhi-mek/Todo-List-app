const loginscreen = document.getElementById('login-screen');
const signupscreen = document.getElementById('signup-screen');
const mainpage = document.querySelectorAll('.btn-in');
const cleaninfo = document.getElementById('clean-info');
const gotosignup = document.getElementById('go-to-signup');
const backtologin = document.getElementById('back-to-login');

mainpage.forEach(button => {
    button.addEventListener('click', () => {
        loginscreen.style.display = 'none';
        signupscreen.style.display = 'none';
    });
});

cleaninfo.addEventListener('click',()=> {
    document.getElementById('login-name').value = '';
    document.getElementById('login-password').value = '';
    // loginscreen.style.display = 'block';
    // signupscreen.style.display = 'none';

})

gotosignup.addEventListener('click', () => {
    loginscreen.style.display = 'none';
    signupscreen.style.display = 'block';
});

backtologin.addEventListener('click', () => {
    signupscreen.style.display = 'none';
    loginscreen.style.display = 'block';
});
