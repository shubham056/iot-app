import React, { useState } from 'react'
import { Button, Switch } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Control = () => {
    const [oneManual, setoneManual] = useState(false)
    const [oneHVAC, setoneHVAC] = useState(false)
    const [oneTimer, setoneTimer] = useState(false)
    const [oneAlarm, setoneAlarm] = useState(false)

    const [twoManual, settwoManual] = useState(false)
    const [twoHVAC, settwoHVAC] = useState(false)
    const [twoTimer, settwoTimer] = useState(false)
    const [twoAlarm, settwoAlarm] = useState(false)

    const [threeManual, setthreeManual] = useState(false)
    const [threeHVAC, setthreeHVAC] = useState(false)
    const [threeTimer, setthreeTimer] = useState(false)
    const [threeAlarm, setthreeAlarm] = useState(false)

    const [fourManual, setfourManual] = useState(false)
    const [fourHVAC, setfourHVAC] = useState(false)
    const [fourTimer, setfourTimer] = useState(false)
    const [fourAlarm, setfourAlarm] = useState(false)
    //First tab handler
    const oneManualHandler = () => {
        setoneManual(!oneManual)
    }
    const oneHVACHanlder = () => {
        setoneHVAC(!oneHVAC)
    }
    const oneTimerHandler = () => {
        setoneTimer(!oneTimer)
    }
    const oneAlarmHandler = () => {
        setoneAlarm(!oneAlarm)
    }
    //Second tab handler
    const twoManualHandler = () => {
        settwoManual(!twoManual)
    }
    const twoHVACHanlder = () => {
        settwoHVAC(!twoHVAC)
    }
    const twoTimerHandler = () => {
        settwoTimer(!twoTimer)
    }
    const twoAlarmHandler = () => {
        settwoAlarm(!twoAlarm)
    }
    //Three tab handler
    const threeManualHandler = () => {
        setthreeManual(!threeManual)
    }
    const threeHVACHanlder = () => {
        setthreeHVAC(!threeHVAC)
    }
    const threeTimerHandler = () => {
        setthreeTimer(!threeTimer)
    }
    const threeAlarmHandler = () => {
        setthreeAlarm(!threeAlarm)
    }
    //Fourth tab handler
    const fourManualHandler = () => {
        setfourManual(!fourManual)
    }
    const fourHVACHanlder = () => {
        setfourHVAC(!fourHVAC)
    }
    const fourTimerHandler = () => {
        setfourTimer(!fourTimer)
    }
    const fourAlarmHandler = () => {
        setfourAlarm(!fourAlarm)
    }
    return (
        <div className="container">
            <h1 style={{ textAlign: "center", margin: 20 }}>Devices Controls</h1>
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
                                            <button onClick={oneManualHandler} className={`btn btn-secondary btn-sm ${oneManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Manual</button>
                                        </td>
                                        <td>
                                            <Switch {...label} defaultChecked />
                                        </td>
                                        <td>
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={oneHVACHanlder} className={`btn btn-secondary btn-sm ${oneHVAC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>HVAC</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={oneTimerHandler} className={`btn btn-secondary btn-sm ${oneTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Timer</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={oneAlarmHandler} className={`btn btn-secondary btn-sm ${oneAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Alarm</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
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
                                            <button onClick={twoManualHandler} className={`btn btn-secondary btn-sm ${twoManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Manual</button>
                                        </td>
                                        <td>
                                            <Switch {...label} defaultChecked />
                                        </td>
                                        <td>
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={twoHVACHanlder} className={`btn btn-secondary btn-sm ${twoHVAC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>HVAC</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={twoTimerHandler} className={`btn btn-secondary btn-sm ${twoTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Timer</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={twoAlarmHandler} className={`btn btn-secondary btn-sm ${twoAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Alarm</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
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
                                            <button onClick={threeManualHandler} className={`btn btn-secondary btn-sm ${threeManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Manual</button>
                                        </td>
                                        <td>
                                            <Switch {...label} defaultChecked />
                                        </td>
                                        <td>
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={threeHVACHanlder} className={`btn btn-secondary btn-sm ${threeHVAC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>HVAC</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={threeTimerHandler} className={`btn btn-secondary btn-sm ${threeTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Timer</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={threeAlarmHandler} className={`btn btn-secondary btn-sm ${threeAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Alarm</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
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
                                            <button onClick={fourManualHandler} className={`btn btn-secondary btn-sm ${fourManual ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Manual</button>
                                        </td>
                                        <td>
                                            <Switch {...label} defaultChecked />
                                        </td>
                                        <td>
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={fourHVACHanlder} className={`btn btn-secondary btn-sm ${fourHVAC ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>HVAC</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={fourTimerHandler} className={`btn btn-secondary btn-sm ${fourTimer ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Timer</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={fourAlarmHandler} className={`btn btn-secondary btn-sm ${fourAlarm ? 'active-dc-btn' : null}`} style={{ borderRadius: 25 }}>Alarm</button>
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
                                            <button className='btn btn-secondary btn-sm' style={{ borderRadius: 25 }}>Confirm</button>
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