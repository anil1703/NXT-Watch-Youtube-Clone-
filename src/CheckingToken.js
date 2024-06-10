import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const CheckingToken = props => {
  const check = Cookies.get('jwt_token')
  if (check === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default CheckingToken
