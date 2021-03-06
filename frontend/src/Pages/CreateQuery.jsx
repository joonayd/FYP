import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TopBar from '../Components/TopBar'
import SideMenuBack from '../Components/SideMenuBack'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userService from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import gymService from '../services/GymService'
import { Link } from 'react-router-dom'
import adminService from '../services/AdminService'
import { Button } from 'react-bootstrap'
import SideMenu from '../Components/SideMenu'
import SideMenuTrainer from '../Components/SideMenuTrainer'
import SideMenuGym from '../Components/SideMenuGym'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const querySchema = yup.object().shape({
  query_subject: yup
    .string()
    .min(6, 'Subject must be at least 6 characters!')
    .required("query subject can't be empty"),
  query_desc: yup
    .string()
    .min(20, 'Description must be at least 20 characters!')
    .required("query description can't be empty"),
})

const CreateQuery = () => {
  const navigate = useNavigate()
  const [loggedInId, setLoggedInId] = useState('')
  const [user, setUser] = useState('')
  const [users, setUsers] = useState('')
  const [allQueries, setAllQueries] = useState([])
  // var users = "";
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  var adminId = '6266eb268caccab814c54c85'

  function tawk() {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date()
    ;(function () {
      var s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('script')[0]
      s1.async = true
      s1.src = 'https://embed.tawk.to/62a8451fb0d10b6f3e773c1b/1g5gks1i3'
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      s0.parentNode.insertBefore(s1, s0)
    })()
  }

  const notify = () => {
    // Calling toast method by passing string
    toast.success('Query Added')
  }
  const user_type = userService.getLoggedInUser().user_type
  var loginId = ''
  var queryDetails = {
    user_id: '',
    user_type: '',
    query_subject: '',
    query_desc: [],
    // query_response: "?",
  }
  const handleRouteQuery = (e) => {
    console.log(e)
    navigate('/user-query-details', { state: { e } })
  }
  useEffect(() => {
    setLoggedInId(userService.getLoggedInUser()._id)
    setUsers(adminService.getLoggedInUser())
    console.log(users)

    if (userService.isLoggedIn() == false) {
      navigate('/login')
      // console.log("log in first");
    }
    adminService
      .get_user_queries(userService.getLoggedInUser()._id)
      .then((data) => {
        console.log(data)
        setAllQueries(data.crud)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [loginId])

  const {
    register: controlQuery,
    handleSubmit: handleSubmitQuery,
    formState: { errors: errorsQuery },
  } = useForm({
    resolver: yupResolver(querySchema),
  })

  const page_refresh = () => {
    window.location.reload(true)
  }

  const submitQueryForm = (data) => {
    console.log('before request')
    // let arr = [];
    let tempObject = {
      query_text: data.query_desc,
      query_response: '?',
    }
    queryDetails.query_desc.push(tempObject)
    console.log(
      'array after concatination of temp obj = ',
      queryDetails.query_desc
    )
    queryDetails = {
      ...queryDetails,
      user_id: users._id,
      user_type: users.user_type,
      query_subject: data.query_subject,
      // query_desc: [],
    }

    adminService
      .add_query(queryDetails)
      .then((data) => {
        console.log(data)
        setEditModalOpen(false)
        notify()
      })
      .catch((err) => {
        console.log(err)
      })
    console.log(queryDetails)
    console.log('after request')
    // page_refresh();
  }
  function createConversation() {
    console.log(convo)
    userService.createConvo(convo).then((data) => {
      console.log(data)
    })
    navigate('/Messenger')
  }
  var convo = {
    senderId: userService.getLoggedInUser()._id,
    receiverId: adminId,
  }

  return (
    <div className='page-container-admin'>
      <TopBar />
      {user_type == 'customer' ? (
        <SideMenu />
      ) : user_type == 'trainer' ? (
        <SideMenuTrainer />
      ) : user_type == 'gym' ? (
        <SideMenuGym />
      ) : (
        <SideMenuBack />
      )}

      <h3 id='gym-reqs'>Your Queries</h3>
      <div className='admin-box mt-3'>
        <div className='user-box d-flex flex-column p-3'>
          <div className='d-flex flex-column'>
            {/* <Button
              className='mt-5'
              onClick={() => {
                createConversation()
              }}
            >
              Message
            </Button> */}
            <div class='table-wrapper-scroll-y my-custom-scrollbar'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Query Id</th>
                    <th>Query Subject</th>

                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allQueries.length == 0 ? (
                    <tr>
                      <td>No Queries</td>
                    </tr>
                  ) : (
                    allQueries.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{e.query_subject}</td>
                          {e.query_response === '?' ? (
                            <td>Pending...</td>
                          ) : (
                            <td>Completed</td>
                          )}
                          <td>
                            <div className='d-flex align-items-center'>
                              <Button
                                onClick={(event) => {
                                  handleRouteQuery(e)
                                }}
                              >
                                Details
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex align-items-center'>
        <Button
          className='m-3'
          onClick={() => {
            setEditModalOpen(true)
          }}
        >
          Add Query
        </Button>
        <div className='modal-container'>
          <Modal
            style={{
              overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,

                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
              content: {
                color: 'white',
                position: 'absolute',
                top: '40px',
                left: '40px',
                right: '40px',
                bottom: '40px',
                background: 'rgba(0,30,60,1)',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '1rem',
                outline: 'none',
                padding: '20px',
              },
            }}
            className='w-50 d-flex flex-column justify-content-around align-items-center add-food-modal'
            isOpen={editModalOpen}
            onRequestClose={() => {
              setEditModalOpen(false)
            }}
          >
            <div className='modal-inner w-75 d-flex flex-column'>
              <a
                onClick={() => {
                  setEditModalOpen(false)
                }}
              >
                <i class='bx bx-x'></i>
              </a>

              <div className='query-box mt-3 d-flex flex-column align-items-left'>
                <form
                  onSubmit={handleSubmitQuery(submitQueryForm)}
                  className='d-flex flex-column'
                >
                  <div className='input-text d-flex flex-column'>
                    <label for=''>Query Subject</label>
                    <input
                      type='text'
                      name='query_subject'
                      {...controlQuery('query_subject')}
                    />
                    <p>{errorsQuery.query_subject?.message}</p>
                  </div>
                  <label for=''>Description</label>
                  <textarea
                    className='text-field mt-2'
                    name='query_desc'
                    {...controlQuery('query_desc')}
                  />
                  <p>{errorsQuery.query_desc?.message}</p>
                  <Button className='w-50' type='submit '>
                    Submit Query
                  </Button>
                </form>
              </div>
            </div>
            <div></div>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default CreateQuery
