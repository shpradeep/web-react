import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserData() {
    const [userData, serUserData] = useState([]);

    useEffect(() => {
        const getUserData = async() => {
            const reqData = await fetch("http://127.0.0.1:5000/api/getall");
            if (reqData['status'] == 200) {
                const resData = await reqData.json();
                serUserData(resData.payload);
            }
        }

        getUserData();
    }, []);


    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="mt-2">UserData</h5>
                        <div className="d-grid d-md-flex justify-content-md-end mb-3">
                            <Link to="/adduser" className="btn btn-warning">Add New User</Link> 
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>DOB</th>
                                    <th>Mobile</th>
                                    <th>Registration Date</th>
                                    <th>Adhar</th>
                                    <th>Plan</th>
                                    <th>Plan Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { userData.map((userData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{userData.name}</td>
                                        <td>{userData.email}</td>
                                        <td>{userData.birthdate}</td>
                                        <td>{userData.mobile}</td>
                                        <td>{userData.registration_date}</td>
                                        <td>{userData.adhar_number}</td>
                                        <td>{userData.plan_name}</td>
                                        <td>{userData.plan_status == '1' ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            <Link to="renew_plan" className="btn-sm">Renew Plan</Link>
                                        </td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default UserData