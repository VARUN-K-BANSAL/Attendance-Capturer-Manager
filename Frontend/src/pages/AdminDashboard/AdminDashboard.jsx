import React, {useState} from 'react'
import axios from "axios"

import Card from "../../components/Card/Card"
import Dashboard from '../Dashboard/Dashboard'
import Tables from "../../components/Tables/Table"

import classes from "./AdminDashboard.module.css"

function AdminDashboard() {

    // const [isActive , setIsActive] = useState(true);

    const [tableData, setTableData] = useState([]);
    const [columns , setColumns] = useState([]);

    const courseColumns = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Students",
            accessor: "students",
            Cell: ({value}) => {
                let count = value.length;
                // console.log("students = ",value);
                // console.log("students = ",count);

                return(
                    <div>{count}</div>
                );
            }
        },
        {
            Header: "Teachers",
            accessor: "teachers",
            Cell: ({value}) => {
                let count = value.length;
                // console.log("teachers = ",props.data);
                // console.log("teachers = ",count)

                return(
                    <div>{count}</div>
                );
            }
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: () => {
                return (<button>Remove Course</button>);
            }
        }

    ]

    const showCoursesHandler = async () => {
        try {
            const res = await axios.get("/getClasses")
            console.log(columns);
            console.log(res.data)
            setColumns(courseColumns);
            setTableData(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Dashboard>
                <h1>Admin Dashboard</h1>

                <Card>
                    {/* Buttons */}
                    <div className = {classes.adminActions}>
                        <button>Add new admin</button>
                        <button>Remove admin</button>
                    </div>

                    {/* Summary */}
                    <div className = {classes.summary}>
                        <div className={classes["card"]}>
                            <p>Number of Students</p>
                            <p>8</p>
                        </div>
                        <div className={classes["card"]}>
                            <p>Number of Students</p>
                            <p>8</p>
                        </div>
                        <div className={classes["card"]}>
                            <p>Number of Students</p>
                            <p>8</p>
                        </div>
                    </div>

                    {/* Tabs */}

                    <div className={classes["tabs"]}>
                        <div className={classes["menu"]}>
                            <input className = {classes["radio_input"]} type="radio" name="radio" id="student" />
                            <label className = {classes["radio_label"]} htmlFor="student">Students</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="teachers" />
                            <label className = {classes["radio_label"]} htmlFor="teachers">Teachers</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="Courses" />
                            <label className = {classes["radio_label"]} htmlFor="Courses" onClick = {showCoursesHandler}>Courses</label>

                            <input className = {classes["radio_input"]} type="radio" name="radio" id="admins" />
                            <label className = {classes["radio_label"]} htmlFor="admins">Admins</label>
                        </div>
                        <div className={classes["content"]}>
                            {(columns !== [])? <Tables data = {tableData} columns = {columns}/>: <h2>Loading...</h2>}
                        </div>
                    </div>
                </Card>
            </Dashboard>
        </div>
    )
}

export default AdminDashboard