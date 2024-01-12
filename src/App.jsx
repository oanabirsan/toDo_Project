import { useState } from 'react'

import './App.css'

function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false
        },
      ]
    })
    setNewItem("")

  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }



  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <div>
          <p htmlFor='item'>Adauga element pe lista!</p>
          <input value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type='text' id='item' />
        </div>
        <button className='addButton'>adauga</button>
      </form>
      <h1>De Facut:</h1>
      <ul className='listStyle'>
        {todos.length === 0 && "Nimic de facut"}
        {todos.map(todo => {
          return (
            <li className='list'>
              <label className='listText'>
                <input type='checkbox' checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button className='deleteButton' onClick={() => deleteTodo(todo.id)}>sterge</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
