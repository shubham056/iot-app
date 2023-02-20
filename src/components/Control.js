import React, { useState } from 'react'
import { Button, Switch } from '@mui/material'
import { TimePicker } from 'react-ios-time-picker';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import moment from 'moment-timezone';
import { useEffect } from 'react';
import UserService from '../services/user.service';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack'
const label = { inputProps: { 'aria-label': 'Switch demo' } };


const Control = ({ device_id, userID, isSharedDevice, isDeviceStatus }) => {
    console.log("device_id------------------------", device_id, userID, isSharedDevice, isDeviceStatus)
    let dt = moment();
    dt.format("HH:mm")
    const [value, setValues] = useState(dt.format("HH:mm"))
    const [isLoading, setisLoading] = useState(false)
    const [firstDeviceName, setfirstDeviceName] = useState("Device 1")
    const [secondDeviceName, setsecondDeviceName] = useState("Device 2")
    const [thirdDeviceName, setthirdDeviceName] = useState("Device 3")
    const [fourthDeviceName, setfourthDeviceName] = useState("Device 4")
    const [fivethhDeviceName, setfivethhDeviceName] = useState("Device 5")
    const [stepOne, setstepOne] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        setPoints: false,
        timer: false,
        turnOn: '',
        turnOff: '',
        alarm: false,
        setAlarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
        isDisableManual: isSharedDevice == "true" ? true : false,
        isDisableswitch: isSharedDevice == "true" ? true : false,
        isDisableHAVC: isSharedDevice == "true" ? true : false,
        isSetPointsDisable: isSharedDevice == "true" ? true : false,
        isDisabletimer: isSharedDevice == "true" ? true : false,
        isTurnOnDisable: isSharedDevice == "true" ? true : false,
        isTurnOffDisable: isSharedDevice == "true" ? true : false,
        isDisablealarm: isSharedDevice == "true" ? true : false,
        isSetAlarmDisable: isSharedDevice == "true" ? true : false,
        isDisableconfirmManual: true,
        isDisableconfirmHAVC: true,
        isDisableconfirmTimer: true,
        isDisableconfirmAlarm: true,
        isManualLoading: false,
        isHVACLoading: false,
        isTimerLoading: false,
        isAlarmLoading: false,
    })
    const [stepTwo, setstepTwo] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        setPoints: false,
        timer: false,
        turnOn: '',
        turnOff: '',
        alarm: false,
        setAlarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
        isDisableManual: false,
        isDisableswitch: false,
        isDisableHAVC: false,
        isSetPointsDisable: false,
        isDisabletimer: false,
        isTurnOnDisable: false,
        isTurnOffDisable: false,
        isDisablealarm: false,
        isSetAlarmDisable: false,
        isDisableconfirmManual: true,
        isDisableconfirmHAVC: true,
        isDisableconfirmTimer: true,
        isDisableconfirmAlarm: true,
        isManualLoading: false,
        isHVACLoading: false,
        isTimerLoading: false,
        isAlarmLoading: false,
        isManualTick: false,
        isHVACTick: false,
        isTimerTick: false,
        isAlarmTick: false,
    })
    const [stepThree, setstepThree] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        setPoints: false,
        timer: false,
        turnOn: '',
        turnOff: '',
        alarm: false,
        setAlarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
        isDisableManual: false,
        isDisableswitch: false,
        isDisableHAVC: false,
        isSetPointsDisable: false,
        isDisabletimer: false,
        isTurnOnDisable: false,
        isTurnOffDisable: false,
        isDisablealarm: false,
        isSetAlarmDisable: false,
        isDisableconfirmManual: true,
        isDisableconfirmHAVC: true,
        isDisableconfirmTimer: true,
        isDisableconfirmAlarm: true,
        isManualLoading: false,
        isHVACLoading: false,
        isTimerLoading: false,
        isAlarmLoading: false,
        isManualTick: false,
        isHVACTick: false,
        isTimerTick: false,
        isAlarmTick: false,
    })
    const [stepFour, setstepFour] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        setPoints: false,
        timer: false,
        turnOn: '',
        turnOff: '',
        alarm: false,
        setAlarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
        isDisableManual: false,
        isDisableswitch: false,
        isDisableHAVC: false,
        isSetPointsDisable: false,
        isDisabletimer: false,
        isTurnOnDisable: false,
        isTurnOffDisable: false,
        isDisablealarm: false,
        isSetAlarmDisable: false,
        isDisableconfirmManual: true,
        isDisableconfirmHAVC: true,
        isDisableconfirmTimer: true,
        isDisableconfirmAlarm: true,
        isManualLoading: false,
        isHVACLoading: false,
        isTimerLoading: false,
        isAlarmLoading: false,
        isManualTick: false,
        isHVACTick: false,
        isTimerTick: false,
        isAlarmTick: false,
    })
    const [stepFive, setstepFive] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        setPoints: false,
        timer: false,
        turnOn: '',
        turnOff: '',
        alarm: false,
        setAlarm: false,
        confirmManual: false,
        confirmHAVC: false,
        confirmTimer: false,
        confirmAlarm: false,
        isDisableManual: false,
        isDisableswitch: false,
        isDisableHAVC: false,
        isSetPointsDisable: false,
        isDisabletimer: false,
        isTurnOnDisable: false,
        isTurnOffDisable: false,
        isDisablealarm: false,
        isSetAlarmDisable: false,
        isDisableconfirmManual: true,
        isDisableconfirmHAVC: true,
        isDisableconfirmTimer: true,
        isDisableconfirmAlarm: true,
        isManualLoading: false,
        isHVACLoading: false,
        isTimerLoading: false,
        isAlarmLoading: false,
        isManualTick: false,
        isHVACTick: false,
        isTimerTick: false,
        isAlarmTick: false,
    })

    //------------------ UseEffects --------------------
    useEffect(() => {
        let dataOne = {
            device_name: "Device 1",
            device_row_type: "first"
        }
        let dataTwo = {
            device_name: "Device 2",
            device_row_type: "second"
        }
        let dataThree = {
            device_name: "Device 3",
            device_row_type: "third"
        }
        let dataFour = {
            device_name: "Device 4",
            device_row_type: "four"
        }
        let dataFive = {
            device_name: "Device 5",
            device_row_type: "five"
        }
        //for device 1
        UserService.insertControlData(device_id, userID, dataOne)
            .then((res) => {
                console.log('res', res)
            })
            .catch((error) => {
                console.log(error)
            });
        //for device 2
        UserService.insertControlData(device_id, userID, dataTwo)
            .then((res) => {
                console.log('res', res)
            })
            .catch((error) => {
                console.log(error)
            });
        //for device 3
        UserService.insertControlData(device_id, userID, dataThree)
            .then((res) => {
                console.log('res', res)
            })
            .catch((error) => {
                console.log(error)
            });
        //for device 4
        UserService.insertControlData(device_id, userID, dataFour)
            .then((res) => {
                console.log('res', res)
            })
            .catch((error) => {
                console.log(error)
            });
        //for device 5
        UserService.insertControlData(device_id, userID, dataFive)
            .then((res) => {
                console.log('res', res)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [device_id, userID])

    const [checkTick, setCheckTick] = useState()
    useEffect(() => {
        UserService.GetControlDeviceData(device_id, userID)
            .then(res => {
                console.log("res control data!!!!!!:", res)
                let controlData = res.data.data.deviceInfo
                console.log("controlDeviceData", controlData)
                if (controlData.length > 0) {
                    controlData.map(item => {
                        //first device
                        if (item.device_row_type == 'first') {
                            setfirstDeviceName(item.device_name)
                            if (item.last_acknowledgement == 'manual') {
                                console.log("item", JSON.parse(item.is_switch))
                                setstepOne({
                                    ...stepOne,
                                    manual: item.is_manual,
                                    switch: JSON.parse(item.is_switch),
                                    confirmManual: item.is_manual_confirm,
                                    isManualTick: item.is_manual_confirm,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                })
                            } if (item.last_acknowledgement == 'hvac') {
                                setstepOne({
                                    ...stepOne,
                                    HAVC: item.is_hvac,
                                    setPoints: item.set_points,
                                    confirmHAVC: item.is_hvac_confirm,
                                    isHVACTick: item.is_hvac_confirm,
                                    isManualTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                })
                            } if (item.last_acknowledgement == 'timer') {
                                setstepOne({
                                    ...stepOne,
                                    timer: item.is_timer,
                                    turnOn: item.turn_on,
                                    turnOff: item.turn_off,
                                    confirmTimer: item.is_timer_confirm,
                                    isTimerTick: item.is_timer_confirm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isAlarmTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    setAlarm: false,
                                })
                                console.log("stepone after", stepOne)
                            } if (item.last_acknowledgement == 'alarm') {
                                setstepOne({
                                    ...stepOne,
                                    alarm: item.is_alarm,
                                    setAlarm: item.set_alarm,
                                    confirmAlarm: item.is_confirm_alarm,
                                    isAlarmTick: item.is_confirm_alarm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                })
                            }
                        }
                        //second device
                        if (item.device_row_type == 'second') {
                            setsecondDeviceName(item.device_name)
                            if (item.last_acknowledgement == 'manual') {
                                console.log("item", JSON.parse(item.is_switch))
                                setstepTwo({
                                    ...stepTwo,
                                    manual: item.is_manual,
                                    switch: JSON.parse(item.is_switch),
                                    confirmManual: item.is_manual_confirm,
                                    isManualTick: item.is_manual_confirm,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                    
                                })
                            } if (item.last_acknowledgement == 'hvac') {
                                setstepTwo({
                                    ...stepTwo,
                                    HAVC: item.is_hvac,
                                    setPoints: item.set_points,
                                    confirmHAVC: item.is_hvac_confirm,
                                    isHVACTick: item.is_hvac_confirm,
                                    isManualTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                })
                            } if (item.last_acknowledgement == 'timer') {
                                setstepTwo({
                                    ...stepTwo,
                                    timer: item.is_timer,
                                    turnOn: item.turn_on,
                                    turnOff: item.turn_off,
                                    confirmTimer: item.is_timer_confirm,
                                    isTimerTick: item.is_timer_confirm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    setAlarm: false,
                                })
                                console.log("stepone after", stepTwo)
                            } if (item.last_acknowledgement == 'alarm') {
                                setstepTwo({
                                    ...stepTwo,
                                    alarm: item.is_alarm,
                                    setAlarm: item.set_alarm,
                                    confirmAlarm: item.is_confirm_alarm,
                                    isAlarmTick: item.is_confirm_alarm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                })
                            }
                        }
                        //third device
                        if (item.device_row_type == 'third') {
                            setthirdDeviceName(item.device_name)
                            if (item.last_acknowledgement == 'manual') {
                                console.log("item", JSON.parse(item.is_switch))
                                setstepThree({
                                    ...stepThree,
                                    manual: item.is_manual,
                                    switch: JSON.parse(item.is_switch),
                                    confirmManual: item.is_manual_confirm,
                                    isManualTick: item.is_manual_confirm,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                })
                            } if (item.last_acknowledgement == 'hvac') {
                                setstepThree({
                                    ...stepThree,
                                    HAVC: item.is_hvac,
                                    setPoints: item.set_points,
                                    confirmHAVC: item.is_hvac_confirm,
                                    isHVACTick: item.is_hvac_confirm,
                                    isManualTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                })
                            } if (item.last_acknowledgement == 'timer') {
                                setstepThree({
                                    ...stepThree,
                                    timer: item.is_timer,
                                    turnOn: item.turn_on,
                                    turnOff: item.turn_off,
                                    confirmTimer: item.is_timer_confirm,
                                    isTimerTick: item.is_timer_confirm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    setAlarm: false,
                                })
                                console.log("stepone after", stepThree)
                            } if (item.last_acknowledgement == 'alarm') {
                                setstepThree({
                                    ...stepThree,
                                    alarm: item.is_alarm,
                                    setAlarm: item.set_alarm,
                                    confirmAlarm: item.is_confirm_alarm,
                                    isAlarmTick: item.is_confirm_alarm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                })
                            }
                        }
                        //fourth device
                        if (item.device_row_type == 'four') {
                            setfourthDeviceName(item.device_name)
                            if (item.last_acknowledgement == 'manual') {
                                console.log("item", JSON.parse(item.is_switch))
                                setstepFour({
                                    ...stepFour,
                                    manual: item.is_manual,
                                    switch: JSON.parse(item.is_switch),
                                    confirmManual: item.is_manual_confirm,
                                    isManualTick: item.is_manual_confirm,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                })
                            } if (item.last_acknowledgement == 'hvac') {
                                setstepFour({
                                    ...stepFour,
                                    HAVC: item.is_hvac,
                                    setPoints: item.set_points,
                                    confirmHAVC: item.is_hvac_confirm,
                                    isHVACTick: item.is_hvac_confirm,
                                    isManualTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                })
                            } if (item.last_acknowledgement == 'timer') {
                                setstepFour({
                                    ...stepFour,
                                    timer: item.is_timer,
                                    turnOn: item.turn_on,
                                    turnOff: item.turn_off,
                                    confirmTimer: item.is_timer_confirm,
                                    isTimerTick: item.is_timer_confirm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isAlarmTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    setAlarm: false,
                                })
                                console.log("stepone after", stepFour)
                            } if (item.last_acknowledgement == 'alarm') {
                                setstepFour({
                                    ...stepFour,
                                    alarm: item.is_alarm,
                                    setAlarm: item.set_alarm,
                                    confirmAlarm: item.is_confirm_alarm,
                                    isAlarmTick: item.is_confirm_alarm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                })
                            }
                        }
                        //fiveth device
                        if (item.device_row_type == 'five') {
                            setfivethhDeviceName(item.device_name)
                            if (item.last_acknowledgement == 'manual') {
                                console.log("item", JSON.parse(item.is_switch))
                                setstepFive({
                                    ...stepFive,
                                    manual: item.is_manual,
                                    switch: JSON.parse(item.is_switch),
                                    confirmManual: item.is_manual_confirm,
                                    isManualTick: item.is_manual_confirm,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                })
                            } if (item.last_acknowledgement == 'hvac') {
                                setstepFive({
                                    ...stepFive,
                                    HAVC: item.is_hvac,
                                    setPoints: item.set_points,
                                    confirmHAVC: item.is_hvac_confirm,
                                    isHVACTick: item.is_hvac_confirm,
                                    isManualTick: false,
                                    isTimerTick: false,
                                    isAlarmTick: false,
                                    turnOn: '',
                                    turnOff: '',
                                    setAlarm: false,
                                    
                                })
                            } if (item.last_acknowledgement == 'timer') {
                                setstepFive({
                                    ...stepFive,
                                    timer: item.is_timer,
                                    turnOn: item.turn_on,
                                    turnOff: item.turn_off,
                                    confirmTimer: item.is_timer_confirm,
                                    isTimerTick: item.is_timer_confirm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isAlarmTick: false,
                                    setPoints: false,
                                    setAlarm: false,

                                })
                                console.log("stepone after", stepFive)
                            } if (item.last_acknowledgement == 'alarm') {
                                setstepFive({
                                    ...stepFive,
                                    alarm: item.is_alarm,
                                    setAlarm: item.set_alarm,
                                    confirmAlarm: item.is_confirm_alarm,
                                    isAlarmTick: item.is_confirm_alarm,
                                    isManualTick: false,
                                    isHVACTick: false,
                                    isTimerTick: false,
                                    setPoints: false,
                                    turnOn: '',
                                    turnOff: '',
                                })
                            }
                        }
                    })
                }

            }).catch(err => {
                console.log('err', err)
            })
    }, [checkTick])

    useEffect(() => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
        } if (isDeviceStatus == 'green') {
            toast.success("Device is online now.", { toastId: 2 })
        }
    }, [isDeviceStatus])

    const [open, setOpen] = useState(false);
    const onOpenModal = (val, stateName) => {
        setOpen(true);
        setValue("state_name", stateName)
        setValue("device_name", val)
    }
    const onCloseModal = () => setOpen(false);

    const profileSchema = Yup.object().shape({
        device_name: Yup.string().required('Device name is required.'),
    });
    const formOptions = { resolver: yupResolver(profileSchema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, } = useForm(formOptions);

    //Step One 
    const setpointsSchema = Yup.object().shape({
        set_points: Yup.string().required('Set Points is required.'),
    });
    const setPointsformOptions = { resolver: yupResolver(setpointsSchema) }
    const { register: register1, setValue: setValue1, formState: { errors: errors1, isSubmitting: isSubmitting1 }, handleSubmit: handleSubmit1, } = useForm(setPointsformOptions);

    //submit handler
    const onSubmit = formValue => {
        console.log(formValue)
        const { state_name, device_name } = formValue
        let data = { device_name: device_name }

        if (state_name === "firstDeviceName") {
            console.log("first Device")
            data.device_row_type = "first";
            setfirstDeviceName(device_name)
        } if (state_name === "secondDeviceName") {
            data.device_row_type = "second";
            setsecondDeviceName(device_name)
        } if (state_name === "thirdDeviceName") {
            data.device_row_type = "third";
            setthirdDeviceName(device_name)
        } if (state_name === "fourthDeviceName") {
            data.device_row_type = "four";
            setfourthDeviceName(device_name)
        } if (state_name === "fivethhDeviceName") {
            data.device_row_type = "five";
            setfivethhDeviceName(device_name)
        }
        UserService.insertUpdateControlData(device_id, userID, data)
            .then((res) => {
                console.log('res', res)
                { res.data.error == false && toast.success(res.data.message, { toastId: 2345364676 }) }
            })
            .catch((error) => {
                console.log(error)
                { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
            });

        setOpen(false)
    }


    //StepOne tab handler
    const oneManualHandler = () => {
        setstepOne({
            ...stepOne,
            manual: true,
            HAVC: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: false,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: false,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })

    }
    const oneHVACHandler = () => {
        setstepOne({
            ...stepOne,
            HAVC: true,
            manual: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: false,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: false,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const oneTimerHandler = () => {
        setstepOne({
            ...stepOne,
            timer: true,
            manual: false,
            HAVC: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: false,
            isTurnOffDisable: false,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: false,
            isDisableconfirmAlarm: true,
        })
    }
    const oneAlarmHandler = () => {
        setstepOne({
            ...stepOne,
            alarm: true,
            manual: false,
            HAVC: false,
            timer: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: false,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: false,
        })
    }
    //StepTwo tab handler
    const twoManualHandler = () => {
        setstepTwo({
            ...stepTwo,
            manual: true,
            HAVC: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: false,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: false,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const twoHVACHandler = () => {
        setstepTwo({
            ...stepTwo,
            HAVC: true,
            manual: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: false,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: false,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const twoTimerHandler = () => {
        setstepTwo({
            ...stepTwo,
            timer: true,
            manual: false,
            HAVC: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: false,
            isTurnOffDisable: false,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: false,
            isDisableconfirmAlarm: true,
        })
    }
    const twoAlarmHandler = () => {
        setstepTwo({
            ...stepTwo,
            alarm: true,
            manual: false,
            HAVC: false,
            timer: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: false,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: false,
        })
    }
    //StepThree tab handler
    const threeManualHandler = () => {
        setstepThree({
            ...stepThree,
            manual: true,
            HAVC: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: false,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: false,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const threeHVACHandler = () => {
        setstepThree({
            ...stepThree,
            HAVC: true,
            manual: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: false,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: false,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const threeTimerHandler = () => {
        setstepThree({
            ...stepThree,
            timer: true,
            manual: false,
            HAVC: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: false,
            isTurnOffDisable: false,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: false,
            isDisableconfirmAlarm: true,
        })
    }
    const threeAlarmHandler = () => {
        setstepThree({
            ...stepThree,
            alarm: true,
            manual: false,
            HAVC: false,
            timer: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: false,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: false,
        })
    }
    //StepFourth tab handler
    const fourManualHandler = () => {
        setstepFour({
            ...stepFour,
            manual: true,
            HAVC: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: false,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: false,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const fourHVACHandler = () => {
        setstepFour({
            ...stepFour,
            HAVC: true,
            manual: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: false,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: false,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const fourTimerHandler = () => {
        setstepFour({
            ...stepFour,
            timer: true,
            manual: false,
            HAVC: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: false,
            isTurnOffDisable: false,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: false,
            isDisableconfirmAlarm: true,
        })
    }
    const fourAlarmHandler = () => {
        setstepFour({
            ...stepFour,
            alarm: true,
            manual: false,
            HAVC: false,
            timer: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: false,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: false,
        })
    }
    //StepFiveth tab handler
    const fiveManualHandler = () => {
        setstepFive({
            ...stepFive,
            manual: true,
            HAVC: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: false,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: false,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const fiveHVACHandler = () => {
        setstepFive({
            ...stepFive,
            HAVC: true,
            manual: false,
            timer: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: false,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: false,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: true,
        })
    }
    const fiveTimerHandler = () => {
        setstepFive({
            ...stepFive,
            timer: true,
            manual: false,
            HAVC: false,
            alarm: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: false,
            isTurnOffDisable: false,
            isDisablealarm: false,
            isSetAlarmDisable: true,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: false,
            isDisableconfirmAlarm: true,
        })
    }
    const fiveAlarmHandler = () => {
        setstepFive({
            ...stepFive,
            alarm: true,
            manual: false,
            HAVC: false,
            timer: false,
            isDisableManual: false,
            isDisableswitch: true,
            isDisableHAVC: false,
            isSetPointsDisable: true,
            isDisabletimer: false,
            isTurnOnDisable: true,
            isTurnOffDisable: true,
            isDisablealarm: false,
            isSetAlarmDisable: false,
            isDisableconfirmManual: true,
            isDisableconfirmHAVC: true,
            isDisableconfirmTimer: true,
            isDisableconfirmAlarm: false,
        })
    }

    //------------ Switch Handlers ------------------------
    const stepOneSwitchHandler = (event) => {
        setstepOne({
            ...stepOne,
            switch: event.target.checked
        })
        console.log(stepOne.switch)
    }
    const stepTwoSwitchHandler = (event) => {
        setstepTwo({
            ...stepTwo,
            switch: event.target.checked
        })
        console.log(stepTwo.switch)
    }
    const stepThreeSwitchHandler = (event) => {
        setstepThree({
            ...stepThree,
            switch: event.target.checked
        })
    }
    const stepFourSwitchHandler = (event) => {
        setstepFour({
            ...stepFour,
            switch: event.target.checked
        })
    }
    const stepFiveSwitchHandler = (event) => {
        setstepFive({
            ...stepFive,
            switch: event.target.checked
        })
    }
    //----------------------------------------- useEffect Section Start ------------------------------------------
    //Step One
    useEffect(() => {
        //setPoints
        setstepOne({
            ...stepOne,
            setPoints: stepOne.setPoints
        })
        //turnOn
        setstepOne({
            ...stepOne,
            turnOn: stepOne.turnOn
        })
        //turnOff
        setstepOne({
            ...stepOne,
            turnOff: stepOne.turnOff
        })
        //alarm
        setstepOne({
            ...stepOne,
            setAlarm: stepOne.setAlarm
        })

    }, [stepOne.setPoints, stepOne.turnOn, stepOne.turnOff, stepOne.setAlarm]);
    //Step Two
    useEffect(() => {
        //setPoints
        setstepTwo({
            ...stepTwo,
            setPoints: stepTwo.setPoints
        })
        //turnOn
        setstepTwo({
            ...stepTwo,
            turnOn: stepTwo.turnOn
        })
        //turnOff
        setstepTwo({
            ...stepTwo,
            turnOff: stepTwo.turnOff
        })
        //alarm
        setstepTwo({
            ...stepTwo,
            alarm: stepTwo.alarm
        })

    }, [stepTwo.setPoints, stepTwo.turnOn, stepTwo.turnOff, stepTwo.alarm]);
    //Step Three
    useEffect(() => {
        //setPoints
        setstepThree({
            ...stepThree,
            setPoints: stepThree.setPoints
        })
        //turnOn
        setstepThree({
            ...stepThree,
            turnOn: stepThree.turnOn
        })
        //turnOff
        setstepThree({
            ...stepThree,
            turnOff: stepThree.turnOff
        })
        //alarm
        setstepThree({
            ...stepThree,
            alarm: stepThree.alarm
        })

    }, [stepThree.setPoints, stepThree.turnOn, stepThree.turnOff, stepThree.alarm]);
    //Step Four
    useEffect(() => {
        //setPoints
        setstepFour({
            ...stepFour,
            setPoints: stepFour.setPoints
        })
        //turnOn
        setstepFour({
            ...stepFour,
            turnOn: stepFour.turnOn
        })
        //turnOff
        setstepFour({
            ...stepFour,
            turnOff: stepFour.turnOff
        })
        //alarm
        setstepFour({
            ...stepFour,
            alarm: stepFour.alarm
        })

    }, [stepFour.setPoints, stepFour.turnOn, stepFour.turnOff, stepFour.alarm]);
    //Step Five
    useEffect(() => {
        //setPoints
        setstepFive({
            ...stepFive,
            setPoints: stepFive.setPoints
        })
        //turnOn
        setstepFive({
            ...stepFive,
            turnOn: stepFive.turnOn
        })
        //turnOff
        setstepFive({
            ...stepFive,
            turnOff: stepFive.turnOff
        })
        //alarm
        setstepFive({
            ...stepFive,
            alarm: stepFive.alarm
        })

    }, [stepFive.setPoints, stepFive.turnOn, stepFive.turnOff, stepFive.alarm]);
    //----------------------------------------- useEffect Section End ------------------------------------------
    //first
    const [clearFManual, setclearFManual] = useState('')
    const [clearFHVAC, setclearFHVAC] = useState('')
    const [clearFTimer, setclearFTimer] = useState('')
    const [clearFAlarm, setclearFAlarm] = useState('')
    useEffect(() => {
        console.log('clearFManual', clearFManual)
        setstepOne({
            ...stepOne,
            isManualLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearFManual])
    useEffect(() => {
        console.log('clearFHVAC', clearFHVAC)
        setstepOne({
            ...stepOne,
            isHVACLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })

    }, [clearFHVAC])
    useEffect(() => {
        console.log('clearFTimer', clearFTimer)
        setstepOne({
            ...stepOne,
            isTimerLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })

    }, [clearFTimer])
    useEffect(() => {
        console.log('clearFAlarm', clearFAlarm)
        setstepOne({
            ...stepOne,
            isAlarmLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearFAlarm])
    //second
    const [clearSecManual, setclearSecManual] = useState('')
    const [clearSecHVAC, setclearSecHVAC] = useState('')
    const [clearSecTimer, setclearSecTimer] = useState('')
    const [clearSecAlarm, setclearSecAlarm] = useState('')
    useEffect(() => {
        console.log('clearSecManual', clearSecManual)
        setstepTwo({
            ...stepTwo,
            isManualLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearSecManual])
    useEffect(() => {
        console.log('clearSecHVAC', clearSecHVAC)
        setstepTwo({
            ...stepTwo,
            isHVACLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })

    }, [clearSecHVAC])
    useEffect(() => {
        console.log('clearSecTimer', clearSecTimer)
        setstepTwo({
            ...stepTwo,
            isTimerLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearSecTimer])
    useEffect(() => {
        console.log('clearSecAlarm', clearSecAlarm)
        setstepTwo({
            ...stepTwo,
            isAlarmLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearSecAlarm])
    //third
    const [clearTManual, setclearTManual] = useState('')
    const [clearTHVAC, setclearTHVAC] = useState('')
    const [clearTTimer, setclearTTimer] = useState('')
    const [clearTAlarm, setclearTAlarm] = useState('')
    useEffect(() => {
        console.log('clearTManual', clearTManual)
        setstepThree({
            ...stepThree,
            isManualLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearTManual])
    useEffect(() => {
        console.log('clearTHVAC', clearTHVAC)
        setstepThree({
            ...stepThree,
            isHVACLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })

    }, [clearTHVAC])
    useEffect(() => {
        console.log('clearTTimer', clearTTimer)
        setstepThree({
            ...stepThree,
            isTimerLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearTTimer])
    useEffect(() => {
        console.log('clearTAlarm', clearTAlarm)
        setstepThree({
            ...stepThree,
            isAlarmLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearTAlarm])
    //fourth
    const [clearFouManual, setclearFouManual] = useState('')
    const [clearFouHVAC, setclearFouHVAC] = useState('')
    const [clearFouTimer, setclearFouTimer] = useState('')
    const [clearFouAlarm, setclearFouAlarm] = useState('')
    useEffect(() => {
        console.log('clearFouManual', clearFouManual)
        setstepFour({
            ...stepFour,
            isManualLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearFouManual])
    useEffect(() => {
        console.log('clearFouHVAC', clearFouHVAC)
        setstepFour({
            ...stepFour,
            isHVACLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })

    }, [clearFouHVAC])
    useEffect(() => {
        console.log('clearFouTimer', clearFouTimer)
        setstepFour({
            ...stepFour,
            isTimerLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearFouTimer])
    useEffect(() => {
        console.log('clearFouAlarm', clearFouAlarm)
        setstepFour({
            ...stepFour,
            isAlarmLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearFouAlarm])
    //fiveth
    const [clearFivManual, setclearFivManual] = useState('')
    const [clearFivHVAC, setclearFivHVAC] = useState('')
    const [clearFivTimer, setclearFivTimer] = useState('')
    const [clearFivAlarm, setclearFivAlarm] = useState('')
    useEffect(() => {
        console.log('clearFivManual', clearFivManual)
        setstepFive({
            ...stepFive,
            isManualLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearFivManual])
    useEffect(() => {
        console.log('clearFivHVAC', clearFivHVAC)
        setstepFive({
            ...stepFive,
            isHVACLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })

    }, [clearFivHVAC])
    useEffect(() => {
        console.log('clearFivTimer', clearFivTimer)
        setstepFive({
            ...stepFive,
            isTimerLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearFivTimer])
    useEffect(() => {
        console.log('clearFivAlarm', clearFivAlarm)
        setstepFive({
            ...stepFive,
            isAlarmLoading: false,
            isDisableManual: false,
            isDisableHAVC: false,
            isDisabletimer: false,
            isDisablealarm: false,
        })
    }, [clearFivAlarm])



    //StepOne Confirm Handlers
    const stepOneManualCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        setstepOne({
            ...stepOne,
            confirmManual: true,
            confirmHAVC: false,
            confirmTimer: false,
            confirmAlarm: false,
            isManualLoading: true,
            isHVACLoading: false,
            isTimerLoading: false,
            isAlarmLoading: false,
            isDisableconfirmManual: true,
            isDisableManual: true,
            isDisableHAVC: true,
            isDisabletimer: true,
            isDisablealarm: true,
        })
        let mamualVal = stepOne.manual
        let switchVal = stepOne.switch
        console.log("mamual", mamualVal)
        console.log("switchVal", switchVal)
        let data = [{
            "CM-1-Mode": 10,
            "CM-1-On-Off": switchVal,
        }]
        console.log("data", stepOne)
        UserService.postControlData(device_id, userID, 'first', "mode1-manual", data)
            .then((res) => {
                console.log("get Manual data------------------", res.data)
                const interval = setInterval(() => {
                    console.log("call check acknoledgement for device 1 manual")
                    if (device_id != '' && userID != '') {
                        UserService.GetControlDeviceData(device_id, userID, "first")
                            .then(res => {
                                let controlData = res.data.data.deviceInfo
                                console.log("controlDeviceData", controlData)
                                if (controlData.is_acknowledgement_updated == "true") {
                                    console.log("got acknowledgement")
                                    setstepOne({
                                        ...stepOne,
                                        isManualLoading: false,
                                        isManualTick: true,
                                        confirmManual: true,
                                        confirmHAVC: false,
                                        confirmTimer: false,
                                        confirmAlarm: false
                                    })
                                    setCheckTick(Math.random())
                                    clearInterval(interval);
                                }

                            }).catch(err => {
                                console.log('err', err)
                                clearInterval(interval);
                            })
                    }

                }, 5000)
                setTimeout(() => {
                    console.log('clear manual interval')
                    clearInterval(interval);
                    setclearFManual(Math.random())
                }, 60000) // 1min
            }).catch(err => {
                console.log(err)
            })
    }
    const stepOneHVACCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let HVACVal = stepOne.HAVC
        let setPointsVal = stepOne.setPoints
        if (setPointsVal != '') {
            //call API
            setstepOne({
                ...stepOne,
                confirmManual: false,
                confirmHAVC: true,
                confirmTimer: false,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: true,
                isTimerLoading: false,
                isAlarmLoading: false,
                isDisableconfirmHAVC: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            let data = [{
                "CM-1-Mode": 20,
                "CM-1-Temp-SP": setPointsVal,
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'first', "mode1-hvac", data)
                .then((res) => {
                    console.log("get HVAC data------------------", res.data)

                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 HVAC")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "first")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepOne({
                                            ...stepOne,
                                            isHVACLoading: false,
                                            isHVACTick: true,
                                            confirmManual: false,
                                            confirmHAVC: true,
                                            confirmTimer: false,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }

                                }).catch(err => {
                                    console.log('err', err)
                                    clearInterval(interval);
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear Hvac interval f')
                        clearInterval(interval);
                        setclearFHVAC(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Set Points can't be empty!")
        }
        console.log("HVAC", HVACVal)
        console.log("setPointsVal", setPointsVal)
    }
    const stepOneTimerCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let turnOn = stepOne.turnOn;
        let turnOff = stepOne.turnOff;
        if (turnOn != '' && turnOff != '') {
            setstepOne({
                ...stepOne,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: true,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: true,
                isAlarmLoading: false,
                isDisableconfirmTimer: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log(stepOne)
            let data = [{
                "CM-1-Mode": 30,
                "CM-1-T-ON": stepOne.turnOn,
                "CM-1-T-OFF": stepOne.turnOff,
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'first', "mode1-timer", data)
                .then((res) => {
                    console.log("get Timer data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "first")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepOne({
                                            ...stepOne,
                                            isTimerLoading: false,
                                            isTimerLoading: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: true,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }

                                }).catch(err => {
                                    console.log('err', err)
                                    clearInterval(interval);
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear timer interval f')
                        clearInterval(interval);
                        setclearFTimer(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })

        } else {
            alert("Turn on and turn off can't be empty!")
        }
    }
    const stepOneAlarmCfmHandler = () => {
        let alarmVal = stepOne.setAlarm
        console.log(stepOne)
        console.log("alarm val", alarmVal)
        if (alarmVal != '') {
            //call API
            setstepOne({
                ...stepOne,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: false,
                confirmAlarm: true,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: false,
                isAlarmLoading: true,
                isDisableconfirmAlarm: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log(stepOne)
            let data = [{
                "CM-1-Mode": 40,
                "CM1-ALM": stepOne.setAlarm
            }]
            console.log(data)
            if (isDeviceStatus != 'green') {
                toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
                return false
            }
            UserService.postControlData(device_id, userID, 'first', "mode1-alarm", data)
                .then((res) => {
                    console.log("get Alarm data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "first")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepOne({
                                            ...stepOne,
                                            isAlarmLoading: false,
                                            isAlarmTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: false,
                                            confirmAlarm: true
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }

                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear alarm interval f')
                        clearInterval(interval);
                        setclearFAlarm(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Alarm val can't empty!")
        }
    }
    //StepTwo Confirm Handler
    const stepTwoManualCfmHandler = () => {
        setstepTwo({
            ...stepTwo,
            confirmManual: true,
            confirmHAVC: false,
            confirmTimer: false,
            confirmAlarm: false,
            isManualLoading: true,
            isHVACLoading: false,
            isTimerLoading: false,
            isAlarmLoading: false,
            isDisableconfirmManual: true,
            isDisableManual: true,
            isDisableHAVC: true,
            isDisabletimer: true,
            isDisablealarm: true,
        })
        console.log(stepTwo)
        let mamualVal = stepTwo.manual
        let switchVal = stepTwo.switch
        console.log("mamual", mamualVal)
        console.log("switchVal", switchVal)
        let data = [{
            "CM-2-Mode": 10,
            "CM-2-On-Off": switchVal
        }]
        console.log("data", stepTwo)
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        UserService.postControlData(device_id, userID, "second", "mode2-manual", data)
            .then((res) => {
                console.log("get Alarm data------------------", res.data)
                const interval = setInterval(() => {
                    console.log("call check acknoledgement for device 1 Timer")
                    if (device_id != '' && userID != '') {
                        UserService.GetControlDeviceData(device_id, userID, "second")
                            .then(res => {
                                let controlData = res.data.data.deviceInfo
                                console.log("controlDeviceData", controlData)
                                if (controlData.is_acknowledgement_updated == "true") {
                                    console.log("got acknowledgement")
                                    setstepTwo({
                                        ...stepTwo,
                                        isManualLoading: false,
                                        isManualTick: true,
                                        confirmManual: true,
                                        confirmHAVC: false,
                                        confirmTimer: false,
                                        confirmAlarm: false
                                    })
                                    setCheckTick(Math.random())
                                    clearInterval(interval);
                                }

                            }).catch(err => {
                                console.log('err', err)
                                clearInterval(interval);
                            })
                    }
                }, 5000)
                setTimeout(() => {
                    console.log('clear sec manual interval')
                    clearInterval(interval);
                    setclearSecManual(Math.random())
                }, 60000) // 1min
            }).catch(err => {
                console.log(err)
            })

    }
    const stepTwoHVACCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let HVACVal = stepTwo.HAVC
        let setPointsVal = stepTwo.setPoints
        if (setPointsVal != '') {
            //call API
            setstepTwo({
                ...stepTwo,
                confirmManual: false,
                confirmHAVC: true,
                confirmTimer: false,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: true,
                isTimerLoading: false,
                isAlarmLoading: false,
                isDisableconfirmHAVC: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            let data = [{
                "CM-2-Mode": 20,
                "CM-2-Temp-SP": setPointsVal,
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'second', "mode2-hvac", data)
                .then((res) => {
                    console.log("get HVAC data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 HVAC")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "second")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepTwo({
                                            ...stepTwo,
                                            isHVACLoading: false,
                                            isHVACTick: true,
                                            confirmManual: false,
                                            confirmHAVC: true,
                                            confirmTimer: false,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }

                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear Hvac interval s')
                        clearInterval(interval);
                        setclearSecHVAC(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Set Points can't be empty!")
        }
        console.log("HVAC", HVACVal)
        console.log("setPointsVal", setPointsVal)
    }
    const stepTwoTimerCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let turnOn = stepTwo.turnOn;
        let turnOff = stepTwo.turnOff;
        if (turnOn != '' && turnOff != '') {
            setstepTwo({
                ...stepTwo,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: true,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: true,
                isAlarmLoading: false,
                isDisableconfirmTimer: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log("stepTwo---", stepTwo)
            let data = [{
                "CM-2-Mode": 30,
                "CM-2-T-ON": stepTwo.turnOn,
                "CM-2-T-OFF": stepTwo.turnOff,
            }]
            console.log(data)

            UserService.postControlData(device_id, userID, 'second', "mode2-timer", data)
                .then((res) => {
                    console.log("get Timer data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "second")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepTwo({
                                            ...stepTwo,
                                            isTimerLoading: false,
                                            isTimerTick: true,
                                            isTimerTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: true,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }

                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear timer interval Sec')
                        clearInterval(interval);
                        setclearSecTimer(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Turn on and turn off can't be empty!")
        }
    }
    const stepTwoAlarmCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let alarmVal = stepTwo.setAlarm
        console.log(stepTwo)
        console.log("alarm val", alarmVal)
        if (alarmVal != '') {
            //call API
            setstepTwo({
                ...stepTwo,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: false,
                confirmAlarm: true,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: false,
                isAlarmLoading: true,
                isDisableconfirmAlarm: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log(stepTwo)
            let data = [{
                "CM-2-Mode": 40,
                "CM2-ALM": stepTwo.setAlarm
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'second', "mode2-alarm", data)
                .then((res) => {
                    console.log("get Alarm data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "second")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepTwo({
                                            ...stepTwo,
                                            isAlarmLoading: false,
                                            isAlarmTick: true,
                                            isAlarmTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: false,
                                            confirmAlarm: true
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear alarm interval Sec')
                        clearInterval(interval);
                        setclearSecAlarm(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Alarm val can't empty!")
        }
    }
    //StepThree Confirm Handler
    const stepThreeManualCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        setstepThree({
            ...stepThree,
            confirmManual: true,
            confirmHAVC: false,
            confirmTimer: false,
            confirmAlarm: false,
            isManualLoading: true,
            isHVACLoading: false,
            isTimerLoading: false,
            isAlarmLoading: false,
            isDisableconfirmManual: true,
            isDisableManual: true,
            isDisableHAVC: true,
            isDisabletimer: true,
            isDisablealarm: true,
        })
        console.log(stepThree)
        let mamualVal = stepThree.manual
        let switchVal = stepThree.switch
        console.log("mamual", mamualVal)
        console.log("switchVal", switchVal)
        let data = [{
            "CM-3-Mode": 10,
            "CM-3-On-Off": switchVal
        }]
        console.log("data", stepThree)
        UserService.postControlData(device_id, userID, "third", "mode3-manual", data)
            .then((res) => {
                console.log("get Alarm data------------------", res.data)
                const interval = setInterval(() => {
                    console.log("call check acknoledgement for device 1 Timer")
                    if (device_id != '' && userID != '') {
                        UserService.GetControlDeviceData(device_id, userID, "third")
                            .then(res => {
                                let controlData = res.data.data.deviceInfo
                                console.log("controlDeviceData", controlData)
                                if (controlData.is_acknowledgement_updated == "true") {
                                    console.log("got acknowledgement")
                                    setstepThree({
                                        ...stepThree,
                                        isManualLoading: false,
                                        isManualTick: true,
                                        confirmManual: true,
                                        confirmHAVC: false,
                                        confirmTimer: false,
                                        confirmAlarm: false
                                    })
                                    setCheckTick(Math.random())
                                    clearInterval(interval);
                                }
                            }).catch(err => {
                                console.log('err', err)
                            })
                    }
                }, 5000)
                setTimeout(() => {
                    console.log('clear third manual interval')
                    clearInterval(interval);
                    setclearTManual(Math.random())
                }, 60000) // 1min
            }).catch(err => {
                console.log(err)
            })
    }
    const stepThreeHVACCfmHandler = () => {
        let HVACVal = stepThree.HAVC
        let setPointsVal = stepThree.setPoints
        if (setPointsVal != '') {
            //call API
            setstepThree({
                ...stepThree,
                confirmManual: false,
                confirmHAVC: true,
                confirmTimer: false,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: true,
                isTimerLoading: false,
                isAlarmLoading: false,
                isDisableconfirmHAVC: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            let data = [{
                "CM-3-Mode": 20,
                "CM-3-Temp-SP": setPointsVal,
            }]
            console.log(data)
            if (isDeviceStatus != 'green') {
                toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
                return false
            }

            UserService.postControlData(device_id, userID, 'third', "mode3-hvac", data)
                .then((res) => {
                    console.log("get HVAC data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 HVAC")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "third")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepThree({
                                            ...stepThree,
                                            isHVACLoading: false,
                                            isHVACTick: true,
                                            confirmManual: false,
                                            confirmHAVC: true,
                                            confirmTimer: false,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                    setTimeout(() => {
                                        console.log('clear third Hvac interval')
                                        clearInterval(interval);
                                        setclearTHVAC(Math.random())
                                    }, 60000) // 1min
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Set Points can't be empty!")
        }
        console.log("HVAC", HVACVal)
        console.log("setPointsVal", setPointsVal)
    }
    const stepThreeTimerCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let turnOn = stepThree.turnOn;
        let turnOff = stepThree.turnOff;
        if (turnOn != '' && turnOff != '') {
            setstepThree({
                ...stepThree,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: true,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: true,
                isAlarmLoading: false,
                isDisableconfirmTimer: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log(stepThree)
            let data = [{
                "CM-3-Mode": 30,
                "CM-3-T-ON": stepThree.turnOn,
                "CM-3-T-OFF": stepThree.turnOff,
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'third', "mode3-timer", data)
                .then((res) => {
                    console.log("get Timer data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "third")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepThree({
                                            ...stepThree,
                                            isTimerLoading: false,
                                            isTimerTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: true,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear third timer interval')
                        clearInterval(interval);
                        setclearTTimer(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Turn on and turn off can't be empty!")
        }
    }
    const stepThreeAlarmCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let alarmVal = stepThree.setAlarm
        console.log(stepThree)
        console.log("alarm val", alarmVal)
        if (alarmVal != '') {
            //call API
            setstepThree({
                ...stepThree,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: false,
                confirmAlarm: true,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: false,
                isAlarmLoading: true,
                isDisableconfirmAlarm: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log(stepThree)
            let data = [{
                "CM-3-Mode": 40,
                "CM3-ALM": stepThree.setAlarm
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'third', "mode3-alarm", data)
                .then((res) => {
                    console.log("get Alarm data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "third")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepThree({
                                            ...stepThree,
                                            isAlarmLoading: false,
                                            isAlarmTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: false,
                                            confirmAlarm: true
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear third alarm interval')
                        clearInterval(interval);
                        setclearTAlarm(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Alarm val can't empty!")
        }
    }
    //StepFour Confirm Handler
    const stepFourManualCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        setstepFour({
            ...stepFour,
            confirmManual: true,
            confirmHAVC: false,
            confirmTimer: false,
            confirmAlarm: false,
            isManualLoading: true,
            isHVACLoading: false,
            isTimerLoading: false,
            isAlarmLoading: false,
            isDisableconfirmManual: true,
            isDisableManual: true,
            isDisableHAVC: true,
            isDisabletimer: true,
            isDisablealarm: true,
        })
        console.log(stepFour)
        let mamualVal = stepFour.manual
        let switchVal = stepFour.switch
        console.log("mamual", mamualVal)
        console.log("switchVal", switchVal)
        let data = [{
            "CM-4-Mode": 10,
            "CM-4-On-Off": switchVal
        }]
        console.log("data", stepFour)

        UserService.postControlData(device_id, userID, "four", "mode4-manual", data)
            .then((res) => {
                console.log("get Alarm data------------------", res.data)
                const interval = setInterval(() => {
                    console.log("call check acknoledgement for device 1 Timer")
                    if (device_id != '' && userID != '') {
                        UserService.GetControlDeviceData(device_id, userID, "four")
                            .then(res => {
                                let controlData = res.data.data.deviceInfo
                                console.log("controlDeviceData", controlData)
                                if (controlData.is_acknowledgement_updated == "true") {
                                    console.log("got acknowledgement")
                                    setstepFour({
                                        ...stepFour,
                                        isManualLoading: false,
                                        isManualTick: true,
                                        confirmManual: true,
                                        confirmHAVC: false,
                                        confirmTimer: false,
                                        confirmAlarm: false
                                    })
                                    setCheckTick(Math.random())
                                    clearInterval(interval);
                                }
                            }).catch(err => {
                                console.log('err', err)
                            })
                    }
                }, 5000)
                setTimeout(() => {
                    console.log('clear fourth manual interval')
                    clearInterval(interval);
                    setclearFouManual(Math.random())
                }, 60000) // 1min
            }).catch(err => {
                console.log(err)
            })
    }
    const stepFourHVACCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let HVACVal = stepFour.HAVC
        let setPointsVal = stepFour.setPoints
        if (setPointsVal != '') {
            //call API
            setstepFour({
                ...stepFour,
                confirmManual: false,
                confirmHAVC: true,
                confirmTimer: false,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: true,
                isTimerLoading: false,
                isAlarmLoading: false,
                isDisableconfirmHAVC: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            let data = [{
                "CM-4-Mode": 20,
                "CM-4-Temp-SP": setPointsVal,
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'four', "mode4-hvac", data)
                .then((res) => {
                    console.log("get HVAC data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 HVAC")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "four")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepFour({
                                            ...stepFour,
                                            isHVACLoading: false,
                                            isHVACTick: true,
                                            confirmManual: false,
                                            confirmHAVC: true,
                                            confirmTimer: false,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear fourth hvac interval')
                        clearInterval(interval);
                        setclearFouHVAC(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Set Points can't be empty!")
        }
        console.log("HVAC", HVACVal)
        console.log("setPointsVal", setPointsVal)
    }
    const stepFourTimerCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let turnOn = stepFour.turnOn;
        let turnOff = stepFour.turnOff;
        if (turnOn != '' && turnOff != '') {
            setstepFour({
                ...stepFour,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: true,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: true,
                isAlarmLoading: false,
                isDisableconfirmTimer: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log(stepFour)
            let data = [{
                "CM-4-Mode": 30,
                "CM-4-T-ON": stepFour.turnOn,
                "CM-4-T-OFF": stepFour.turnOff,
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'four', "mode4-timer", data)
                .then((res) => {
                    console.log("get Timer data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "four")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepFour({
                                            ...stepFour,
                                            isTimerLoading: false,
                                            isTimerTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: true,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear fourth timer interval')
                        clearInterval(interval);
                        setclearFouTimer(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Turn on and turn off can't be empty!")
        }
    }
    const stepFourAlarmCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let alarmVal = stepFour.setAlarm
        console.log(stepFour)
        console.log("alarm val", alarmVal)
        if (alarmVal != '') {
            //call API
            setstepFour({
                ...stepFour,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: false,
                confirmAlarm: true,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: false,
                isAlarmLoading: true,
                isDisableconfirmAlarm: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log(stepFour)
            let data = [{
                "CM-4-Mode": 40,
                "CM4-ALM": stepFour.setAlarm
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'four', "mode4-alarm", data)
                .then((res) => {
                    console.log("get Alarm data------------------", res.data)
                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "four")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepFour({
                                            ...stepFour,
                                            isAlarmLoading: false,
                                            isAlarmTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: false,
                                            confirmAlarm: true
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear fourth timer interval')
                        clearInterval(interval);
                        setclearFouAlarm(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Alarm val can't empty!")
        }
    }
    //StepFive Confirm Handler
    const stepFiveManualCfmHandler = () => {
        setstepFive({
            ...stepFive,
            confirmManual: true,
            confirmHAVC: false,
            confirmTimer: false,
            confirmAlarm: false,
            isManualLoading: true,
            isHVACLoading: false,
            isTimerLoading: false,
            isAlarmLoading: false,
            isDisableconfirmManual: true,
            isDisableManual: true,
            isDisableHAVC: true,
            isDisabletimer: true,
            isDisablealarm: true,
        })
        console.log(stepFive)
        let mamualVal = stepFive.manual
        let switchVal = stepFive.switch
        console.log("mamual", mamualVal)
        console.log("switchVal", switchVal)
        let data = [{
            "CM-5-Mode": 10,
            "CM-5-On-Off": switchVal
        }]
        console.log("data", stepFive)
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        UserService.postControlData(device_id, userID, "five", "mode5-manual", data)
            .then((res) => {
                console.log("get Alarm data------------------", res.data)

                const interval = setInterval(() => {
                    console.log("call check acknoledgement for device 5 manual")
                    if (device_id != '' && userID != '') {
                        UserService.GetControlDeviceData(device_id, userID, "five")
                            .then(res => {
                                let controlData = res.data.data.deviceInfo
                                console.log("controlDeviceData", controlData)
                                if (controlData.is_acknowledgement_updated == "true") {
                                    console.log("got acknowledgement")
                                    setstepFive({
                                        ...stepFive,
                                        isManualLoading: false,
                                        isManualTick: true,
                                        confirmManual: true,
                                        confirmHAVC: false,
                                        confirmTimer: false,
                                        confirmAlarm: false
                                    })
                                    setCheckTick(Math.random())
                                    clearInterval(interval);
                                }
                            }).catch(err => {
                                console.log('err', err)
                            })
                    }
                }, 5000)
                setTimeout(() => {
                    console.log('clear five manual interval')
                    clearInterval(interval);
                    setclearFivManual(Math.random())
                }, 60000) // 1min
            }).catch(err => {
                console.log(err)
            })
    }
    const stepFiveHVACCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let HVACVal = stepFive.HAVC
        let setPointsVal = stepFive.setPoints
        if (setPointsVal != '') {
            //call API
            setstepFive({
                ...stepFive,
                confirmManual: false,
                confirmHAVC: true,
                confirmTimer: false,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: true,
                isTimerLoading: false,
                isAlarmLoading: false,
                isDisableconfirmHAVC: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            let data = [{
                "CM-5-Mode": 20,
                "CM-5-Temp-SP": setPointsVal,
            }]
            console.log(data)

            UserService.postControlData(device_id, userID, 'five', "mode5-hvac", data)
                .then((res) => {
                    console.log("get HVAC data------------------", res.data)

                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 5 HVAC")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "five")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepFive({
                                            ...stepFive,
                                            isHVACLoading: false,
                                            isHVACTick: true,
                                            confirmManual: false,
                                            confirmHAVC: true,
                                            confirmTimer: false,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear five hvac interval')
                        clearInterval(interval);
                        setclearFivHVAC(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Set Points can't be empty!")
        }
        console.log("HVAC", HVACVal)
        console.log("setPointsVal", setPointsVal)
    }
    const stepFiveTimerCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let turnOn = stepFive.turnOn;
        let turnOff = stepFive.turnOff;
        if (turnOn != '' && turnOff != '') {
            setstepFive({
                ...stepFive,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: true,
                confirmAlarm: false,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: true,
                isAlarmLoading: false,
                isDisableconfirmTimer: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisabletimer: true,
                isDisablealarm: true,
            })
            console.log(stepFive)
            let data = [{
                "CM-5-Mode": 30,
                "CM-5-T-ON": stepFive.turnOn,
                "CM-5-T-OFF": stepFive.turnOff,
            }]
            console.log(data)
            UserService.postControlData(device_id, userID, 'five', "mode5-timer", data)
                .then((res) => {
                    console.log("get Timer data------------------", res.data)

                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 5 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "five")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepFive({
                                            ...stepFive,
                                            isTimerLoading: false,
                                            isTimerTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: true,
                                            confirmAlarm: false
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }
                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear five timer interval')
                        clearInterval(interval);
                        setclearFivTimer(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Turn on and turn off can't be empty!")
        }
    }
    const stepFiveAlarmCfmHandler = () => {
        if (isDeviceStatus != 'green') {
            toast.info("Device is offline, make device online for use control commands!", { toastId: 1 })
            return false
        }
        let alarmVal = stepFive.setAlarm
        console.log(stepFive)
        console.log("alarm val", alarmVal)
        if (alarmVal != '') {
            //call API
            setstepFive({
                ...stepFive,
                confirmManual: false,
                confirmHAVC: false,
                confirmTimer: false,
                confirmAlarm: true,
                isManualLoading: false,
                isHVACLoading: false,
                isTimerLoading: false,
                isAlarmLoading: true,
                isDisableconfirmAlarm: true,
                isDisableManual: true,
                isDisableHAVC: true,
                isDisablealarm: true,
            })
            console.log(stepFive)
            let data = [{
                "CM-5-Mode": 40,
                "CM5-ALM": stepFive.setAlarm
            }]
            console.log(data)

            UserService.postControlData(device_id, userID, 'five', "mode5-alarm", data)
                .then((res) => {
                    console.log("get Alarm data------------------", res.data)

                    const interval = setInterval(() => {
                        console.log("call check acknoledgement for device 1 Timer")
                        if (device_id != '' && userID != '') {
                            UserService.GetControlDeviceData(device_id, userID, "five")
                                .then(res => {
                                    let controlData = res.data.data.deviceInfo
                                    console.log("controlDeviceData", controlData)
                                    if (controlData.is_acknowledgement_updated == "true") {
                                        console.log("got acknowledgement")
                                        setstepFive({
                                            ...stepFive,
                                            isAlarmLoading: false,
                                            isAlarmTick: true,
                                            confirmManual: false,
                                            confirmHAVC: false,
                                            confirmTimer: false,
                                            confirmAlarm: true
                                        })
                                        setCheckTick(Math.random())
                                        clearInterval(interval);
                                    }

                                }).catch(err => {
                                    console.log('err', err)
                                })
                        }
                    }, 5000)
                    setTimeout(() => {
                        console.log('clear five alarm interval')
                        clearInterval(interval);
                        setclearFivAlarm(Math.random())
                    }, 60000) // 1min
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Alarm val can't empty!")
        }
    }

    return (
        <>
            <div className="container">
                <h2 style={{ textAlign: "center", margin: 20, color: "#5a5757" }}>Devices Controls</h2>
                <div className="row control-row">
                    <div className="col-md-2 mb-3" style={{ marginTop: 13 }}>
                        <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className={`nav-link active ${isSharedDevice == "true" ? 'disabled' : null}`} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{firstDeviceName}</a>
                                <a className={`${isSharedDevice == "true" ? 'disabled' : null}`} onClick={() => onOpenModal(firstDeviceName, "firstDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${isSharedDevice == "true" ? 'disabled' : null}`} id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">{secondDeviceName}</a>
                                <a className={`${isSharedDevice == "true" ? 'disabled' : null}`} onClick={() => onOpenModal(secondDeviceName, "secondDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${isSharedDevice == "true" ? 'disabled' : null}`} id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">{thirdDeviceName}</a>
                                <a className={`${isSharedDevice == "true" ? 'disabled' : null}`} onClick={() => onOpenModal(thirdDeviceName, "thirdDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${isSharedDevice == "true" ? 'disabled' : null}`} id="command-tab" data-toggle="tab" href="#command" role="tab" aria-controls="command" aria-selected="false">{fourthDeviceName}</a>
                                <a className={`${isSharedDevice == "true" ? 'disabled' : null}`} onClick={() => onOpenModal(fourthDeviceName, "fourthDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${isSharedDevice == "true" ? 'disabled' : null}`} id="command-tab" data-toggle="tab" href="#commandfive" role="tab" aria-controls="command" aria-selected="false">{fivethhDeviceName}</a>
                                <a className={`${isSharedDevice == "true" ? 'disabled' : null}`} onClick={() => onOpenModal(fivethhDeviceName, "fivethhDeviceName")} style={editButtonIcon}><i class="fa fa-edit"></i></a>
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
                                                <Button variant="contained" size="large" disabled={stepOne.isDisableManual ? true : false} onClick={oneManualHandler} className={`btn btn-secondary btn-sm ${stepOne.manual ? 'active-dc-btn' : null} ${stepOne.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked disabled={stepOne.isDisableswitch ? true : false} onChange={stepOneSwitchHandler} checked={stepOne.switch} />
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepOne.isDisableconfirmManual ? true : false} onClick={stepOneManualCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>

                                                    {(stepOne.isDisableconfirmManual && stepOne.isManualLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepOne.isManualTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepOne.isDisableHAVC ? true : false} onClick={oneHVACHandler} className={`btn btn-secondary btn-sm ${stepOne.HAVC ? 'active-dc-btn' : null} ${stepOne.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepOne({
                                                                    ...stepOne,
                                                                    setPoints: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            name='set_input'
                                                            value={stepOne.setPoints}
                                                            placeholder='Enter Points'
                                                            disabled={stepOne.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepOne.isDisableconfirmHAVC ? true : false} onClick={stepOneHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>

                                                    {(stepOne.isDisableconfirmHAVC && stepOne.isHVACLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepOne.isHVACTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepOne.isDisabletimer ? true : false} onClick={oneTimerHandler} className={`btn btn-secondary btn-sm ${stepOne.timer ? 'active-dc-btn' : null} ${stepOne.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepOne({
                                                                    ...stepOne,
                                                                    turnOn: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepOne.turnOn}
                                                            placeholder='Enter start time'
                                                            disabled={stepOne.isTurnOnDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepOne({
                                                                    ...stepOne,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepOne.turnOn}
                                                            className="form-control"
                                                            disabled={stepOne.isTurnOnDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepOne({
                                                                    ...stepOne,
                                                                    turnOff: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepOne.turnOff}
                                                            placeholder='Enter end time'
                                                            disabled={stepOne.isTurnOffDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepOne({
                                                                    ...stepOne,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepOne.turnOff}
                                                            className="form-control"
                                                            disabled={stepOne.isTurnOffDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepOne.isDisableconfirmTimer ? true : false} onClick={stepOneTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepOne.isDisableconfirmTimer && stepOne.isTimerLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepOne.isTimerTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepOne.isDisablealarm ? true : false} onClick={oneAlarmHandler} className={`btn btn-secondary btn-sm ${stepOne.alarm ? 'active-dc-btn' : null} ${stepOne.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepOne({
                                                                    ...stepOne,
                                                                    setAlarm: event.target.value
                                                                })
                                                            }}
                                                            value={stepOne.setAlarm}
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepOne.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepOne.isDisableconfirmAlarm ? true : false} onClick={stepOneAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmAlarm ? 'active-confirm-btn' : null} `} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepOne.isDisableconfirmAlarm && stepOne.isAlarmLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepOne.isAlarmTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
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
                                                <Button variant="contained" size="large" disabled={stepTwo.isDisableManual ? true : false} onClick={twoManualHandler} className={`btn btn-secondary btn-sm ${stepTwo.manual ? 'active-dc-btn' : null} ${stepTwo.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked disabled={stepTwo.isDisableswitch ? true : false} onChange={stepTwoSwitchHandler} checked={stepTwo.switch} />
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepTwo.isDisableconfirmManual ? true : false} onClick={stepTwoManualCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepTwo.isDisableconfirmManual && stepTwo.isManualLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepTwo.isManualTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepTwo.isDisableHAVC ? true : false} onClick={twoHVACHandler} className={`btn btn-secondary btn-sm ${stepTwo.HAVC ? 'active-dc-btn' : null} ${stepTwo.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepTwo({
                                                                    ...stepTwo,
                                                                    setPoints: event.target.value
                                                                })
                                                            }}
                                                            className='form-control' name='set_input'
                                                            value={stepTwo.setPoints}
                                                            placeholder='Enter Points'
                                                            disabled={stepTwo.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepTwo.isDisableconfirmHAVC ? true : false} onClick={stepTwoHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepTwo.isDisableconfirmHAVC && stepTwo.isHVACLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepTwo.isHVACTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepTwo.isDisabletimer ? true : false} onClick={twoTimerHandler} className={`btn btn-secondary btn-sm ${stepTwo.timer ? 'active-dc-btn' : null} ${stepTwo.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepTwo({
                                                                    ...stepTwo,
                                                                    turnOn: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepTwo.turnOn}
                                                            placeholder='Enter start time'
                                                            disabled={stepTwo.isTurnOnDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepTwo({
                                                                    ...stepTwo,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepTwo.turnOn}
                                                            className="form-control"
                                                            disabled={stepTwo.isTurnOnDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepTwo({
                                                                    ...stepTwo,
                                                                    turnOff: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepTwo.turnOff}
                                                            placeholder='Enter end time'
                                                            disabled={stepTwo.isTurnOffDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepTwo({
                                                                    ...stepTwo,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepTwo.turnOff}
                                                            className="form-control"
                                                            disabled={stepTwo.isTurnOffDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepTwo.isDisableconfirmTimer ? true : false} onClick={stepTwoTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepTwo.isDisableconfirmTimer && stepTwo.isTimerLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepTwo.isTimerTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepTwo.isDisablealarm ? true : false} onClick={twoAlarmHandler} className={`btn btn-secondary btn-sm ${stepTwo.alarm ? 'active-dc-btn' : null} ${stepTwo.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepTwo({
                                                                    ...stepTwo,
                                                                    setAlarm: event.target.value
                                                                })
                                                            }}
                                                            value={stepTwo.setAlarm}
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepTwo.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepTwo.isDisableconfirmAlarm ? true : false} onClick={stepTwoAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepTwo.isDisableconfirmAlarm && stepTwo.isAlarmLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepTwo.isAlarmTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
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
                                                <Button variant="contained" size="large" disabled={stepThree.isDisableManual ? true : false} onClick={threeManualHandler} className={`btn btn-secondary btn-sm ${stepThree.manual ? 'active-dc-btn' : null} ${stepThree.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked disabled={stepThree.isDisableswitch ? true : false} onChange={stepThreeSwitchHandler} checked={stepThree.switch} />
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepThree.isDisableconfirmManual ? true : false} onClick={stepThreeManualCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepThree.isDisableconfirmManual && stepThree.isManualLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepThree.isManualTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepThree.isDisableHAVC ? true : false} onClick={threeHVACHandler} className={`btn btn-secondary btn-sm ${stepThree.HAVC ? 'active-dc-btn' : null} ${stepThree.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepThree({
                                                                    ...stepThree,
                                                                    setPoints: event.target.value
                                                                })
                                                            }}
                                                            className='form-control' name='set_input'
                                                            value={stepThree.setPoints}
                                                            placeholder='Enter Points'
                                                            disabled={stepThree.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepThree.isDisableconfirmHAVC ? true : false} onClick={stepThreeHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepThree.isDisableconfirmHAVC && stepThree.isHVACLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepThree.isHVACTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepThree.isDisabletimer ? true : false} onClick={threeTimerHandler} className={`btn btn-secondary btn-sm ${stepThree.timer ? 'active-dc-btn' : null} ${stepThree.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepThree({
                                                                    ...stepThree,
                                                                    turnOn: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepThree.turnOn}
                                                            placeholder='Enter start time'
                                                            disabled={stepThree.isTurnOnDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepThree({
                                                                    ...stepThree,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepThree.turnOn}
                                                            className="form-control"
                                                            disabled={stepThree.isTurnOnDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepThree({
                                                                    ...stepThree,
                                                                    turnOff: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepThree.turnOff}
                                                            placeholder='Enter end time'
                                                            disabled={stepThree.isTurnOnDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepThree({
                                                                    ...stepThree,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepThree.turnOff}
                                                            className="form-control"
                                                            disabled={stepThree.isTurnOffDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepThree.isDisableconfirmTimer ? true : false} onClick={stepThreeTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepThree.isDisableconfirmTimer && stepThree.isTimerLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepThree.isTimerTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepThree.isDisablealarm ? true : false} onClick={threeAlarmHandler} className={`btn btn-secondary btn-sm ${stepThree.alarm ? 'active-dc-btn' : null} ${stepThree.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepThree({
                                                                    ...stepThree,
                                                                    setAlarm: event.target.value
                                                                })
                                                            }}
                                                            value={stepThree.setAlarm}
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepThree.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepThree.isDisableconfirmAlarm ? true : false} onClick={stepThreeAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepThree.isDisableconfirmAlarm && stepThree.isAlarmLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepThree.isAlarmTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
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
                                                <Button variant="contained" size="large" disabled={stepFour.isDisableManual ? true : false} onClick={fourManualHandler} className={`btn btn-secondary btn-sm ${stepFour.manual ? 'active-dc-btn' : null} ${stepFour.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked disabled={stepFour.isDisableswitch ? true : false} onChange={stepFourSwitchHandler} checked={stepFour.switch} />
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepFour.isDisableconfirmManual ? true : false} onClick={stepFourManualCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepFour.isDisableconfirmManual && stepFour.isManualLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepFour.isManualTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFour.isDisableHAVC ? true : false} onClick={fourHVACHandler} className={`btn btn-secondary btn-sm ${stepFour.HAVC ? 'active-dc-btn' : null} ${stepFour.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepFour({
                                                                    ...stepFour,
                                                                    setPoints: event.target.value
                                                                })
                                                            }}
                                                            className='form-control' name='set_input'
                                                            placeholder='Enter Points'
                                                            value={stepFour.setPoints}
                                                            disabled={stepFour.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepFour.isDisableconfirmHAVC ? true : false} onClick={stepFourHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepFour.isDisableconfirmHAVC && stepFour.isHVACLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepFour.isHVACTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFour.isDisabletimer ? true : false} onClick={fourTimerHandler} className={`btn btn-secondary btn-sm ${stepFour.timer ? 'active-dc-btn' : null} ${stepFour.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepFour({
                                                                    ...stepFour,
                                                                    turnOn: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepFour.turnOn}
                                                            placeholder='Enter start time'
                                                            disabled={stepFour.isTurnOnDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepFour({
                                                                    ...stepFour,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepFour.turnOn}
                                                            className="form-control"
                                                            disabled={stepFour.isTurnOnDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepFour({
                                                                    ...stepFour,
                                                                    turnOff: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepFour.turnOff}
                                                            placeholder='Enter end time'
                                                            disabled={stepFour.isTurnOffDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepFour({
                                                                    ...stepFour,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepFour.turnOff}
                                                            className="form-control"
                                                            disabled={stepFour.isTurnOffDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepFour.isDisableconfirmTimer ? true : false} onClick={stepFourTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepFour.isDisableconfirmTimer && stepFour.isTimerLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepFour.isTimerTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFour.isDisablealarm ? true : false} onClick={fourAlarmHandler} className={`btn btn-secondary btn-sm ${stepFour.alarm ? 'active-dc-btn' : null} ${stepFour.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepFour({
                                                                    ...stepFour,
                                                                    setAlarm: event.target.value
                                                                })
                                                            }}
                                                            value={stepFour.setAlarm}
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepFour.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepFour.isDisableconfirmAlarm ? true : false} onClick={stepFourAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepFour.isDisableconfirmAlarm && stepFour.isAlarmLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepFour.isAlarmTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="commandfive" role="tabpanel" aria-labelledby="command-tab">
                                <table class="table table-hover">

                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFive.isDisableManual ? true : false} onClick={fiveManualHandler} className={`btn btn-secondary btn-sm ${stepFive.manual ? 'active-dc-btn' : null} ${stepFive.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Manual</Button>
                                            </td>
                                            <td>
                                                <Switch {...label} defaultChecked disabled={stepFive.isDisableswitch ? true : false} onChange={stepFiveSwitchHandler} checked={stepFive.switch} />
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepFive.isDisableconfirmManual ? true : false} onClick={stepFiveManualCfmHandler} className={`btn btn-secondary btn-sm ${stepFive.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepFive.isDisableconfirmManual && stepFive.isManualLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepFive.isManualTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFive.isDisableHAVC ? true : false} onClick={fiveHVACHandler} className={`btn btn-secondary btn-sm ${stepFive.HAVC ? 'active-dc-btn' : null} ${stepFive.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>HVAC</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Set Points
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepFive({
                                                                    ...stepFive,
                                                                    setPoints: event.target.value
                                                                })
                                                            }}
                                                            className='form-control' name='set_input'
                                                            placeholder='Enter Points'
                                                            value={stepFive.setPoints}
                                                            disabled={stepFive.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepFive.isDisableconfirmHAVC ? true : false} onClick={stepFiveHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepFive.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepFive.isDisableconfirmHAVC && stepFive.isHVACLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepFive.isHVACTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFive.isDisabletimer ? true : false} onClick={fiveTimerHandler} className={`btn btn-secondary btn-sm ${stepFive.timer ? 'active-dc-btn' : null} ${stepFive.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Timer</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn On
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepFive({
                                                                    ...stepFive,
                                                                    turnOn: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepFive.turnOn}
                                                            placeholder='Enter start time'
                                                            disabled={stepFive.isTurnOnDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepFive({
                                                                    ...stepFive,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepFive.turnOn}
                                                            className="form-control"
                                                            disabled={stepFive.isTurnOnDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="text"
                                                            onChange={(event) => {
                                                                setstepFive({
                                                                    ...stepFive,
                                                                    turnOff: event.target.value
                                                                })
                                                            }}
                                                            className='form-control'
                                                            value={stepFive.turnOff}
                                                            placeholder='Enter end time'
                                                            disabled={stepFive.isTurnOffDisable ? true : false}
                                                        />
                                                        {/* <TimePicker
                                                            onChange={(val) => {
                                                                setstepFive({
                                                                    ...stepFive,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepFive.turnOff}
                                                            className="form-control"
                                                            disabled={stepFive.isTurnOffDisable ? true : false}
                                                        /> */}
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepFive.isDisableconfirmTimer ? true : false} onClick={stepFiveTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepFive.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepFive.isDisableconfirmTimer && stepFive.isTimerLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepFive.isTimerTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFive.isDisablealarm ? true : false} onClick={fiveAlarmHandler} className={`btn btn-secondary btn-sm ${stepFive.alarm ? 'active-dc-btn' : null} ${stepFive.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Alarm</Button>
                                            </td>
                                            <td>
                                                <div className='row'>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Alarm
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <input
                                                            type="number"
                                                            onChange={(event) => {
                                                                setstepFive({
                                                                    ...stepFive,
                                                                    setAlarm: event.target.value
                                                                })
                                                            }}
                                                            value={stepFive.setAlarm}
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepFive.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Stack direction={'row'} spacing={1}>
                                                    <Button variant="contained" size="large" disabled={stepFive.isDisableconfirmAlarm ? true : false} onClick={stepFiveAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepFive.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
                                                    {(stepFive.isDisableconfirmAlarm && stepFive.isAlarmLoading)
                                                        ?
                                                        <CircularProgress size={35} sx={{ color: '#fff' }} />
                                                        :
                                                        stepFive.isAlarmTick ? <CheckCircleOutlineIcon sx={{ color: '#0f0', fontSize: '40px' }} /> : <CheckCircleOutlineIcon sx={{ color: 'gray', fontSize: '40px' }} />
                                                    }
                                                </Stack>
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