import React from 'react'
import { Button, Switch } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Control = () => {
    return (
        <div className='container' style={{ border: '1px solid #41719c', padding: 10, backgroundColor: "#227899", marginBottom: 10 }}>
            <div className='row'>
                <div className='col-md-3 control-row-input'>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Command 1"
                            className={`form-control input-command`}
                        />
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className='row control-row'>
                        <div className='col-md-3'>
                            <p>Manual</p>
                        </div>
                        <div className='col-md-3'>
                            <Switch {...label} defaultChecked />
                        </div>
                        <div className='col-md-3'>
                            <Button style={{backgroundColor: "darkgoldenrod"}} variant="contained">Confirm</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-3 control-row-input'>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Command 2"
                            className={`form-control input-command`}
                        />
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className='row control-row'>
                        <div className='col-md-3'>
                            <p>HVAC Control</p>
                        </div>
                        <div className='col-md-3'>
                            <p>Set Points <span><input type="text" className='control-input' name="points" placeholder='22.5' /></span></p>
                        </div>
                        <div className='col-md-3'>
                            <Button style={{backgroundColor: "darkgoldenrod"}} variant="contained">Confirm</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-3 control-row-input'>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Command 3"
                            className={`form-control input-command`}
                        />
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className='row control-row'>
                        <div className='col-md-3'>
                            <p style={{ paddingTop: 25 }}>Timer</p>
                        </div>
                        <div className='col-md-3'>
                            <p>Turn On <span><input type="text" className='control-input' name="points" placeholder='HH:MM' /></span></p>
                            <p>Turn Off <span><input type="text" className='control-input' name="points" placeholder='HH:MM' /></span></p>
                        </div>
                        <div className='col-md-3' style={{ paddingTop: 32 }}>
                            <Button style={{backgroundColor: "darkgoldenrod"}} variant="contained">Confirm</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-3 control-row-input'>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Command 4"
                            className={`form-control input-command`}
                        />
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className='row control-row'>
                        <div className='col-md-3'>
                            <p>Alarm</p>
                        </div>
                        <div className='col-md-3'>
                            <p>Alarm <span><input type="text" className='control-input' name="points" placeholder='22.5' /></span></p>
                        </div>
                        <div className='col-md-3'>
                            <Button style={{backgroundColor: "darkgoldenrod"}} variant="contained">Confirm</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Control