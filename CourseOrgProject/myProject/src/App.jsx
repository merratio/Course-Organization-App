import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import {useNavigate, BrowserRouter, Route, Link, Routes, generatePath} from 'react-router-dom';
 

//function creates a component for buttons
function Btn({classn, btnHandler, value}){
  return(
    <button className={classn} type='button' onClick={btnHandler}>{value}</button>
  );

}

//component on home page
function AddBtn({btnHandler, value}){
  return(
    <button className='moduleBtn' type='button' onClick={btnHandler}>{value}</button>
  );

}

//Profile function
function Profile(){
  return(
    <h1>Hello World</h1>
  )
}

//form to record information about a course
function Form(){
  const [cCode, setCCode] = useState("");
  const [cName, setCName] = useState("");
  const storedId = localStorage.getItem('iden');
  const id = JSON.parse(storedId);

  const add = async () =>{
    let mod;
    try{
      axios.post('http://localhost:8080/api/modules', mod = {modCode: cCode, modName: cName, userId: id.key})
      .then((response) => {
        console.log(response);
      });

    }catch(err){
      console.log(err);
    }
    

  } 
  
  return( 
    <>
    <div className='formDiv'>
      <Box label='Course Code: ' type="text" val={cCode} onValueChange={setCCode}/>
      <Box label='Course Name: ' type="text" val={cName} onValueChange={setCName}/>
      <Btn classn={'sidebarBtnq'} btnHandler={() => add()} value={'Add'}/>

    </div>
    </>

  );
  
}

//view to add information about coursework
function AddCoursework(){
  const [cCode, setCCode] = useState("");
  const [cName, setCName] = useState("");
  const storedId = localStorage.getItem('iden');
  const id = JSON.parse(storedId);

  const add = async () =>{
    let mod;
    try{
      axios.post('http://localhost:8080/api/modules', mod = {modCode: cCode, modName: cName, userId: id.key})
      .then((response) => {
        console.log(response);
      });

    }catch(err){
      console.log(err);
    }
    

  } 
  
  return( 
    <>
    <div className='formDiv'>
      <Box label='Course Code: ' type="text" val={cCode} onValueChange={setCCode}/>
      <Box label='Course Name: ' type="text" val={cName} onValueChange={setCName}/>
      <Btn classn={'sidebarBtnq'} btnHandler={() => add()} value={'Add'}/>

    </div>
    </>
  );
}

//what users see when the log in(A list of courses that they have already added to their account )
function Home1(){
  const storedId = localStorage.getItem('iden');
  const id = JSON.parse(storedId);
  //const [id, setId] = useState(1); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const getData = async () =>{
      try{
        const response = await axios.get(`http://localhost:8080/api/modules/users/${id.key}`);
        setData(response.data);

      }catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
      
    }
    getData();
  })

  if(loading) return <p>Loading...</p>;

  function addCourse(){
    window.open("/Home/addCourses", "_self", "_self");
  }

  function courseWorkView(btnValue){
    window.open("/Home/courseWork", "_self", "_self");
      const thing ={key: btnValue};
      localStorage.setItem('code', JSON.stringify(thing));
  }

 
  return(
    <>
    <center>
    <Box label={'Search'} type={'text'}onValueChange={null}/>


    </center>
    <ul> 
      {
        data.map((item) =>(
          <div className='modBtnDiv'><Btn classn='moduleBtn' btnHandler={() => courseWorkView(item.modName)} value={<li key={item.modCode}>{item.modName}</li>} /></div>
        ))

        
      }
      <div className='modBtnDiv'><AddBtn btnHandler={() => addCourse()} value={<li>Add Module(+)</li>}/></div>
    </ul>
    
    
    </>
    
  );
}

//area where course work is viewed
function CourseWork(){
  const storedId = localStorage.getItem('iden');
  const id = JSON.parse(storedId);
  const storedCode = localStorage.getItem('code');
  const code = JSON.parse(storedCode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await axios.get(`http://localhost:8080/api/coursework/user/${id.key}/module/${code.key}`);
        setData(response.data);

      }catch(err){
        console.log(err);
      }

    }
    fetchData();
  });

  //add course work
  function addCourse(){
    window.open("/Home/addCoursework", "_self", "_self");
  }

  return(
    <>
    <center>
    <table className='table'border={5} cellPadding={10}>
      <tr>
        <th>Coursework</th>
        <th>Weight</th>
        <th>Due Date</th>
        <th>Grade out of 100</th>
        <th>Grade out of weight</th>
      </tr>
      
      {
        data.map((item) =>(
          <>
          <tr className='row'>
          <td className='col' key={item.courseId}>{item.name}</td>
          <td className='col'>{item.percentage}</td>
          <td className='col'>{item.dueDate}</td>
          <td className='col'>{item.gradeOutOf100}</td>
          <td className='col'>{item.gradeOutOfPercentage}</td>

          </tr>
          
          </>
        ))
      }

    
    </table>
    <br />

    <Btn classn={"sidebarBtn"} btnHandler={() => addCourse()} value={"Add Coursework"}/>
      
    </center>
    </>
    
  );

  
}

//creates the ability to toggle between view of courses, coursework and profile. The sidebar with a navigation list is also seen
function Home(){
  //opens the profile in the provided space
  function toogleToProfile(){
    window.open("/Home/Profile", "_self", "_self");
    
  }

  //opens homw view with the modules added
  function toogleToHome(){
    window.open("/Home", "_self", "_self");
    
  }
  return(
    <>
    <div className='home'>
      
      <div className='sidebar'>
        <div className='head'>side</div>
        <br />
        <Btn classn='sidebarBtn' btnHandler={() => toogleToHome()} value={'Home'}/>
        <Btn classn='sidebarBtn' btnHandler={() => toogleToProfile()} value={'Profile'}/>
        <Btn classn='sidebarBtn' btnHandler={null} value={'Log Out'}/>
        

      </div>

      <div className='moduleDashboard'>
      <div className='head'>
        <b>Modules</b>
      </div>
      <Routes>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='' element={<Home1/>}></Route>
        <Route path='/addCourses' element={<Form />}></Route>
        <Route path='/courseWork' element={<CourseWork/>}></Route>
        <Route path='/addCoursework' element={<AddCoursework/>}></Route>

      </Routes>
    
          
      </div>

      
    </div>
    </>
      
  );
}


function Box({label,type, val, onValueChange}){
  return(
    <>
      <label>{label}</label>
      <input type={type}
      value={val}
      onChange={(e) =>onValueChange(e.target.value)} />
      <br /><br />
    </>
  );
    
}

//function represents the login page 
function Main(){
  const [id, setId] = useState(0);
  const [val1,setVal1] = useState("");
  const [val2,setVal2] = useState("");
  const [login,setLogin] = useState(false);
  const data = {email: "", name:"", password:"", userId:null};
  

  useEffect(() =>{
    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:8080/api/users/${val1}`);
        setId(response.data.userId);
        
        data.email = response.data.email;
        data.password = response.data.password;

        console.log(id);
      }catch(err){
        console.log(err);
      }
    }

    fetchData();

  });


  function handleLogin(){
    console.log(data.email);
    if(data.email !== ""){
      if(data.email == val1){
        setLogin(true);
        const thing ={key: id};
        localStorage.setItem('iden', JSON.stringify(thing));
        window.open("/Home", "_self", "_self");    
      } 
      else{
        console.log("false");
      }
    }
  }

  return(
    <div className='mainCon'>
      <div className='container'>
        <h2>Login</h2>
        <Box label="Username: " type={"text"} val={val1} onValueChange={setVal1}/>
        <Box label="Password: " type={"password"} val={val2} onValueChange={setVal2}/>
        
        <Button onLogin={()=> handleLogin()}/>
        
      </div>

    </div>
    
  );

}

//component for buttons and the function for the on click
function Button({onLogin}){
  return(
    <>
      <button onClick={onLogin} type='button'>Login</button>
      <br /><br />
    </>
  )
}



function App() { 

  return (
    <> 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/Home/*' element={<Home/>}/>
      </Routes>
      <Link to={"/Home/*"}></Link>
      <Link to={'/Profile'}></Link>
      <Link to={'/addCourses'}></Link>
      <Link to={'/courseWork'}></Link>
      <Link to={'/addCourseWork'}></Link>


    </BrowserRouter>
      
    </>
  )
}

 

export default App
