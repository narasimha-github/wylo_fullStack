import {useState} from 'react'
import './index.css'

const EachPost = props => {
  const {posts, changeState, changeInput, editList} = props
  const {input, text, isActive, id} = posts
  const [editText, setEditText] = useState(text)
  const cap = input[0].toUpperCase()

  const onBlurchange = () => {
    changeState(id)
  }

  const changeBt = () => {
    changeInput(id)
  }

  const changrEditText = event => {
    setEditText(event.target.value)
    editList(id, event.target.value)
  }

  return (
    <div className="cont">
      <div className="clim">
        <h3 className="c cm">{cap}</h3>
        <h4 className="c">{input}</h4>
      </div>
      <hr />
      {isActive ? (
        <textarea
        onBlur={onBlurchange}
        value={editText}
        onChange={changrEditText}
        className="text-setings"
      />
      ) : (
        <p className="c">{text}</p>
      )}
      <button type="button" className="c bmw" onClick={changeBt}>
        edit
      </button>
    </div>
  )
}

export default EachPost