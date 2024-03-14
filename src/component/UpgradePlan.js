import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpgradePlan() {

    const {id} = useParams();
    const [formvalue, setFormValue] = useState({ user_id: id, date:'', plan_id:'', plan:''});
    const [plan, setPlan] = useState('');

    useEffect(() => {
        const getUserData = async() => {
            const reqData = await fetch("http://127.0.0.1:5000/api/getplan/" + id);
            if (reqData['status'] == 200) {
                const resData = await reqData.json();
                setPlan(resData['payload'][0]['plan_name']);
            }
        }
        getUserData();
    }, []);

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setSubmit] = useState(false);
    
    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormValue({...formvalue, [name]:value});
    }

    const validate = (values) => {
        const errors = {};

        // console.log('Values: ' + values)
        if (!values.plan_id) {
            errors.plan_id = "Plan is required";
        }
        if (!values.plan) {
            errors.plan_status = "Plan Status is required";
        }
        if (!values.date) {
            errors.date = "Renewal Date is required";
        }
        return errors;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formvalue);
        setFormErrors(validate(formvalue));
        setSubmit(true);
        if (Object.keys(formErrors).length === 0) {
            const allInputvalue = {user_id: id, date: formvalue.date, plan_id: formvalue.plan_id, plan_status:formvalue.plan}
            await fetch("http://127.0.0.1:5000/api/update", {
                method: 'PUT',
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
                {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="success-msg ui message success">Plan has been upgraded successfully</div>
                ) : ''}
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="mt-2">Renew Plan</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Current Plan</label>
                                    <input type="text" name="myplan" className="form-control" value={plan} onChange={handleInput} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">New Plan</label>
                                    <select name="plan_id" className="form-control" value={formvalue.plan_id} onChange={handleInput}>
                                        <option value="">---Please Select Plan---</option>
                                        <option value="1">Platinum365</option>
                                        <option value="2">Gold180</option>
                                        <option value="3">Silver90</option>
                                    </select>
                                    <p className="error-msg">{formErrors.plan_id}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Renewal Date</label>
                                    <input type="date" name="date" className="form-control" value={formvalue.date} onChange={handleInput}/>
                                    <p className="error-msg">{formErrors.date}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
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
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label"></label>
                                    <button type="submit" className="btn btn-success btn-lg">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default UpgradePlan