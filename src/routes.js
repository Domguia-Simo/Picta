import Login from './views/Auths/login'
import Register from './views/Auths/register'


let routes =[
    {
        path:"/login",
        layout:"/auth",
        component:<Login/>,
        name:"Login"
    },
    {
        path:"/register",
        layout:"/auth",
        component:<Register/>,
        name:"Register"
    }
]

export default routes