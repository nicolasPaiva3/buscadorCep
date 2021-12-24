import './styles/app.css'
import { FcSearch } from "@react-icons/all-files/fc/FcSearch";
import {useState} from 'react'
import { toast } from 'react-toastify';
import api from './services/api'
function App() {
  const [input,setInput] = useState('')
  const [cep,setCep] = useState({})
  async function handleSearch() {
      if(input === '') {
        //alert('error')
        toast.success('digite algo no input')
          
        return
      }

    try {
      const response = await api.get(`${input}/json/`)
      
      setCep(response.data)
      setInput('')

    }catch {
      alert('error')
      setInput('')
    
    }



  }
  return (



    <div className="container">
     <h1 className='title'>search CEP </h1>


     <div className='containerInput'>
      <input
      type='text'
      placeholder=' type your CEP'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
        <button className='buttonSearch' onClick={handleSearch}>
         
          <FcSearch size={25} color='#fff'/>

      </button>

     </div>

    {Object.keys(cep).length > 0 && (
      <main className='main'>
      <h2>CEP: {cep.cep}</h2>
      <span>Rua: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>




   </main>
    )}
     
    </div>
  );
}

export default App;
