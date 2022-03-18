import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";


const AddFood = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="page-container-user">

      <TopBar />
      <SideMenu />

      <h2>Add Food</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4>Calories Gained:</h4>
              <h4>Calories Burnt:</h4>
              <h4>Net Calories:</h4>
              <h4>Calorie Goal:</h4>
            </div>
            {/* <div className="d-flex justify-content-around align-items-end w-50">
              <Button>Add Food</Button>
              <Button>Add Exercise</Button>
              <Button>Add Water<c/Button>
            </div> */}
          </div>
          <div className="d-flex flex-column mt-3"></div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">Today's Meals</h2>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          className="m-3"
        >
          + Add Food
        </Button>
      </div>
      <div className="modal-container">
        <Modal
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,

              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              color: "white",
              position: "absolute",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              background: "rgba(0,30,60,1)",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "1rem",
              outline: "none",
              padding: "20px",
            },
          }}
          className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
          isOpen={modalOpen}
          onRequestClose={() => {
            setModalOpen(false);
          }}
        >
          <div className="modal-inner w-75 d-flex flex-column">
            <a
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <i class="bx bx-x"></i>
            </a>
            <FormControl className="m-3 w-100 dropdown-modal">
              <InputLabel id="demo-simple-select-label">Select Meal</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                <MenuItem value="lbs">Breakfast</MenuItem>
                <MenuItem value="kgs">Lunch</MenuItem>
                <MenuItem value="kgs">Dinner</MenuItem>
                <MenuItem value="kgs">Snacks</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="m-3 w-100 dropdown-modal">
              <InputLabel id="demo-simple-select-label">Select Food</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                <MenuItem value="lbs">egg</MenuItem>
                <MenuItem value="kgs">bread</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="m-3 w-100 dropdown-modal">
              <InputLabel id="demo-simple-select-label">Select Quantity</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                <MenuItem value="lbs">100g</MenuItem>
                <MenuItem value="kgs">200g</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button type="submit ">Add Food</Button>
          </div>
        </Modal>
      </div>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table">
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Calories Gained</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Breakfast</td>
                  <td>Paratha</td>
                  <td>2</td>
                  <td>500</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        className="btn btn-warning edit-btn"
                        onClick={() => {
                          setEditModalOpen(true);
                        }}
                      >
                        Edit{" "}
                      </Button>
                      <div className="modal-container">
                        <Modal
                          style={{
                            overlay: {
                              position: "fixed",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,

                              backgroundColor: "rgba(0, 0, 0, 0.75)",
                            },
                            content: {
                              color: "white",
                              position: "absolute",
                              top: "40px",
                              left: "40px",
                              right: "40px",
                              bottom: "40px",
                              background: "rgba(0,30,60,1)",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "1rem",
                              outline: "none",
                              padding: "20px",
                            },
                          }}
                          className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                          isOpen={editModalOpen}
                          onRequestClose={() => {
                            setEditModalOpen(false);
                          }}
                        >
                          <div className="modal-inner w-75 d-flex flex-column">
                            <a
                              onClick={() => {
                                setEditModalOpen(false);
                              }}
                            >
                              <i class="bx bx-x"></i>
                            </a>
                            <FormControl className="m-3 w-100 dropdown-modal">
                              <InputLabel id="demo-simple-select-label">Select Meal</InputLabel>
                              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value="lbs">Breakfast</MenuItem>
                                <MenuItem value="kgs">Lunch</MenuItem>
                                <MenuItem value="kgs">Dinner</MenuItem>
                                <MenuItem value="kgs">Snacks</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl className="m-3 w-100 dropdown-modal">
                              <InputLabel id="demo-simple-select-label">Select Food</InputLabel>
                              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value="lbs">egg</MenuItem>
                                <MenuItem value="kgs">bread</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl className="m-3 w-100 dropdown-modal">
                              <InputLabel id="demo-simple-select-label">Select Quantity</InputLabel>
                              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value="lbs">100g</MenuItem>
                                <MenuItem value="kgs">200g</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div>
                            <Button type="submit ">Add Food</Button>
                          </div>
                        </Modal>
                      </div>
                      <a
                        className="delete-icon"
                        onClick={() => {
                          setConfirmDelete(true);
                        }}
                      >
                        <ImCross />
                      </a>
                      <div className="modal-container">
                        <Modal
                          style={{
                            overlay: {
                              position: "fixed",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,

                              backgroundColor: "rgba(0, 0, 0, 0.75)",
                            },
                            content: {
                              color: "white",
                              position: "absolute",
                              top: "40px",
                              left: "40px",
                              right: "40px",
                              bottom: "40px",
                              background: "rgba(0,30,60,1)",
                              overflow: "auto",
                              WebkitOverflowScrolling: "touch",
                              borderRadius: "1rem",
                              outline: "none",
                              padding: "20px",
                            },
                          }}
                          className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                          isOpen={confirmDelete}
                          onRequestClose={() => {
                            setConfirmDelete(false);
                          }}
                        >
                          <div className="modal-inner w-75 d-flex flex-column">
                            <a
                              onClick={() => {
                                setConfirmDelete(false);
                              }}
                            >
                              <i class="bx bx-x"></i>
                            </a>
                            <h3>Are you sure you want to delete the food?</h3>
                            <p>Select yes to delete the item</p>
                          </div>
                          <div className="d-flex">
                            <Button className="btn-dark m-3" type="submit ">
                              Yes
                            </Button>
                            <Button className="m-3" type="submit ">
                              No
                            </Button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Breakfast</td>
                  <td>Paratha</td>
                  <td>2</td>
                  <td>500</td>
                  <td>
                    <Button className="btn btn-warning edit-btn">Edit </Button>
                    <ImCross className="delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>Breakfast</td>
                  <td>Paratha</td>
                  <td>2</td>
                  <td>500</td>
                  <td>
                    <Button className="btn btn-warning edit-btn">Edit </Button>
                    <ImCross className="delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>Breakfast</td>
                  <td>Paratha</td>
                  <td>2</td>
                  <td>500</td>
                  <td>
                    <Button className="btn btn-warning edit-btn">Edit </Button>
                    <ImCross className="delete-icon" />
                  </td>
                </tr>
                <tr>
                  <td>Breakfast</td>
                  <td>Paratha</td>
                  <td>2</td>
                  <td>500</td>
                  <td>
                    <Button className="btn btn-warning edit-btn">Edit </Button>
                    <ImCross className="delete-icon" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
