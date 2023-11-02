
import { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`

interface Item {
  id: ItemId
  timestamp: number
  text: string
}
const inicial_items: Item[] = [
{
  id: crypto.randomUUID(),
  timestamp:  Date.now(),
  text: 'zapatillas'
}, 
{
  id:crypto.randomUUID(),
  timestamp:  Date.now(),
  text:'pantalones', 
}
]

function App() {
  const [items, setItems] = useState (inicial_items)
  
  const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if(!isInput || input == null) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value, 
      timestamp: Date.now()

    }
    setItems((prevItems) => {
      return [...prevItems, newItem]
    })
    input.value = ''

    const createHandleRemoveItem = (id:ItemId) => () => {
      setItems(prevItems => {
        return prevItems.filter(currentItems => currentItems.id !== id)
      })
    }

  }
 

  return (
    <>
     <main>
      <aside>
      <h1>Prueba técnica de React</h1>
      <h2>Añadir y eliminar elementos de una lista</h2>
        <div className='container'>
          <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Introducir Elementos:
            <div className='input1'>
           <input 
           type="text"
           name='item'
           required
           placeholder='Ej: Zapatillas'
            /> </div>
          </label>
          <button>Agregar Elemento</button>
        </form>
        </div>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {
            items.map(item => {
              return (
                <li key={item.id}>
                  {item.text}
                  <button onClick={() => { 
                    setItems(prevItems => {
                      return prevItems.filter(currentItems => currentItems.id !== item.id) 
                    })
                    
                  }}>
                    Eliminar
                  </button>
                </li>
              )
            })
          }
          

        </ul>
      </section>
     </main>
    </>
  )
}

export default App
