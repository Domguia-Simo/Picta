import React,{useState ,useEffect} from 'react'
import {Routes ,Route} from 'react-router-dom'
import Header from '../../layouts/header'
import Footer from '../../layouts/footer'
import CreatePost from './createPost'

import '../../assets/css/homeStyles/homeStyle.css'

const Home = ()=>{

    const [views ,setViews] = useState('main')
    const [posts ,setPosts] = useState([])
    const [refresh ,setRefresh] = useState(0)

    let comments = []
    useEffect(()=>{

        fetch('http://localhost:5000/picta/api/comment/getAllComments',{
            method:"GET",

        })
        .then(res => res.json())
        .then(data => {
            comments = []
            for (let i = data.length - 1; i >= 0; i--) {
                const randomIndex = Math.floor(Math.random() * (i + 1));
                comments.push(data[i]);
                data[i] = data[randomIndex];
              }
            // console.log(comments)
            
        })
        .catch(err => console.log(err))

            fetch('http://localhost:5000/picta/api/post/getAllPosts',{
                method:"GET",
                header:{
                    'Accept':"application/json",
                    'Content-Type':"application/json",
                    "Access-Control-Origin":'*'
                }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                let temp = []

                for (let i = data.length - 1; i >= 0; i--) {
                    const randomIndex = Math.floor(Math.random() * (i + 1));
                    temp.push(data[i]);
                    data[i] = data[randomIndex];
                  }
                  let k=0
                    for(let i=0;i<temp.length;i++){
                        temp[i].comment = []
                          }
                 
                  for(let i=0;i<temp.length;i++){
                    for(let j=0;j<comments.length;j++){
                        if(comments[j].publisher){
                         
                            if((temp[i].by === comments[j].publisher)){
                              temp[i].comment.push(comments[j])
                            //   k++
                            }
                        }
                    }
                  }

                  console.log(temp)
                setPosts(temp)
            })
            .catch(err => console.log(err))  

    },[refresh])

function rerender(){
    setRefresh(1)
}

    const result = posts.map(row => {

      return <PostCard moveUp={rerender}>{row}</PostCard>
    })

    function changeView(view){
        setViews(view)
    }
    let display = ''
    if(views == 'main'){
         display=<><div id="posts">{result}</div> <Footer/></>
    }else if(views == "account"){
        display = <CreatePost/>
    }
    
    return(
            <React.Fragment>
                <Header moveToHome={changeView}/>
                    <br/><br/><br/>
                        {display}         
            </React.Fragment>
    )

}

const PostCard =  ({children,moveUp})=>{

    const [newComments, setNewComments] = useState([])
    const [oldComment,setOldComment] = useState(0)
    const [sendComment ,setSendComment] = useState(0)
    const [comment ,setComment] = useState('')
    const [like ,setLike] = useState(0)

    useEffect(()=>{
        if(like != 0){
            fetch('http://localhost:5000/picta/api/action/like',{
                method:"POST",
                headers:{
                    'accept':"applcation/json",
                    'content-type':"application/json",
                    'access-control-origin':"*"
                },
                body:JSON.stringify({
                    postID:children._id,
                    like:children.likes
                })
            })
            .then(res => res.json())
            .then(data =>{
                 console.log(data)
                moveUp()
            })
            .catch(err => console.log(err))
        }
    },[like])

let time = new Date
time = time.getDay()+'-'+time.getMonth()+'-'+time.getFullYear()

let email = localStorage.getItem('email')
let userName = localStorage.getItem('name')

useEffect(()=>{
    if(sendComment != 0){
        fetch('http://localhost:5000/picta/api/comment/sendComment',{
            method:"POST",
            headers:{
                'Accept':"application/json",
                "Content-Type":"application/json",
                "Access-Control-Origin":"*"
            },
            body:JSON.stringify({
                comment:comment,
                time:time,
                commentor:email,
                publisher:children.by
            })
        })
        .then(res => res.json())
        .then(data => {
            setOldComment(data.comment)
            moveUp()
            // console.log(data)
        })
        .catch(err => console.log(err))
        setSendComment(0)
        setComment('')
    }
},[sendComment])
console.log(children.comment)
let displayComment = 'No Comment '
if(children.comment){
     displayComment =  children.comment.map(row => {
        return <Comment>{row}</Comment>
    })
}

// console.log(children.comment)

return(
    <React.Fragment>
        <div className="postCard">
            {/* <img src={require(`../../assets/images/${children.name}`)}/> */}
            <img src={`http://localhost:5000/uploads/${children.name}`}/>

            <div className="postInfo">
                <span><i>Published By:</i> <em> @{children.by}</em></span>
                <span><i> Date Of Publication: </i>{children.date}</span>
                <span style={{}}> <i>Description:</i> {children.description}</span>

                <div className='icon'>
                    <span ><i onClick={()=>{
                        if(email == 0){
                            alert("Please you must first logging before Liking a post")
                        }else{
                            setLike(like+1)
                        }
                        }}style={{color:"crimson"}} className='far fa-heart'></i>:{children.likes}</span>
                    <span ><i style={{color:"rgb(50,50,50"}} className="far fa-comment"></i>:{0}</span>
                    <span style={{color:"rgb(50,50,50"}}className="fas fa-share"></span>

                </div>
                
                <center>
                    <div className="comment">

                    <span className='far fa-smile'></span>
                    <span className='fas fa-file'></span>

                        <input type="text" placeholder="Comment Here !!!" value={comment} onChange={(e)=>{setComment(e.target.value)}}/>

                    <span className='fab fa-telegram' onClick={()=>{
                        if(email == 0){
                            alert("Sorry you must first logging before commenting")
                        }else{
                            setSendComment(sendComment+1)
                        }
                        }}></span>

                    </div>
                </center>   
                <div
                    style={{
                        height:"160px",
                        overflowY:"scroll",
                        // border:"solid 1px grey",
                        backgroundColor:"rgb(230,230,230)"
                    }}
                ><h4>Comments </h4>
                    {displayComment}
                </div>

            </div>

        </div>
    </React.Fragment>
)
}

function Comment({children}){

    return(
        <div className="oldComment">

                <span>@{children.commentor}: <span style={{float:"right"}}>{children.time}</span></span>
                {/* <br/> */}
                <span>{'->'} {children.comment}</span>

    </div>
    )
}

export default Home