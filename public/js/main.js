const socket = io();
const chatForm =document.getElementById('chat-form');
const chatMessages =document.querySelector('.chat-messages');
const roomName= document.getElementById('room-name');
const userList= document.getElementById('users');
//get username and Room
 const {username,room} =Qs.parse(location.search,{
   ignoreQueryPrefix:true
 });
 // console.log(username,room);

 //jopin chatroom
 socket.emit('joinRoom',{username,room});
//message submit
socket.on('message', message=> {
  // console.log(message);
  outputMessage(message);

  //scrool down\
  chatMessages.scrollTop =chatMessages.scrollHeight;


});
//get room Users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users);
});

//Message submit
chatForm.addEventListener('submit',e=>{
  e.preventDefault();


  const msg =e.target.elements.msg.value;

  socket.emit('chatMessage',msg);

  //clear input
  e.target.elements.msg.value='';
  e.target.elements.msg.focus();
});

// //output message document
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message')
  div.innerHTML =`<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

//add roomname to DOm
function outputRoomName(room){
  roomName.innerText=room;
}
//add user to DOm
function outputUsers(users){
  userList.innerHTML=`
  ${users.map(user=> `<li>${user.username}</li>`).join('')}`;
}
