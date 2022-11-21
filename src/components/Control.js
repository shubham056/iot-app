import React, { useState } from 'react'
import { Button, Switch } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Control = () => {
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
    const oneManualHandler = () => {
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
        <div className="container">
            <h2 style={{ textAlign: "center", margin: 20, color: "#5a5757" }}>Devices Controls</h2>
            <div className="row control-row">
                <div className="col-md-2 mb-3" style={{ marginTop: 13 }}>
                    <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Router</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Freezer</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Light</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="command-tab" data-toggle="tab" href="#command" role="tab" aria-controls="command" aria-selected="false">LED Device</a>
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
                                            <button onClick={oneManualHandler} className={`btn btn-secondary btn-sm ${stepOne.manual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Manual</button>
                                        </td>
                                        <td>
                                            <Switch {...label} defaultChecked />
                                        </td>
                                        <td>
                                            <button onClick={stepOneManualCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={oneHVACHandler} className={`btn btn-secondary btn-sm ${stepOne.HAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>HVAC</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Set Points
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='22.5' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={stepOneHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmHAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={oneTimerHandler} className={`btn btn-secondary btn-sm ${stepOne.timer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Timer</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Turn On
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='HH:MM' />
                                                </div>
                                            </div>
                                            <div className='row' style={{ marginTop: 5 }}>
                                                <div className='col-md-3'>
                                                    Turn Off
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='HH:MM' />
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <button onClick={stepOneTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={oneAlarmHandler} className={`btn btn-secondary btn-sm ${stepOne.alarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Alarm</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Alarm
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='22' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={stepOneAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
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
                                            <button onClick={twoManualHandler} className={`btn btn-secondary btn-sm ${stepTwo.manual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Manual</button>
                                        </td>
                                        <td>
                                            <Switch {...label} defaultChecked />
                                        </td>
                                        <td>
                                            <button onClick={stepTwoManualCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={twoHVACHandler} className={`btn btn-secondary btn-sm ${stepTwo.HAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>HVAC</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Set Points
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='22.5' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={stepTwoHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmHAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={twoTimerHandler} className={`btn btn-secondary btn-sm ${stepTwo.timer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Timer</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Turn On
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='HH:MM' />
                                                </div>
                                            </div>
                                            <div className='row' style={{ marginTop: 5 }}>
                                                <div className='col-md-3'>
                                                    Turn Off
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='HH:MM' />
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <button onClick={stepTwoTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={twoAlarmHandler} className={`btn btn-secondary btn-sm ${stepTwo.alarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Alarm</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Alarm
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='22' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={stepTwoAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
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
                                            <button onClick={threeManualHandler} className={`btn btn-secondary btn-sm ${stepThree.manual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Manual</button>
                                        </td>
                                        <td>
                                            <Switch {...label} defaultChecked />
                                        </td>
                                        <td>
                                            <button onClick={stepThreeManualCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={threeHVACHandler} className={`btn btn-secondary btn-sm ${stepThree.HAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>HVAC</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Set Points
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='22.5' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={stepThreeHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmHAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={threeTimerHandler} className={`btn btn-secondary btn-sm ${stepThree.timer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Timer</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Turn On
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='HH:MM' />
                                                </div>
                                            </div>
                                            <div className='row' style={{ marginTop: 5 }}>
                                                <div className='col-md-3'>
                                                    Turn Off
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='HH:MM' />
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <button onClick={stepThreeTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={threeAlarmHandler} className={`btn btn-secondary btn-sm ${stepThree.alarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Alarm</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Alarm
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='22' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={stepThreeAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
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
                                            <button onClick={fourManualHandler} className={`btn btn-secondary btn-sm ${stepFour.manual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Manual</button>
                                        </td>
                                        <td>
                                            <Switch {...label} defaultChecked />
                                        </td>
                                        <td>
                                            <button onClick={stepFourManualCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={fourHVACHandler} className={`btn btn-secondary btn-sm ${stepFour.HAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>HVAC</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Set Points
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='22.5' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={stepFourHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmHAVC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={fourTimerHandler} className={`btn btn-secondary btn-sm ${stepFour.timer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Timer</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Turn On
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='HH:MM' />
                                                </div>
                                            </div>
                                            <div className='row' style={{ marginTop: 5 }}>
                                                <div className='col-md-3'>
                                                    Turn Off
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='HH:MM' />
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <button onClick={stepFourTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={fourAlarmHandler} className={`btn btn-secondary btn-sm ${stepFour.alarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Alarm</button>
                                        </td>
                                        <td>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    Alarm
                                                </div>
                                                <div className='col-md-9'>
                                                    <input type="text" className='form-control' name='set_input' placeholder='22' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={stepFourAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Confirm</button>
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
    )
}

export default Control