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

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const Control = ({ device_id, isSharedDevice }) => {
    console.log("device_id------------------------", device_id, isSharedDevice)
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
        setPoints: false,
        timer: false,
        turnOn: dt.format("HH:mm"),
        turnOff: dt.format("HH:mm"),
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
    })
    const [stepTwo, setstepTwo] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        setPoints: false,
        timer: false,
        turnOn: dt.format("HH:mm"),
        turnOff: dt.format("HH:mm"),
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
    })
    const [stepThree, setstepThree] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        setPoints: false,
        timer: false,
        turnOn: dt.format("HH:mm"),
        turnOff: dt.format("HH:mm"),
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
    })
    const [stepFour, setstepFour] = useState({
        manual: false,
        switch: false,
        HAVC: false,
        setPoints: false,
        timer: false,
        turnOn: dt.format("HH:mm"),
        turnOff: dt.format("HH:mm"),
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
    })

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
    //----------------------------------------- useEffect Section End ------------------------------------------

    const onChange = (timeValue) => {
        setValues(timeValue);
        setstepOne({
            ...stepOne,
            turnOn: timeValue
        })
        console.log(stepOne.turnOn)
    }

    //StepOne Confirm Handlers
    const stepOneManualCfmHandler = () => {
        setstepOne({
            ...stepOne,
            confirmManual: true,
            confirmHAVC: false,
            confirmTimer: false,
            confirmAlarm: false,
        })
        let mamualVal = stepOne.manual
        let switchVal = stepOne.switch
        console.log("mamual", mamualVal)
        console.log("switchVal", switchVal)
        let data = [{
            "CM-1-Mode": 10,
            "CM-1-On-Off": switchVal
        }]
        console.log("data", stepOne)
        UserService.postControlData(device_id,"mode1-manual",data)
            .then((res) => {
                console.log("get Manual data------------------", res.data)
            }).catch(err => {
                console.log(err)
            })
    }
    const stepOneHVACCfmHandler = () => {

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
            })
            let data =[{
                "CM-1-Mode": 20,
                "CM-1-Temp-SP": setPointsVal,
            }]
            console.log(data)
            UserService.postControlData(device_id,"mode1-hvac",data)
            .then((res) => {
                console.log("get HVAC data------------------", res.data)
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
        setstepOne({
            ...stepOne,
            confirmManual: false,
            confirmHAVC: false,
            confirmTimer: true,
            confirmAlarm: false,
        })
        console.log(stepOne)
        let data =[{
            "CM-1-Mode": 30,
            "CM-1-T-ON": stepOne.turnOn,
            "CM-1-T-OFF": stepOne.turnOff,
        }]
        console.log(data)
        UserService.postControlData(device_id,"mode1-timer",data)
        .then((res) => {
            console.log("get Timer data------------------", res.data)
        }).catch(err => {
            console.log(err)
        })
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
            })
            console.log(stepOne)
            let data =[{
                "CM-1-Mode": 40,
                "CM1-ALM": stepOne.setAlarm
            }]
            console.log(data)
            UserService.postControlData(device_id,"mode1-alarm",data)
            .then((res) => {
                console.log("get Alarm data------------------", res.data)
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
        UserService.postControlData(device_id,"mode2-manual",data)
            .then((res) => {
                console.log("get Manual data------------------", res.data)
            }).catch(err => {
                console.log(err)
            })
        
    }
    const stepTwoHVACCfmHandler = () => {
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
            })
            let data =[{
                "CM-2-Mode": 20,
                "CM-2-Temp-SP": setPointsVal,
            }]
            console.log(data)
            UserService.postControlData(device_id,"mode2-hvac",data)
            .then((res) => {
                console.log("get HVAC data------------------", res.data)
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
        setstepTwo({
            ...stepTwo,
            confirmManual: false,
            confirmHAVC: false,
            confirmTimer: true,
            confirmAlarm: false,
        })
        console.log(stepTwo)
        let data =[{
            "CM-2-Mode": 30,
            "CM-2-T-ON": stepTwo.turnOn,
            "CM-2-T-OFF": stepTwo.turnOff,
        }]
        console.log(data)
        UserService.postControlData(device_id,"mode2-timer",data)
        .then((res) => {
            console.log("get Timer data------------------", res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const stepTwoAlarmCfmHandler = () => {
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
            })
            console.log(stepTwo)
            let data =[{
                "CM-2-Mode": 40,
                "CM2-ALM": stepTwo.setAlarm
            }]
            console.log(data)
            UserService.postControlData(device_id,"mode2-alarm",data)
            .then((res) => {
                console.log("get Alarm data------------------", res.data)
            }).catch(err => {
                console.log(err)
            })
        } else {
            alert("Alarm val can't empty!")
        }
    }
    //StepThree Confirm Handler
    const stepThreeManualCfmHandler = () => {
        setstepThree({
            ...stepThree,
            confirmManual: true,
            confirmHAVC: false,
            confirmTimer: false,
            confirmAlarm: false,
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
        UserService.postControlData(device_id,"mode3-manual",data)
            .then((res) => {
                console.log("get Manual data------------------", res.data)
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
            })
            let data =[{
                "CM-3-Mode": 20,
                "CM-3-Temp-SP": setPointsVal,
            }]
            console.log(data)
            UserService.postControlData(device_id,"mode3-hvac",data)
            .then((res) => {
                console.log("get HVAC data------------------", res.data)
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
        setstepThree({
            ...stepThree,
            confirmManual: false,
            confirmHAVC: false,
            confirmTimer: true,
            confirmAlarm: false,
        })
        console.log(stepThree)
        let data =[{
            "CM-3-Mode": 30,
            "CM-3-T-ON": stepThree.turnOn,
            "CM-3-T-OFF": stepThree.turnOff,
        }]
        console.log(data)
        UserService.postControlData(device_id,"mode3-timer",data)
        .then((res) => {
            console.log("get Timer data------------------", res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const stepThreeAlarmCfmHandler = () => {
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
            })
            console.log(stepThree)
            let data =[{
                "CM-3-Mode": 40,
                "CM3-ALM": stepThree.setAlarm
            }]
            console.log(data)
            UserService.postControlData(device_id,"mode3-alarm",data)
            .then((res) => {
                console.log("get Alarm data------------------", res.data)
            }).catch(err => {
                console.log(err)
            })
        } else {
            alert("Alarm val can't empty!")
        }
    }
    //StepFour Confirm Handler
    const stepFourManualCfmHandler = () => {
        setstepFour({
            ...stepFour,
            confirmManual: true,
            confirmHAVC: false,
            confirmTimer: false,
            confirmAlarm: false,
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
        UserService.postControlData(device_id,"mode4-manual",data)
            .then((res) => {
                console.log("get Manual data------------------", res.data)
            }).catch(err => {
                console.log(err)
            })
    }
    const stepFourHVACCfmHandler = () => {
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
            })
            let data =[{
                "CM-4-Mode": 20,
                "CM-4-Temp-SP": setPointsVal,
            }]
            console.log(data)
            UserService.postControlData(device_id,"mode4-hvac",data)
            .then((res) => {
                console.log("get HVAC data------------------", res.data)
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
        setstepFour({
            ...stepFour,
            confirmManual: false,
            confirmHAVC: false,
            confirmTimer: true,
            confirmAlarm: false,
        })
        console.log(stepFour)
        let data =[{
            "CM-4-Mode": 30,
            "CM-4-T-ON": stepFour.turnOn,
            "CM-4-T-OFF": stepFour.turnOff,
        }]
        console.log(data)
        UserService.postControlData(device_id,"mode4-timer",data)
        .then((res) => {
            console.log("get Timer data------------------", res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const stepFourAlarmCfmHandler = () => {
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
            })
            console.log(stepFour)
            let data =[{
                "CM-4-Mode": 40,
                "CM4-ALM": stepFour.setAlarm
            }]
            console.log(data)
            UserService.postControlData(device_id,"mode4-alarm",data)
            .then((res) => {
                console.log("get Alarm data------------------", res.data)
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
                                <a  className={`nav-link active ${isSharedDevice == "true" ? 'disabled' : null}`} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">{firstDeviceName}</a>
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
                                                <Button variant="contained" size="large" disabled={stepOne.isDisableconfirmManual ? true : false} onClick={stepOneManualCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                            className='form-control' name='set_input'
                                                            placeholder='Enter Points'
                                                            disabled={stepOne.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepOne.isDisableconfirmHAVC ? true : false} onClick={stepOneHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setstepOne({
                                                                    ...stepOne,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepOne.turnOn}
                                                            className="form-control"
                                                            disabled={stepOne.isTurnOnDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setstepOne({
                                                                    ...stepOne,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepOne.turnOff}
                                                            className="form-control"
                                                            disabled={stepOne.isTurnOffDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepOne.isDisableconfirmTimer ? true : false} onClick={stepOneTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                            clas
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepOne.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepOne.isDisableconfirmAlarm ? true : false} onClick={stepOneAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepOne.confirmAlarm ? 'active-confirm-btn' : null} `} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                <Button variant="contained" size="large" disabled={stepTwo.isDisableconfirmManual ? true : false} onClick={stepTwoManualCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                            placeholder='Enter Points'
                                                            disabled={stepTwo.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepTwo.isDisableconfirmHAVC ? true : false} onClick={stepTwoHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setstepTwo({
                                                                    ...stepTwo,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepTwo.turnOn}
                                                            className="form-control"
                                                            disabled={stepTwo.isTurnOnDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setstepTwo({
                                                                    ...stepTwo,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepTwo.turnOff}
                                                            className="form-control"
                                                            disabled={stepTwo.isTurnOffDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepTwo.isDisableconfirmTimer ? true : false} onClick={stepTwoTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                            clas
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepTwo.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepTwo.isDisableconfirmAlarm ? true : false} onClick={stepTwoAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepTwo.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                <Button variant="contained" size="large" disabled={stepThree.isDisableconfirmManual ? true : false} onClick={stepThreeManualCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                            placeholder='Enter Points'
                                                            disabled={stepThree.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepThree.isDisableconfirmHAVC ? true : false} onClick={stepThreeHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setstepThree({
                                                                    ...stepThree,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepThree.turnOn}
                                                            className="form-control"
                                                            disabled={stepThree.isTurnOnDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setstepThree({
                                                                    ...stepThree,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepThree.turnOff}
                                                            className="form-control"
                                                            disabled={stepThree.isTurnOffDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepThree.isDisableconfirmTimer ? true : false} onClick={stepThreeTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                            clas
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepThree.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepThree.isDisableconfirmAlarm ? true : false} onClick={stepThreeAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepThree.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                <Button variant="contained" size="large" disabled={stepFour.isDisableconfirmManual ? true : false} onClick={stepFourManualCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmManual ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                            disabled={stepFour.isSetPointsDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFour.isDisableconfirmHAVC ? true : false} onClick={stepFourHVACCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmHAVC ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setstepFour({
                                                                    ...stepFour,
                                                                    turnOn: val
                                                                })
                                                            }}
                                                            value={stepFour.turnOn}
                                                            className="form-control"
                                                            disabled={stepFour.isTurnOnDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row' style={{ marginTop: 5 }}>
                                                    <div className='col-md-3' style={{ color: 'white' }}>
                                                        Turn Off
                                                    </div>
                                                    <div className='col-md-9'>
                                                        <TimePicker
                                                            onChange={(val) => {
                                                                setstepFour({
                                                                    ...stepFour,
                                                                    turnOff: val
                                                                })
                                                            }}
                                                            value={stepFour.turnOff}
                                                            className="form-control"
                                                            disabled={stepFour.isTurnOffDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFour.isDisableconfirmTimer ? true : false} onClick={stepFourTimerCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmTimer ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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
                                                            clas
                                                            className='form-control'
                                                            name='set_alarm'
                                                            placeholder='Enter alarm'
                                                            disabled={stepFour.isSetAlarmDisable ? true : false}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Button variant="contained" size="large" disabled={stepFour.isDisableconfirmAlarm ? true : false} onClick={stepFourAlarmCfmHandler} className={`btn btn-secondary btn-sm ${stepFour.confirmAlarm ? 'active-confirm-btn' : null}`} style={{ borderRadius: 25, backgroundColor: 'gray' }}>Confirm</Button>
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