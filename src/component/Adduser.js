import React, { useEffect, useState } from "react";

function Adduser() {

    const [formvalue, setFormValue] = useState({username:'', dob:'', email:'', adhar:'', date:'', mobile:'', plan_id:'', plan:''});
    // const [msg, setMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setSubmit] = useState(false);
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormValue({...formvalue, [name]:value});
    }

    const validate = (values) => {
        const errors = {};
        const regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const regMobile = /^\d{10}$/;

        // console.log('Values: ' + values)
        if (!values.username) {
            errors.username = "Username is required";
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regEmail.test(values.email)) {
            errors.email = "This is not a valid Email";
        }
        if (!values.username) {
            errors.username = "Name is required";
        }
        if (!values.dob) {
            errors.dob = "Date of Birth is required";
        }
        if (!values.adhar) {
            errors.adhar = "Adhar Number is required";
        }
        if (!values.mobile) {
            errors.mobile = "Mobile Number is required";
        } else if (!regMobile.test(values.mobile)) {
            errors.mobile = "This is not a valie Mobile Number";
        }
        if (!values.plan) {
            errors.plan_status = "Plan Status is required";
        }
        if (!values.date) {
            errors.date = "Registration Date is required";
        }
        return errors;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formvalue));
        setSubmit(true);
        if (Object.keys(formErrors).length === 0) {
            const allInputvalue = {username: formvalue.username, dob:formvalue.dob, email:formvalue.email, adhar: formvalue.adhar, date: formvalue.date, mobile:formvalue.mobile, plan_id:formvalue.plan_id, plan_status:formvalue.plan}
            await fetch("http://127.0.0.1:5000/api/adduser", {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(allInputvalue)
            })
            // .then(res => setMessage("Customer added successfully !"))
            .catch(error => {
                console.log(error.response.data.message);
            });
        }
    }

    return (
        <React.Fragment>
            <div className="container">
                {/* <p className="success-msg">{msg}</p> */}
                {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="success-msg ui message success">Customer Created successfully</div>
                ) : ''}
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="mt-2">Add New Customer</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" name="username" className="form-control" value= {formvalue.username} onChange={handleInput} />
                                        <p className="error-msg">{formErrors.username}</p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label">DOB</label>
                                        <input type="date" name="dob" className="form-control" value={formvalue.dob} onChange={handleInput} />
                                        <p className="error-msg">{formErrors.dob}</p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="text" name="email" className="form-control" value={formvalue.email} onChange={handleInput}/>
                                        <p className="error-msg">{formErrors.email}</p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label">Adhar Number</label>
                                        <input type="text" name="adhar" className="form-control" value={formvalue.adhar} onChange={handleInput}/>
                                        <p className="error-msg">{formErrors.adhar}</p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label">Registration Date</label>
                                        <input type="date" name="date" className="form-control" value={formvalue.date} onChange={handleInput}/>
                                        <p className="error-msg">{formErrors.date}</p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label">Assigned Mobile Number</label>
                                        <input type="text" name="mobile" className="form-control" value={formvalue.moibile} onChange={handleInput}/>
                                        <p className="error-msg">{formErrors.mobile}</p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label">Plan</label>
                                        <select name="plan_id" className="form-control" value={formvalue.plan_id} onChange={handleInput}>
                                            <option value="">---Please Select Plan---</option>
                                            <option value="1">Platinum365</option>
                                            <option value="2">Gold180</option>
                                            <option value="3">Silver90</option>
                                        </select>
                                        {/* <input type="text" name="myplan" className="form-control" value="Default-Plan/200$/exp/DEC-2024" onChange={handleInput} readOnly/> */}
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label">Plan Status</label>
                                        <select name="plan" className="form-control" value={formvalue.plan} onChange={handleInput}>
                                            <option value="">---Please Select---</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                        <p className="error-msg">{formErrors.plan_status}</p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="mb-3">
                                        <label className="form-label"></label>
                                        <button type="submit" className="btn btn-success btn-lg">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Adduser