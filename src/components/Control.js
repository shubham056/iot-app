import React, { useState } from 'react'
import { Button, Switch } from '@mui/material'
import { TimePicker } from 'react-ios-time-picker';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import moment from 'moment-timezone';


const label = { inputProps: { 'aria-label': 'Switch demo' } };


const Control = () => {
    let dt = moment();
    dt.format("HH:mm")
    const [value, setValues] = useState(dt.format("HH:mm"))
    const [isLoading, setisLoading] = useState(false)
    const [firstDeviceName, setfirstDeviceName] = useState("Device 1")
    const [secondDeviceName, setsecondDeviceName] = useState("Device 2")
    const [thirdDeviceName, setthirdDeviceName] = useState("Device 3")
    const [fourthDeviceName, setfourthDeviceName] = useState("Device 4")

    const [open, setOpen] = useState(false);
    const onOpenModal = (val, stateName) => {
        setOpen(true);
        setValue("state_name", stateName)
        setValue("device_name", val)

    }
    const onCloseModal = () => setOpen(false);

    const onChange = (timeValue) => {
        setValues(timeValue);
    }
    const profileSchema = Yup.object().shape({
        device_name: Yup.string().required('Device name is required.'),
    });
    const formOptions = { resolver: yupResolver(profileSchema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, } = useForm(formOptions);

    //submit handler
    const onSubmit = formValue => {
        console.log(formValue)
        const { state_name, device_name } = formValue
        if (state_name === "firstDeviceName") {
            setfirstDeviceName(device_name)
        } if (state_name === "secondDeviceName") {
            setsecondDeviceName(device_name)
        } if (state_name === "thirdDeviceName") {
            setthirdDeviceName(device_name)
        } if (state_name === "fourthDeviceName") {
            setfourthDeviceName(device_name)
        }
        setOpen(false)
    }
    const [stepOne, setstepOne] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        timer: false,
        alarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
    })
    const [stepTwo, setstepTwo] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        timer: false,
        alarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
    })
    const [stepThree, setstepThree] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        timer: false,
        alarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
    })
    const [stepFour, setstepFour] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        timer: false,
        alarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
    })

    //StepOne tab handler
    const oneManualHandler = (prevState ) => {
        console.log("prevState ",prevState )
        console.log("state ",stepOne )
        setstepOne({
            ...stepOne,
            manual: !setstepOne.manual
        })
    }
    const oneHVACHandler = () => {
        setstepOne({
            ...stepOne,
            HAVC: !setstepOne.HAVC
        })
    }
    const oneTimerHandler = () => {
        setstepOne({
            ...stepOne,
            timer: !setstepOne.timer
        })
    }
    const oneAlarmHandler = () => {
        setstepOne({
            ...stepOne,
            alarm: !setstepOne.alarm
        })
    }
    //StepTwo tab handler
    const twoManualHandler = () => {
        setstepTwo({
            ...stepTwo,
            manual: !setstepTwo.manual
        })
    }
    const twoHVACHandler = () => {
        setstepTwo({
            ...stepTwo,
            HAVC: !setstepTwo.HAVC
        })
    }
    const twoTimerHandler = () => {
        setstepTwo({
            ...stepTwo,
            timer: !setstepTwo.timer
        })
    }
    const twoAlarmHandler = () => {
        setstepTwo({
            ...stepTwo,
            alarm: !setstepTwo.alarm
        })
    }
    //StepThree tab handler
    const threeManualHandler = () => {
        setstepThree({
            ...stepThree,
            manual: !stepThree.manual
        })
    }
    const threeHVACHandler = () => {
        setstepThree({
            ...stepThree,
            HAVC: !stepThree.HAVC
        })
    }
    const threeTimerHandler = () => {
        setstepThree({
            ...stepThree,
            timer: !stepThree.timer
        })
    }
    const threeAlarmHandler = () => {
        setstepThree({
            ...stepThree,
            alarm: !stepThree.alarm
        })
    }
    //StepFourth tab handler
    const fourManualHandler = () => {
        setstepFour({
            ...stepFour,
            manual: !stepFour.manual
        })
    }
    const fourHVACHandler = () => {
        setstepFour({
            ...stepFour,
            HAVC: !stepFour.HAVC
        })
    }
    const fourTimerHandler = () => {
        setstepFour({
            ...stepFour,
            timer: !stepFour.timer
        })
    }
    const fourAlarmHandler = () => {
        setstepFour({
            ...stepFour,
            alarm: !stepFour.alarm
        })
    }

    //StepOne Confirm Handlers
    const stepOneManualCfmHandler = () => {
        setstepOne({
            ...stepOne,
            confirmManual: !setstepOne.confirmManual
        })
    }
    const stepOneHVACCfmHandler = () => {
        setstepOne({
            ...stepOne,
            confirmHAVC: !setstepOne.confirmHAVC
        })
    }
    const stepOneTimerCfmHandler = () => {
        setstepOne({
            ...stepOne,
            confirmTimer: !setstepOne.confirmTimer
        })
    }
    const stepOneAlarmCfmHandler = () => {
        setstepOne({
            ...stepOne,
            confirmAlarm: !setstepOne.confirmAlarm
        })
    }
    //StepTwo Confirm Handler
    const stepTwoManualCfmHandler = () => {
        setstepTwo({
            ...stepTwo,
            confirmManual: !setstepTwo.confirmManual
        })
    }
    const stepTwoHVACCfmHandler = () => {
        setstepTwo({
            ...stepTwo,
            confirmHAVC: !setstepTwo.confirmHAVC
        })
    }
    const stepTwoTimerCfmHandler = () => {
        setstepTwo({
            ...stepTwo,
            confirmTimer: !setstepTwo.confirmTimer
        })
    }
    const stepTwoAlarmCfmHandler = () => {
        setstepTwo({
            ...stepTwo,
            confirmAlarm: !setstepTwo.confirmAlarm
        })
    }
    //StepThree Confirm Handler
    const stepThreeManualCfmHandler = () => {
        setstepThree({
            ...stepThree,
            confirmManual: !setstepThree.confirmManual
        })
    }
    const stepThreeHVACCfmHandler = () => {
        setstepThree({
            ...stepThree,
            confirmHAVC: !setstepThree.confirmHAVC
        })
    }
    const stepThreeTimerCfmHandler = () => {
        setstepThree({
            ...stepThree,
            confirmTimer: !setstepThree.confirmTimer
        })
    }
    const stepThreeAlarmCfmHandler = () => {
        setstepThree({
            ...stepThree,
            confirmAlarm: !setstepThree.confirmAlarm
        })
    }
    //StepFour Confirm Handler
    const stepFourManualCfmHandler = () => {
        setstepFour({
            ...stepFour,
            confirmManual: !setstepFour.confirmManual
        })
    }
    const stepFourHVACCfmHandler = () => {
        setstepFour({
            ...stepFour,
            confirmHAVC: !setstepFour.confirmHAVC
        })
    }
    const stepFourTimerCfmHandler = () => {
        setstepFour({
            ...stepFour,
            confirmTimer: !setstepFour.confirmTimer
        })
    }
    const stepFourAlarmCfmHandler = () => {
        setstepFour({
            ...stepFour,
            confirmAlarm: !setstepFour.confirmAlarm
        })
    }

    return (
        <>
            <div className="container">
                <h2 style={{ textAlign: "center", margin: 20, color: "#5a5757" }}>Devices Controls</h2>
                <div className="row control-row">
                    <div className="col-md-2 mb-3" style={{ marginTop: 13 }}>
                        <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{firstDeviceName}</a>
                                <a onClick={() => onOpenModal(firstDeviceName, "firstDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">{secondDeviceName}</a>
                                <a onClick={() => onOpenModal(secondDeviceName, "secondDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">{thirdDeviceName}</a>
                                <a onClick={() => onOpenModal(thirdDeviceName, "thirdDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="command-tab" data-toggle="tab" href="#command" role="tab" aria-controls="command" aria-selected="false">{fourthDeviceName}</a>
                                <a onClick={() => onOpenModal(fourthDeviceName, "fourthDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
                            </li>
                        </ul>
                    </div>
                    {/* /.col-md-4 */}
                    <div className="col-md-10">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <table class="table table-hover">

                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={oneManualHandler} className={`btn btn-secondary btn-sm ${stepOne.manual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked />
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepOneManualCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmManual ? 'active-dc-btn' : null}`}  style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={oneHVACHandler} className={`btn btn-secondary btn-sm ${stepOne.HAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input type="number" className='form-control' name='set_input' placeholder='22.5' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepOneHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmHAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={oneTimerHandler} className={`btn btn-secondary btn-sm ${stepOne.timer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker onChange={onChange} value={value} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3'>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker onChange={onChange} value={value} className="form-control" />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepOneTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={oneAlarmHandler} className={`btn btn-secondary btn-sm ${stepOne.alarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input type="number" className='form-control' name='set_input' placeholder='22' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepOneAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <table class="table table-hover">

                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={twoManualHandler} className={`btn btn-secondary btn-sm ${stepTwo.manual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked />
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepTwoManualCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={twoHVACHandler} className={`btn btn-secondary btn-sm ${stepTwo.HAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input type="number" className='form-control' name='set_input' placeholder='22.5' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepTwoHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmHAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={twoTimerHandler} className={`btn btn-secondary btn-sm ${stepTwo.timer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker onChange={onChange} value={value} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3'>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker onChange={onChange} value={value} className="form-control" />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepTwoTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={twoAlarmHandler} className={`btn btn-secondary btn-sm ${stepTwo.alarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input type="number" className='form-control' name='set_input' placeholder='22' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepTwoAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <table class="table table-hover">

                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={threeManualHandler} className={`btn btn-secondary btn-sm ${stepThree.manual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked />
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepThreeManualCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={threeHVACHandler} className={`btn btn-secondary btn-sm ${stepThree.HAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input type="number" className='form-control' name='set_input' placeholder='22.5' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepThreeHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmHAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={threeTimerHandler} className={`btn btn-secondary btn-sm ${stepThree.timer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker onChange={onChange} value={value} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3'>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker onChange={onChange} value={value} className="form-control" />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepThreeTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={threeAlarmHandler} className={`btn btn-secondary btn-sm ${stepThree.alarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input type="number" className='form-control' name='set_input' placeholder='22' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepThreeAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="command" role="tabpanel" aria-labelledby="command-tab">
                                <table class="table table-hover">

                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={fourManualHandler} className={`btn btn-secondary btn-sm ${stepFour.manual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked />
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepFourManualCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={fourHVACHandler} className={`btn btn-secondary btn-sm ${stepFour.HAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input type="number" className='form-control' name='set_input' placeholder='22.5' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepFourHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmHAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={fourTimerHandler} className={`btn btn-secondary btn-sm ${stepFour.timer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker onChange={onChange} value={value} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3'>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                    <TimePicker onChange={onChange} value={value} className="form-control" />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepFourTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" onClick={fourAlarmHandler} className={`btn btn-secondary btn-sm ${stepFour.alarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3'>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input type="number" className='form-control' name='set_input' placeholder='22' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" onClick={stepFourAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* /.col-md-8 */}
                </div>
            </div>

            <Modal open={open} onClose={onCloseModal} center>
                <h4 style={{ textAlign: 'center' }}>Edit Device Name</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input type="hidden" {...register("state_name")} />
                        <input
                            type="text"
                            {...register("device_name")}
                            placeholder="Enter device name"
                            className={`form-control ${errors.device_name ? 'is-invalid' : ''}`}
                            autoComplete="off"
                        />
                        <span style={{ color: 'red' }}>{errors.device_name?.message}</span>

                    </div>

                    {
                        isLoading
                            ?
                            <button style={{ width: "100%" }} className="btn btn-primary">Update...  <div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                            </button>

                            :
                            <button style={{ width: "100%" }} type='submit' className="btn btn-primary">Update</button>
                    }

                </form>
            </Modal>
        </>
    )
}

export default Control

const editButtonIcon = {
    float: 'right',
    marginTop: -35,
    marginRight: 5,
    color: 'white'
}