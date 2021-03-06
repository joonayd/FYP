import GenericService from './GenericService'
import jwtDecode from 'jwt-decode'
class AdminService extends GenericService {
  constructor() {
    super()
  }
  login = (email, password, role) =>
    new Promise((resolve, reject) => {
      this.post('admin/adminlogin', { email, password })
        .then((token) => {
          localStorage.setItem('token', token)
          resolve(token)
        })
        .catch((err) => {
          reject(err)
        })
    })
  get_all_queries = () => this.get('query/getquery')
  get_user_queries = (id) => this.get('query/user/' + id)
  add_query = (queryDetails) => this.post('query/addquery', queryDetails)
  admin_message = () => this.get('/notification/getNotification')
  update_query = (queryDetails, id) => this.patch('query/' + id, queryDetails)
  update_withdraw = (id,withdrawDetails) => this.patch('withdraw/update/' + id, withdrawDetails)
  get_withdraw = ()=>this.get("withdraw")
  get_withdraw_request = (id)=>this.get("withdraw/"+id)
  isLoggedIn = () => {
    return localStorage.getItem('token') ? true : false
  }
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem('token')
      return jwtDecode(jwt)
    } catch (ex) {
      return null
    }
  }
  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == 'admin') return true
      else return false
    } else return false
  }
}

let adminService = new AdminService()
export default adminService
