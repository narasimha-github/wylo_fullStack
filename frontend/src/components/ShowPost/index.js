import {Link} from 'react-router-dom'
import './index.css'

const ShowPost = () => (
  <div className="container">
    <div className="const">
      <h1>Wellcome To Creation</h1>
      <Link to="/show">
        <button type="button" className="createButton">
          Go To Posts
        </button>
      </Link>
    </div>
  </div>
)

export default ShowPost