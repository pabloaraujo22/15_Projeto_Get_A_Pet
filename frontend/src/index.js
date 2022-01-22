import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render( 
    <React.StrictMode >
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)


//React Router dom v6
//Nao existe Redirect e no lugar usa o Route
//<Route path="/alluser" element={<Navigate to="/users"}/>

//Switch não existe mais no lugar utilizar o Routes
//Não Utiliza o exact
/*<Routes>
    <Route path="/" element={<Home/>}/>

    //userNavigation
    //antes
   import { useHistory } from 'react-router-dom'

function Users() {
  const history = useHistory()

  function handleClick() {
    history.push('/')
  }

  return (
    <section>
      <p>
        Voltar para a <button onClick={handleClick}>Home</button>
      </p>
      <h1>Users</h1>
    </section>
  )
}


//depois
mport { useNavigate } from 'react-router-dom'

function Users() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }

  return (
    <section>
      <p>
        Voltar para a <button onClick={handleClick}>Home</button>
      </p>
      <h1>Users</h1>
    </section>
  )
}
</Routes>*/

