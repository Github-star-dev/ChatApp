import React ,{useEffect, useState}from 'react'
import { toast } from 'react-toastify';
import { toastTheme } from '../../constants';
import { ChatState } from '../../context/ChatProvider';
import Sidebar from "../../components/Sidebar"
import Groups from './Groups';
import UserProfile from "../../components/UserProfile"
import ChatList from './ChatList';
import CurrentChat from './CurrentChat';
import SearchDrawer from "./SearchDrawer"


const Chats = () => {

  // USER'S INFO //
  const {user,notification,setNotification,selectedChat} = ChatState()

  // STATE VARIABLES
  const [searchDrawer,setSearchDrawer] = useState(false) // determines if search Drawer is visible //
  const [usersDiv,setUsersDiv] = useState(true) // determines if div containing all chats if visible //
  const [seeNav,setSeeNav] = useState(false)    // determines if sidebar if visible //
  const [seeChat,setSeeChat] = useState(true)   // determines if current chat div if visible // 
  const [isStart,setStart] = useState(true)  // if it the start of the app //
  const [clickedNotification,setClickedNotification] = useState(false) // to judge if any particular notification has been clicked
 


  // FUNCTIONS FOR BUTTONS
  const homeFun = () =>{
    setSeeChat(true)
    setUsersDiv(true)
  }

  const logoutFun = () => {
    localStorage.clear()
    toast.success("Logged Out...", toastTheme);
    setTimeout(()=>{ window.location.reload()},500)
  }

  const chatFun = () => {
    setSeeChat(true)
    if (window.innerWidth < 900){
      setUsersDiv(false)}
    }
   

  const searchFun = () => {setSearchDrawer(!searchDrawer)}
  const showSidebar = () => {setSeeNav(!seeNav)}

  return (
    <div className='chatsPage flex flex-row justify-center h-screen '>

        {/* USER SEARCH DRAWER */}
        <SearchDrawer showSearch={searchDrawer} searchFun = {searchFun}/>

        {/* SIDEBAR FOR QUICK ACCESS */}
        <div className={`${seeNav?'flex':'hidden'} sm:flex bg-[#116D6E] my-[2%] mx-[2%] rounded-lg ml-[2%] px-[1%] border`}>
            <Sidebar homeFun= {homeFun} chatFun={chatFun} searchFun = {searchFun} logoutFun = {logoutFun} />
        </div>

        {/* ALL CHATS DIV */}
        <div className={`${usersDiv?"flex":"hidden"} flex-col justify-between my-[2%] rounded-lg bg-green-50 w-[550px] px-[1%] py-[1%] border`}>
            <UserProfile user={user} showSidebar={showSidebar}/>
            <Groups  setStart = {setStart} chatFun={chatFun}/>
            <ChatList chatFun={chatFun} setStart= {setStart} clickedNotification={clickedNotification} setClickedNotification={setClickedNotification}/>

        </div>

        {/* CURRENT CHAT DIV */}
        <CurrentChat isStart={isStart} showSidebar={showSidebar} usersDiv={usersDiv} seeChat={seeChat} setClickedNotification={setClickedNotification} />
    </div>
  )
}

export default Chats