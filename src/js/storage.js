
//  
signuptomain.addEventListener('click', () => { 

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if( name == '' || email == '' || password == '' ){
        alert("Please fill all the requirements!")
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if(users.find(user => user.name === name)){
        alert("Username already taken!");
    } else {
        users.push({ name, email, password });
        
        localStorage.setItem('users', JSON.stringify(users));
        
        alert("Signup Successfully done!");
    }    
});

// 
logintomain.addEventListener('click', () => {

    const loginName = document.getElementById('login-name').value;
    const loginPassword = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem(users)) || []; 

    if(users.find(user => user.name === loginName && user.password === loginPassword)){
        alert(`Welcome back, ${validUser.name}! Login Successful.`);
    } else{
        alert("Invalid Username or Password!");
    }
});