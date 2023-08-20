import React,{useState ,useEffect, useMemo} from 'react'
import {Link} from 'react-router-dom'

import '../assets/css/headerFooterStyle/headerFooterStyles.css'

function Header({moveToHome}){
    const [login ,setLogin] = useState(false)
    const [logout ,setLogout] = useState(false)

let email = 0
useMemo( async () => {
    email = await localStorage.getItem("email")
    // console.log("email: ",email)
    if(email != 0){setLogin(true);
        // console.log("an email")
    }
    else{
        // console.log("no email")
    }
},[0])
// console.log(email)
let user = localStorage.getItem('name')

function handleOption(e){
   
    for(let i=0;i<e.target.parentNode.children.length;i++){
        e.target.parentNode.children[i].style.color='white'
    }
    (e.target.style.color="crimson")

       moveToHome(e.target.id)

}

function dropDown(){
    // if(e.target.id == "dropDown"){
        let menu = document.getElementsByClassName('dropDown')
        if(menu[0].style.display == 'none'){
                menu[0].style.display = ''
            }
            else{
                menu[0].style.display = 'none'
            }
    // }
}
useEffect(()=>{
    if(logout){
        fetch('http://localhost:5000/picta/api/user/logout',{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Origin": "*",
            },
            body:JSON.stringify({
                email:email,
            })
        })
        .then(res => res.json())
        .then(async(data) =>{
            if(data.message == 'Logout Successful'){
              await localStorage.setItem('email',0)
                setLogin(false)
            }
            // console.log(data)
        })
        .catch(err => console.log(err))
        setLogout(false)
    }
},[logout])

// console.log(login)

    return(
        <React.Fragment>
            <div id="header">
                <h1>Picta <span className="fas fa-camera"></span> </h1>
                <center>
                <nav>
                    
                    <span className='fas fa-home' id="main" onClick={(e)=>handleOption(e)} style={{color:"crimson"}}></span>
                    <span className='fas fa-user' id="account" onClick={(e)=>handleOption(e)}></span>
                    <span className='fas fa-gear' id="settings" onClick={(e)=>handleOption(e)}></span>
                </nav>
                </center>

            {
                login ?
                <div style={{display:"flex",flexDirection:"column"}}>
                    <div className="userInfo" onClick={()=>dropDown()}>
                        <img src={require('../assets/images/logo1.jpg')} id="dropDown"/>
                        <span id="dropDown">
                        {user}
                        </span>
                    <div className="dropDown" style={{display:"none"}}>
                        <button>Settings <span className="fas fa-gear"></span> </button>
                        <hr/>
                        <button onClick={()=>setLogout(true)}>Logout <span className="fas fa-door-open"></span> </button>
                    </div>
                    </div>
                </div>
            :

            <div className="userInfo">
                <Link to="/auth/login">
                    <button>Login</button>
                </Link>
            </div>

            }


            </div>
        </React.Fragment>
    )
}

export default Header