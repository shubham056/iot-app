import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment-timezone';
// import TreeMenu, { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
//import "react-simple-tree-menu/dist/main.css";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import PowerCharts from '../components/PowerCharts';
import TempetureChart from "../components/TempetureChart";
import EnergyChart from '../components/EnergyChart';
import socketClient from 'socket.io-client';
import { Typography, Menu, MenuItem, Tooltip, Button, Stack } from "@mui/material";
import { ExpandMore, ChevronRight, HelpOutlineOutlined, DeviceThermostat, Power, ElectricBolt, KeyboardArrowDown, Devices } from "@mui/icons-material";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import Control from '../components/Control';
import DeviceStats from '../components/DeviceStats';
const tzone = "Asia/Amman";

//const SocketServer = "http://localhost:5001/";
const SocketServer = "https://iot.cwsbuild.com/";
const connectionOptions = {
  //"force new connection": true,
  //"reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
  "timeout": 10000, //before connect_error and connect_timeout are emitted.
  "transports": ["websocket"]
};

const Dashboard = () => {
  //set states start here
  const [isstartDate, setIsstartDate] = useState("")
  const [isEnergyTxt, setisEnergyTxt] = useState("Energy")
  const [isUpdateData, setisUpdateData] = useState("")
  const [addDeviceBtnText, setAddDeviceBtnText] = useState("Verify")
  const [showWelcomeDiv, setshowWelcomeDiv] = useState(true)
  const [stepOne, setstepOne] = useState(true)
  const [stepTwo, setstepTwo] = useState(false)
  const [stepTwoisLoading, setstepTwoisLoading] = useState(false)
  const [forgotisLoading, setforgotisLoading] = useState(false)
  const [deleteAreaisLoading, setdeleteAreaisLoading] = useState(false)
  const [isaddDeviceToUser, setisaddDeviceToUser] = useState(false)
  const [renameAreaisLoading, setrenameAreaisLoading] = useState(false)
  const [isAddArea, setIsAddArea] = useState(false);
  const [isAddDevice, setIsAddDevice] = useState(false);
  const [isforgotdDevice, setIsForgotDevice] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isDeleteArea, setIsDeleteArea] = useState(false);
  const [isRenameArea, setIsRenameArea] = useState(false);
  const [isRenameDevice, setIsRenameDevice] = useState(false);
  const [isMoveDevice, SetIsMoveDevice] = useState(false);
  const [isAddDeviceTouser, SetIsAddDeviceTouser] = useState(false);
  const [content, setContent] = useState([]);
  const [contentDevice, setContentDevice] = useState([]);
  const [contentArea, setContentArea] = useState([]);
  const [treeViewData, setTreeViewData] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const [isAddDeviceLoading, setisAddDeviceLoading] = useState(false)
  const [isGetDeviceLoading, setisgetDeviceLoading] = useState(false)
  const [showGraph, setshowGraph] = useState(false)
  const [areaName, setAreaName] = useState("")
  const [isSharedDevice, setIsSharedDevice] = useState(false)
  const [renameDeleteId, setRenameDeleteId] = useState("")
  const [devicename, setDeviceName] = useState("")
  const [isPower, setisPower] = useState(false)
  const [isTemperature, setisTemperature] = useState(false)
  const [isControl, setisControl] = useState(false)
  const [isPowerTotal, setisPowerTotal] = useState(false)
  const [isPowerPhase1, setisPowerPhase1] = useState(false)
  const [isPowerPhase2, setisPowerPhase2] = useState(false)
  const [isPowerPhase3, setisPowerPhase3] = useState(false)

  const [isEnergyTotal, setisEnergyTotal] = useState(false)
  const [isEnergyPhase1, setisEnergyPhase1] = useState(false)
  const [isEnergyPhase2, setisEnergyPhase2] = useState(false)
  const [isEnergyPhase3, setisEnergyPhase3] = useState(false)

  const [isEnergy, setisEnergy] = useState(false)
  const [isEnergyDaily, setisEnergyDaily] = useState(false)
  const [isEnergyMonthly, setisEnergyMonthly] = useState(false)

  const [isStaticTxtValue1, setisStaticTxtValue1] = useState('T-Voltage')
  const [isStaticTxtValue2, setisStaticTxtValue2] = useState('T-Current')
  const [isStaticTxtValue3, setisStaticTxtValue3] = useState('T-Power')
  const [isStaticTxtValue4, setisStaticTxtValue4] = useState('T-Energy')

  const [isStaticValue1, setisStaticValue1] = useState('---')
  const [isStaticValue2, setisStaticValue2] = useState('---')
  const [isStaticValue3, setisStaticValue3] = useState('---')
  const [isStaticValue4, setisStaticValue4] = useState('---')
  const [isStaticTemperature, setisStaticTemperature] = useState('0')

  const [isGraphLabelTxt, setisGraphLabelTxt] = useState('Total Power')
  const [isDeviceStatus, setisDeviceStatus] = useState('yellow');
  const [isActiveRangeSwitch, setisActiveRangeSwitch] = useState(null);
  const [isGraphStatsLoading, setisGraphStatsLoading] = useState(true);
  const [isUpdateUseEffectSocket, setisUpdateUseEffectSocket] = useState(0);

  const [rootTreeViewData, setRootTreeViewData] = useState([])
  const [powerDataFromDB, setpowerDataFromDB] = useState([])
  const [tempetureDataFromDB, settempetureDataFromDB] = useState([])
  const [energyDataFromDB, setenergyDataFromDB] = useState([])
  const [isDeviceID, setisDeviceID] = useState('')
  const { user } = useSelector((state) => state.auth);
  const userID = user.data.profile.id
  const keyRef = useRef(Date.now());

  let today = moment().tz(tzone).format('YYYY/MM/DD')
  let pastDate = moment().tz(tzone).subtract(6, "month").startOf("month").format('YYYY/MM/DD')
  const NodeWithContextMenu = (props) => {
    const [contextMenu, setContextMenu] = React.useState({
      mouseX: null,
      mouseY: null,
    });
    const handleContextMenu = (event) => {
      event.preventDefault();
      setContextMenu(
        contextMenu.mouseX === null
          ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6
          } : {
            mouseX: null,
            mouseY: null
          }
      );
    };

    const handleClose = (action, props) => {
      const { id, label, is_type, shared_by, is_shared_device } = props
      setAreaName(label)
      setRenameDeleteId(id)
      if (action == "Rename" && is_type == "area") {
        console.log("rename area")
        setIsRenameArea(true)
        SetIsAddDeviceTouser(false)
        SetIsMoveDevice(false)
        setIsRenameDevice(false)
        setIsDeleteArea(false)
        setIsForgotDevice(false)
        setIsAddDevice(false)
        setIsAddArea(false)
        setshowGraph(false)
        setshowWelcomeDiv(false)
      } if (action == "Rename" && is_type == "device") {
        console.log("rename device")
        setIsRenameDevice(true)
        SetIsAddDeviceTouser(false)
        SetIsMoveDevice(false)
        setIsRenameArea(false)
        setIsDeleteArea(false)
        setIsForgotDevice(false)
        setIsAddDevice(false)
        setIsAddArea(false)
        setshowGraph(false)
        setshowWelcomeDiv(false)
      } if (action == "Delete" && is_type == 'area') {
        console.log("Delete area")
        setIsDeleteArea(true)
        SetIsAddDeviceTouser(false)
        SetIsMoveDevice(false)
        setIsRenameArea(false)
        setIsRenameDevice(false)
        setIsForgotDevice(false)
        setIsAddDevice(false)
        setIsAddArea(false)
        setshowGraph(false)
        setshowWelcomeDiv(false)

      } if (action == "Delete" && is_type == 'device') {
        console.log("Delete device")
        setIsForgotDevice(true)
        SetIsAddDeviceTouser(false)
        SetIsMoveDevice(false)
        setIsRenameArea(false)
        setIsRenameDevice(false)
        setIsDeleteArea(false)
        setIsAddDevice(false)
        setIsAddArea(false)
        setshowGraph(false)
        setshowWelcomeDiv(false)
      } if (action == "Move") {
        console.log("move")
        SetIsMoveDevice(true)
        SetIsAddDeviceTouser(false)
        setIsForgotDevice(false)
        setIsRenameArea(false)
        setIsRenameDevice(false)
        setIsDeleteArea(false)
        setIsAddDevice(false)
        setIsAddArea(false)
        setshowGraph(false)
        setshowWelcomeDiv(false)
      } if (action == "addUsers") {
        console.log("addUsers")
        setValue9("user_id", userID)
        setValue9("device_id", props.device_id)
        setValue9("device_name", props.label)
        SetIsAddDeviceTouser(true)
        SetIsMoveDevice(false)
        setIsForgotDevice(false)
        setIsRenameArea(false)
        setIsRenameDevice(false)
        setIsDeleteArea(false)
        setIsAddDevice(false)
        setIsAddArea(false)
        setshowGraph(false)
        setshowWelcomeDiv(false)
      }
      setContextMenu({
        mouseX: null,
        mouseY: null
      });

    };

    return (
      <div
        onContextMenu={handleContextMenu}
        style={{ cursor: "context-menu" }}
      >
        <Typography
          onClick={event => {
            const { id, is_type, device_id, label, shared_by, is_shared_device } = props
            //console.log("device ++++++++++++++++++++++++",props)
            if (is_type == "device") {
              setIsSharedDevice(is_shared_device)
              setisDeviceID(device_id)
              setisPower(true)
              setisPowerTotal(true)
              setisEnergyPhase1(false)
              setisEnergyPhase2(false)
              setisEnergyPhase3(false)
              setisPowerPhase1(false)
              setisPowerPhase2(false)
              setisPowerPhase3(false)
              setisEnergy(false)
              setisTemperature(false)
              setisControl(false)
              setisEnergyDaily(false)
              setisEnergyMonthly(false)
              setshowGraph(true)
              setIsRenameDevice(false)
              setIsRenameArea(false)
              setIsAddArea(false)
              setIsAddDevice(false)
              setshowWelcomeDiv(false)
              setIsForgotDevice(false)
              setIsDeleteArea(false)
              SetIsMoveDevice(false)
              SetIsAddDeviceTouser(false)
              setDeviceName(label)
              setisActiveRangeSwitch(null)

              setisStaticTxtValue1('T-Voltage')
              setisStaticTxtValue2('T-Current')
              setisStaticTxtValue3('T-Power')
              setisStaticTxtValue4('T-Energy')
              setisGraphLabelTxt('Total Power')

              //let areaName = parent.split("/").pop()

              //console.log("call device data api", { device_id: device_id, objectName: "T_power", dataType: null })
              let userIds = { "user_id": userID, "device_id": device_id };
              console.log("device id ", device_id)
              io.current.emit("user_connected", userIds);
              io.current.emit("checkDeviceStatus", { device_id: device_id })
              io.current.emit("liveStatsData", { user_id: userID, device_id: device_id, objectName: "T_power", dataType: null });
              io.current.emit("liveGraphData", { user_id: userID, device_id: device_id, objectName: "T_power_A", dataType: null });

              UserService.GetLinkedDeviceStatus(device_id)
                .then((res) => {

                  if (res.data.message != "data_not_found") {
                    //console.log('!!!!!!!!!!!! device status: ', res.data.data.deviceData[0])
                    const { device_status, device_status_timestamp_diff } = res.data.data.deviceData[0]
                    if (device_status == 1 && device_status_timestamp_diff <= 20) {
                      setisDeviceStatus('green')
                    } else if (device_status == 0 && device_status_timestamp_diff >= 21 && device_status_timestamp_diff <= 39) {
                      setisDeviceStatus('yellow')
                    } else if (device_status == 0 && device_status_timestamp_diff >= 40) {
                      setisDeviceStatus('red')
                    } else if (device_status == 0 && device_status_timestamp_diff == 0) {
                      setisDeviceStatus('yellow')
                    } else {
                      setisDeviceStatus('yellow')
                    }
                  }

                }).catch(err => console.log(err))

              UserService.GetLinkedDeviceData(device_id, "T_power_A")
                .then((res) => {
                  setpowerDataFromDB(res.data.data.deviceData)
                  setIsstartDate(res.data.data.deviceData[0].date)

                }).catch(err => {
                  console.log(err)
                })

              //get latest stats for total voltage, current, power and energy
              setisGraphStatsLoading(true)
              UserService.GetLatestDeviceStatsData(device_id).then((res) => {
                setTimeout(() => {
                  setisGraphStatsLoading(false)
                }, 1000)
                if (res.data.data.error) {
                  setisStaticValue1("0.00")
                  setisStaticValue2("0.00")
                  setisStaticValue3("0.00")
                  setisStaticValue4("0.00")
                  setisStaticTemperature("0.00")
                } else {
                  const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]

                  setisStaticValue1(T_voltage)
                  setisStaticValue2(T_current)
                  setisStaticValue3(T_power)
                  setisStaticValue4(T_energy)
                  setisStaticTemperature(temperature)
                }

              }).catch(err => {
                console.log(err)
                setisGraphStatsLoading(false)
              })
            }
            //setActiveItemId(item.id);
            // if you want after click do expand/collapse comment this two line
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          {props.label}
        </Typography>
        {
          props.is_type != 'user'
            ?
            props.is_shared_device == "true" ?
              null
              :
              <Menu
                open={contextMenu.mouseX !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  contextMenu.mouseX !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
              >
                <MenuItem onClick={() => handleClose("Rename", props)}>Rename {props.label}</MenuItem>
                <MenuItem onClick={() => handleClose("Delete", props)}>Delete {props.label}</MenuItem>
                {props.is_type == 'device' ? <MenuItem onClick={() => handleClose("Move", props)}>Move {props.label}</MenuItem> : null}
                {props.is_type == 'device' ? <MenuItem onClick={() => handleClose("addUsers", props)}>Share {props.label}</MenuItem> : null}
              </Menu>
            :
            null
        }


      </div>
    );
  };

  const range = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ],
    "Last Year": [
      moment()
        .subtract(1, "year")
        .startOf("year"),
      moment()
        .subtract(1, "year")
        .endOf("year")
    ]
  };
  const handleCallback = (start, end, label) => {
    console.log("callback -----------", start, end, label);
  }
  const handleApply = (event, picker) => {
    setisActiveRangeSwitch(null)
    //console.log("event",event)
    console.log("start Date", picker.startDate);
    console.log("start Date", moment(picker.startDate._d).tz(tzone).format());
    console.log("End Date", picker.endDate._d.toISOString().split('T')[0]);
    const format = "daterange";

    let startDateObj = picker.startDate._d;
    let startDateObjDate = new Date(startDateObj);

    let startDateday = startDateObjDate.getDate();
    let startDatemonth = startDateObjDate.getMonth() + 1;
    let startDateyear = startDateObjDate.getFullYear();
    let startDate = startDateyear + "-" + startDatemonth + "-" + startDateday;
    console.log("final start date----", startDate)


    let endDateObj = picker.endDate._d;
    let endDateObjDate = new Date(endDateObj);

    let endDateday = endDateObjDate.getDate();
    let endDatemonth = endDateObjDate.getMonth() + 1;
    let endDateyear = endDateObjDate.getFullYear();
    let endDate = endDateyear + "-" + endDatemonth + "-" + endDateday;
    console.log("final end date----", endDate)

    //------------- For Temperature --------------------
    if (isTemperature) {
      console.log("isTemperature")
      UserService.GetLinkedDeviceTemperatureData(isDeviceID, "temperature", format, startDate, endDate)
        .then((res) => {
          console.log("get device temperature data res--", res.data.data.deviceData)
          settempetureDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })
    }
    //------------- For Power Data and it's Phases ----------
    if (isPower && isPowerTotal) {
      console.log("power total")
      UserService.GetLinkedDeviceData(isDeviceID, "T_power_A", format, startDate, endDate)
        .then((res) => {
          setpowerDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })

    } if (isPower && isPowerPhase1) {
      console.log("power phase 1")
      UserService.GetLinkedDeviceData(isDeviceID, "L1_Power_A", format, startDate, endDate)
        .then((res) => {
          setpowerDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })

    } if (isPower && isPowerPhase2) {
      console.log("power phase 2")
      UserService.GetLinkedDeviceData(isDeviceID, "L2_Power_A", format, startDate, endDate)
        .then((res) => {
          setpowerDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })

    } if (isPower && isPowerPhase3) {
      console.log("power phase 3")
      UserService.GetLinkedDeviceData(isDeviceID, "L3_Power_A", format, startDate, endDate)
        .then((res) => {
          setpowerDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })

    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (type) => {
    console.log("isType", type)
    if (type === "daily") {
      setisPower(false)
      setisPowerTotal(false)
      setisEnergyMonthly(false)
      setisEnergyDaily(true)
      setisEnergy(true)
      setisTemperature(false)
      setisEnergyTotal(true)
      setisEnergyPhase1(false)
      setisEnergyPhase2(false)
      setisEnergyPhase3(false)
      setisStaticTxtValue1('T-Voltage')
      setisStaticTxtValue2('T-Current')
      setisStaticTxtValue3('T-Power')
      setisStaticTxtValue4('T-Energy')
      setisGraphLabelTxt('T-Energy-Daily')
      UserService.GetLinkedDeviceData(isDeviceID, "T_Energy_Hr_A", "daily")
        .then((res) => {
          setenergyDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })
      //get latest stats for total voltage, current, power and energy
      UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
        const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]
        setisStaticValue1(T_voltage)
        setisStaticValue2(T_current)
        setisStaticValue3(T_power)
        setisStaticValue4(T_energy)
        setisStaticTemperature(temperature) // temperature
      }).catch(err => {
        console.log(err)
      })

    } if (type === "monthly") {
      setisEnergyMonthly(true)
      setisTemperature(false)
      setisControl(false)
      setisEnergyDaily(false)
      setisEnergyTotal(true)
      setisEnergyPhase1(false)
      setisEnergyPhase2(false)
      setisEnergyPhase3(false)
      setisStaticTxtValue1('T-Voltage')
      setisStaticTxtValue2('T-Current')
      setisStaticTxtValue3('T-Power')
      setisStaticTxtValue4('T-Energy')
      setisGraphLabelTxt('T-Energy-Monthly')

      UserService.GetLinkedDeviceData(isDeviceID, "T_Energy_Hr_A", "monthly")
        .then((res) => {
          setenergyDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })
      //get latest stats for total voltage, current, power and energy
      UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
        const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]
        setisStaticValue1(T_voltage)
        setisStaticValue2(T_current)
        setisStaticValue3(T_power)
        setisStaticValue4(T_energy)
        setisStaticTemperature(temperature) // temperature
      }).catch(err => {
        console.log(err)
      })
    }
    setAnchorEl(null);
  };


  const [isInitialDateData, setisInitialDateData] = useState({
    startDate: pastDate,
    endDate: today,
    minDate: pastDate,
    maxDate: today,
    drops: 'down',
    opens: 'left',
    applyButtonClasses: 'btn-info',
    ranges: range,
    alwaysShowCalendars: true,
    locale: {
      format: "YYYY/MM/DD"
    }
  })

  // start date for date range
  useEffect(() => {
    keyRef.current = Date.now();

    if (isstartDate) {
      setisInitialDateData({
        ...isInitialDateData,
        startDate: isstartDate,
        minDate: isstartDate,
      })
    }
    if (isstartDate == undefined) {
      setisInitialDateData({
        ...isInitialDateData,
        startDate: today,
        minDate: today,
      })
    }
  }, [isstartDate, isInitialDateData.startDate]);


  const io = useRef();

  //Connect socket once from server
  useEffect(() => {
    io.current = socketClient(SocketServer, connectionOptions);
    //connect
    io.current.on('connect', () => {
      console.log("Socket connected!")
      io.current.on("user_connected", (userIds, soketid) => {
        //console.log('----------user_connected--------:',data)
        console.log(`I'm(${userIds.device_id}) connected with socket id ${soketid} from the back-end`);
      })
    });
    //disconnect
    io.current.on('disconnect', () => {
      console.log("socket disconnected")
    });
    return () => {
      io.current.off('connect');
      io.current.off('disconnect');
      io.current.disconnect()
    }
  }, []);


  useEffect(() => {
    console.log("call use effect")
    //---------------------- Check device status -------------------------
    io.current.on('received_device_status_data', (data, device_id) => {
      console.log("!!!!--- Live Device Status ---!!!!", data)
      const { device_status, device_status_timestamp_diff } = data
      if (isDeviceID == data.device_id) {
        if (device_status == 1 && device_status_timestamp_diff <= 20) {
          setisDeviceStatus('green')
        } else if (device_status == 0 && device_status_timestamp_diff >= 21 && device_status_timestamp_diff <= 39) {
          setisDeviceStatus('yellow')
        } else if (device_status == 0 && device_status_timestamp_diff >= 40) {
          setisDeviceStatus('red')
        } else if (device_status == 0 && device_status_timestamp_diff == 0) {
          setisDeviceStatus('yellow')
        } else {
          setisDeviceStatus('yellow')
        }
      }
    })
    //--------------------------- Stats Data -------------------------------------
    io.current.on('received_stats_data', (data) => {
      // console.log("power", isPower)
      // console.log("total power", isPowerTotal)
      // console.log("isPowerPhase1", isPowerPhase1)
      // console.log("isPowerPhase2", isPowerPhase2)
      // console.log("isPowerPhase3", isPowerPhase3)
      //console.log('power graph with device id', isDeviceID, data)
      if (isDeviceID == data.device_id) {
        console.log(`!!!!!!!+++++ Device stats +++++!!!!!!!`, data)


        if (isPower && isPowerTotal || isTemperature) {
          //console.log("power total -------------")
          const { T_voltage, T_current, T_power, T_energy, temperature } = data

          setisStaticValue1(T_voltage) // T_voltage
          setisStaticValue2(T_current) // T_current
          setisStaticValue3(T_power) // T_Power
          setisStaticValue4(T_energy) // T_Energy
          setisStaticTemperature(temperature) // temperature

        } if (isPower && isPowerPhase1) {
          //console.log("power phase 1")
          const { l1_voltage, l1_current, AP_power_l1, T_Energy_L1, temperature } = data
          setisStaticValue1(l1_voltage)
          setisStaticValue2(l1_current)
          setisStaticValue3(AP_power_l1)
          setisStaticValue4(T_Energy_L1)
          setisStaticTemperature(temperature) // temperature

        } if (isPower && isPowerPhase2) {
          //console.log("power phase 2")
          const { l2_voltage, l2_current, AP_power_l2, T_Energy_L2, temperature } = data
          setisStaticValue1(l2_voltage)
          setisStaticValue2(l2_current)
          setisStaticValue3(AP_power_l2)
          setisStaticValue4(T_Energy_L2)
          setisStaticTemperature(temperature) // temperature

        } if (isPower && isPowerPhase3) {
          //console.log("power phase 3")
          const { l3_voltage, l3_current, AP_power_l3, T_Energy_L3, temperature } = data
          setisStaticValue1(l3_voltage)
          setisStaticValue2(l3_current)
          setisStaticValue3(AP_power_l3)
          setisStaticValue4(T_Energy_L3)
          setisStaticTemperature(temperature) // temperature
        }
      }
    })

    //---------------------------- Graph Data -----------------------------------
    io.current.on('received_graph_data', (data, device_id, objectName, dataType) => {
      console.log(`!!!*** Graph data of Device ***!!!`, device_id, objectName, dataType)

      if (isDeviceID == device_id) {
          if (isPower && isPowerTotal && objectName == "T_power_A" ) {
            console.log("----------- power graph total--------------")
            setpowerDataFromDB(data)

          } if (isPower && isPowerPhase1 && objectName == "L1_Power_A") {
            console.log("power graph phase 1")
            setpowerDataFromDB(data)

          } if (isPower && isPowerPhase2 && objectName == "L2_Power_A") {
            console.log("power graph phase 2")
            setpowerDataFromDB(data)

          } if (isPower && isPowerPhase3 && objectName == "L3_Power_A") {
            console.log("power graph phase 3")
            setpowerDataFromDB(data)
          }
          //For Temperature 
          if (isTemperature && objectName == "temperature") {
            //console.log("----------- temperature graph data--------------")
            //setpowerDataFromDB(data)
            settempetureDataFromDB(data)

          }

      }
    })
  }, [isDeviceID, isPower, isPowerTotal, isPowerPhase1, isPowerPhase2, isPowerPhase3, isTemperature]);




  //socket 
  // const io = socketClient(SocketServer, connectionOptions);
  // console.log("socket", io)
  // io.on('connect', () => {/[[[hh]]]
  //   console.log(`I'm connected with socket id ${io.id} from the back-end`);

  //   let userIds = { "user_id": userID, "device_id": isDeviceID };
  //   //console.log("userIds", userIds)
  //   io.emit("user_connected", userIds);

  // })


  const Schema = Yup.object().shape({
    parent_id: Yup.string().required('Select a category.'),
    area_name: Yup.string().required('Area name is required.').min(3).max(15),
  });
  const AddDeviceSchemaStep1 = Yup.object().shape({
    modal_name: Yup.string().required('Select modal name!'),
  });
  const AddDeviceSchemaStep2 = Yup.object().shape({
    parent_id: Yup.string().required('Select area name!'),
    device_name: Yup.string().required('Device name field is required!'),
    device_id: Yup.string().required("Please enter the device ID ( You can find the device ID on the device Label)"),
  });
  const forgotDevice = Yup.object().shape({
    device_id: Yup.string().required("Please select device name"),
  });
  const deleteArea = Yup.object().shape({
    area_id: Yup.string().required("Please select area name"),
  });
  const renameArea = Yup.object().shape({
    area_id: Yup.string().required("Please select area name"),
    area_name: Yup.string().required('Area name is required!')
  });
  const renameDevice = Yup.object().shape({
    device_id: Yup.string().required("Please select device name"),
    device_name: Yup.string().required("Device name is required!"),
  });
  const moveDevice = Yup.object().shape({
    device_id: Yup.string().required("Please select device name"),
    area_id: Yup.string().required("Please select area name where you want to move!"),
  });
  const addDeviceToUsers = Yup.object().shape({
    //device_id: Yup.string().required("Please select device name"),
    email: Yup.string().email('Enter valid email id.').required('Email id is required.'),
  });
  const formOptions = { resolver: yupResolver(Schema) }
  const adddeviceformOptionsStep1 = { resolver: yupResolver(AddDeviceSchemaStep1) }
  const adddeviceformOptionsStep2 = { resolver: yupResolver(AddDeviceSchemaStep2) }
  const formOptionforgotDevice = { resolver: yupResolver(forgotDevice) }
  const formOptiondeleteArea = { resolver: yupResolver(deleteArea) }
  const formOptionRenameArea = { resolver: yupResolver(renameArea) }
  const formOptionRenameDevice = { resolver: yupResolver(renameDevice) }
  const formOptionMoveDevice = { resolver: yupResolver(moveDevice) }
  const formOptionAddUserDevice = { resolver: yupResolver(addDeviceToUsers) }
  const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, resetField } = useForm(formOptions);
  const { register: register2, formState: { errors: errors2, isSubmitting: isSubmitting2 }, handleSubmit: handleSubmit2, resetField: resetField2 } = useForm(adddeviceformOptionsStep1);
  const { register: register3, formState: { errors: errors3, isSubmitting: isSubmitting3 }, handleSubmit: handleSubmit3, resetField: resetField3 } = useForm(adddeviceformOptionsStep2);
  const { register: register4, formState: { errors: errors4, isSubmitting: isSubmitting4 }, handleSubmit: handleSubmit4, resetField: resetField4 } = useForm(formOptionforgotDevice);
  const { register: register5, formState: { errors: errors5, isSubmitting: isSubmitting5 }, handleSubmit: handleSubmit5, resetField: resetField5 } = useForm(formOptiondeleteArea);
  const { register: register6, formState: { errors: errors6, isSubmitting: isSubmitting6 }, handleSubmit: handleSubmit6, resetField: resetField6 } = useForm(formOptionRenameArea);
  const { register: register7, formState: { errors: errors7, isSubmitting: isSubmitting7 }, handleSubmit: handleSubmit7, resetField: resetField7 } = useForm(formOptionRenameDevice);
  const { register: register8, formState: { errors: errors8, isSubmitting: isSubmitting8 }, handleSubmit: handleSubmit8, resetField: resetField8 } = useForm(formOptionMoveDevice);
  const { register: register9, setValue: setValue9, formState: { errors: errors9, isSubmitting: isSubmitting9 }, handleSubmit: handleSubmit9, resetField: resetField9 } = useForm(formOptionAddUserDevice);

  const callOnce = useRef(true)
  //add root user node 
  useEffect(() => {
    if (callOnce.current) {
      callOnce.current = false
      //console.log("************************call add root use **************************")
      //callOnce.current = false
      UserService.AddRootUser(userID, { user_name: user.data.profile.first_name + ' ' + user.data.profile.last_name }).then(
        (response) => {
          //console.log("++++++++++++++++++++++++response root user+++++++++++++++++++++++++", response.data.data)
          if (response.data.type == 'success') {
            console.log('added')
            setisUpdateData(response.data.data.area.id)
            //console.log(response.data.data.area)
          } else {
            //console.log("added already")
            let randomNumber = Math.random() * 10000
            setisUpdateData(randomNumber)
          }
        },
        (error) => {
          //{ error && toast.error(error.response.data.message, { toastId: 2603453643 }) }
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }

  }, [user, userID]);
  //fetch category data
  useEffect(() => {
    UserService.GetTreeViewCategory(userID).then(
      (response) => {
        setContent(response.data.data.profile);
        //console.log("response tree view data", response.data.data.profile)
      },
      (error) => {

        { error && toast.error(error.response.data.message, { toastId: 2603453643 }) }
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, [isLoading, isUpdateData]);

  //fetch device id data
  useEffect(() => {
    UserService.GetAddedDevices(userID).then(
      (response) => {
        setContentDevice(response.data.data.profile);
        //console.log("response device data ---", response.data.data.profile)
      },
      (error) => {
        { error && toast.error(error.response.data.message, { toastId: 2603453643 }) }
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContentDevice(_content);
      }
    );
  }, [isGetDeviceLoading, isUpdateData]);

  //fetch area name data
  useEffect(() => {
    UserService.GetAddedAreas(userID).then(
      (response) => {
        setContentArea(response.data.data.profile);
        //console.log("response device data ---", response.data.data.profile)
      },
      (error) => {
        { error && toast.error(error.response.data.message, { toastId: 2603453643 }) }
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContentArea(_content);
      }
    );
  }, [isLoading, isAddDeviceLoading, isUpdateData, isGetDeviceLoading]);

  //fetch tree view data
  useEffect(() => {
    UserService.GetTreeViewData(userID).then(
      (response) => {
        //console.log("tree view data0000000000000000000000", response.data.data.profile)
        setTreeViewData(response.data.data.profile);
        //console.log("response", response.data.data.profile)
      },
      (error) => {

        { error && toast.error(error.response.data.message, { toastId: 2603453643 }) }
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setTreeViewData(_content);
      }
    );
  }, [isLoading, isAddDeviceLoading, isUpdateData, isGetDeviceLoading]);


  //fetch category data
  useEffect(() => {
    //console.log("########### call added device id function ##################")
    UserService.GetAddedDevices(userID).then(
      (response) => {
        setContentDevice(response.data.data.profile);
        //console.log("response device data ---", response.data.data.profile)
      },
      (error) => {

        { error && toast.error(error.response.data.message, { toastId: 2603453643 }) }
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContentDevice(_content);
      }
    );
  }, [isGetDeviceLoading, isUpdateData]);
  //fetch 
  useEffect(() => {
    // let locations = []
    // Object.values(treeViewData).map(item => {
    //   //.log("first", item)
    //   let newdata = { ...item, key: item.label };
    //   locations.push(newdata)
    // })

    async function createTreeView(location) {
      var tree = [],
        object = {},
        parent,
        child;
      for (var i = 0; i < location.length; i++) {
        parent = location[i];
        object[parent.id] = parent;
        object[parent.id]["children"] = [];
      }
      for (var id in object) {
        if (object.hasOwnProperty(id)) {
          child = object[id];
          if (child.parent_id && object[child["parent_id"]]) {
            //delete child.id
            //
            object[child["parent_id"]]["children"].push(child);
            delete child.parent_id
          } else {
            //delete child.id
            delete child.parent_id
            tree.push(child);
          }
        }
      }
      return tree;
    }
    createTreeView(treeViewData[0]).then(data => {
      //console.log("tree view final data *************************", data)
      setRootTreeViewData(data[0])
    })
    //setRootTreeViewData(createTreeView(treeViewData[0]))
    //console.log("__________________Root_________________", createTreeView(locations))


  }, [treeViewData]);

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={<NodeWithContextMenu label={nodes.label} id={nodes.id} is_type={nodes.is_type} device_id={nodes.device_id} shared_by={nodes.shared_by} is_shared_device={nodes.is_shared_device} />}
      icon={nodes.is_type == 'device' ? <Devices sx={{ color: `${nodes.is_shared_device == "true" ? "orange" : "#1d9b9c"}` }} /> : null}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  //submit handler
  const onSubmit = formValue => {
    //console.log(formValue)
    //return false
    setisLoading(true)
    UserService.AddNewArea(userID, formValue)
      .then(() => {
        setisLoading(false)
        ///localStorage.setItem("user", JSON.stringify(updateUserData));
        toast.success("Area successfully Added.", { toastId: 23453643 })
        resetField('area_name');
      })
      .catch((error) => {
        setisLoading(false)
        { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
      });
  }
  //forgot device submit
  const onSubmitForgotDevice = formValue => {
    //return false
    if (formValue.device_id != undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "To forgot the device!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, forgot it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setforgotisLoading(true)
          UserService.forgotDeviceID(formValue.device_id)
            .then((res) => {
              console.log("forgot device res--", res)
              if (res.data.data.error == false) {
                toast.success('Device successfully forgot.', { toastId: 3446467686787 })
                isUpdateData(res.data.data.updatedId);
                setisAddDeviceLoading(res.data.data.updatedId)
                setforgotisLoading(false)
                setIsForgotDevice(false)
                setIsAddDevice(false)
                setIsAddArea(false)
                setshowGraph(false)
                setshowWelcomeDiv(true)
              } else {
                toast.error('Please select a device!', { toastId: 234534464676867878 })
                setforgotisLoading(false)

              }

            })
            .catch((error) => {
              setisLoading(false)
              { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
            });
          setforgotisLoading(false)

        } else {
          setforgotisLoading(false)
        }
      })
    } else {
      toast.info('Please select device name', { toastId: 2345366467686787 })
    }
  }
  //delete area submit
  const onSubmitDeleteArea = formValue => {
    //return false
    if (formValue.area_id != undefined) {
      Swal.fire({
        title: 'Are you sure ?',
        text: "want to delete this area!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setdeleteAreaisLoading(true)
          UserService.deleteAreaName(formValue.area_id, userID)
            .then((res) => {
              console.log("Delete area API res--", res)

              if (res.data.data.error == false) {
                toast.success('Area successfully deleted!', { toastId: 4464676867878 })
                setisUpdateData(res.data.data.updatedId)
                setdeleteAreaisLoading(false)
              } else if (res.data.data.error == "not_found") {
                toast.error('Refresh page and then select a area!', { toastId: 4488676867878 })
                setisUpdateData(res.data.data.updatedId)
                setdeleteAreaisLoading(false)
              } else {
                Swal.fire({
                  title: 'Are you want to sure ?',
                  text: res.data.data.msg,
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, Delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    setdeleteAreaisLoading(true)
                    //delete all area and devices in it
                    UserService.deleteAllAreasandDevices(res.data.data.ids)
                      .then((res) => {
                        //console.log("ressss", res)
                        toast.success('Area successfully deleted!', { toastId: 4564676867878 })
                        setisUpdateData(res.data.data.updatedId)
                        //setisGetDeviceLoading(res.data.data.updatedId)
                        setisgetDeviceLoading(true)
                        setdeleteAreaisLoading(false)
                      }).catch(err => {
                        console.log(err)
                        setdeleteAreaisLoading(false)
                      })
                  } else {
                    setdeleteAreaisLoading(false)
                  }
                })
                setdeleteAreaisLoading(false)

              }

            })
            .catch((error) => {
              setisLoading(false)
              console.log(error)
              { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
            });
          setdeleteAreaisLoading(false)

        } else {
          setdeleteAreaisLoading(false)
        }
      })
    } else {
      toast.info('Please select device name', { toastId: 2345366467686787 })
    }
  }
  //rename area
  const onSubmitRenameArea = formValue => {
    //return false
    const { area_id, area_name } = formValue
    if (area_id != undefined && area_name != undefined) {
      Swal.fire({
        title: 'Are you sure ?',
        text: "want to rename this area!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Rename it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setrenameAreaisLoading(true)
          UserService.editAreaName(area_id, area_name)
            .then((res) => {
              if (res.data.data.error == false) {
                toast.success('Area successfully renamed!', { toastId: 4494676867878 })
                setisUpdateData(res.data.data.updatedId)
                setrenameAreaisLoading(false)
              }
              // if (res.data.data.error == "not_found") {
              //   toast.error('Refresh page and then select a area!', { toastId: 4488676867878 })
              //   setisUpdateData(res.data.data.updatedId)
              //   setrenameAreaisLoading(false)
              // } else {
              //   Swal.fire({
              //     title: 'Are you want to sure ?',
              //     text: res.data.data.msg,
              //     icon: 'question',
              //     showCancelButton: true,
              //     confirmButtonColor: '#3085d6',
              //     cancelButtonColor: '#d33',
              //     confirmButtonText: 'Yes, Delete it!'
              //   }).then((result) => {
              //     if (result.isConfirmed) {
              //       setrenameAreaisLoading(true)
              //       //delete all area and devices in it
              //       UserService.deleteAllAreasandDevices(res.data.data.ids)
              //         .then((res) => {
              //           console.log("ressss", res)
              //           toast.success('Area successfully deleted!', { toastId: 4564676867878 })
              //           setisUpdateData(res.data.data.updatedId)
              //           setrenameAreaisLoading(false)
              //         }).catch(err => {
              //           console.log(err)
              //           setrenameAreaisLoading(false)
              //         })
              //     } else {
              //       setrenameAreaisLoading(false)
              //     }
              //   })
              //   setrenameAreaisLoading(false)

              // }

            })
            .catch((error) => {
              setisLoading(false)
              console.log(error)
              { error && toast.info(error.response.data.message, { toastId: 234736467686787 }) }
            });
          setrenameAreaisLoading(false)

        } else {
          setrenameAreaisLoading(false)
        }
      })
    } else {
      toast.info('Please select device name', { toastId: 2345366467686787 })
    }
  }
  //rename device
  const onSubmitRenameDevice = formValue => {
    console.log(formValue)
    //return false
    if (formValue.device_id != undefined) {
      Swal.fire({
        title: 'Are you sure ?',
        text: "want to rename this device!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Rename it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setdeleteAreaisLoading(true)
          UserService.editDeviceName(formValue.device_id, formValue.device_name)
            .then((res) => {
              if (res.data.data.error == false) {
                toast.success('Device successfully renamed!', { toastId: 1464676867878 })
                setisUpdateData(res.data.data.updatedId)
                setdeleteAreaisLoading(false)
              } else {
                toast.success('Internal server error, please try after sone time!', { toastId: 1464976867878 })
                setisUpdateData(res.data.data.updatedId)
                setdeleteAreaisLoading(false)
              }
            })
            .catch((error) => {
              setisLoading(false)
              console.log(error)
              { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
            });
          setdeleteAreaisLoading(false)

        } else {
          setdeleteAreaisLoading(false)
        }
      })
    } else {
      toast.info('Please select device name', { toastId: 2345366467686787 })
    }
  }
  //move devices
  const onSubmitMoveDevice = formValue => {
    //return false
    if (formValue.area_id != undefined) {
      Swal.fire({
        title: 'Are you sure ?',
        text: "want to move this device!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Move it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setdeleteAreaisLoading(true)
          UserService.moveDevices(formValue.device_id, formValue.area_id, userID)
            .then((res) => {
              if (res.data.data.error == false) {
                toast.success('Device successfully moved!', { toastId: 4464676867878 })
                setisUpdateData(res.data.data.updatedId)
                setdeleteAreaisLoading(false)
              } else {
                toast.error('Internal server error, please try after some time!', { toastId: 4164676867878 })
              }

            })
            .catch((error) => {
              setisLoading(false)
              console.log(error)
              { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
            });
          setdeleteAreaisLoading(false)

        } else {
          setdeleteAreaisLoading(false)
        }
      })
    } else {
      toast.info('Please select device name', { toastId: 2345366467686787 })
    }
  }
  //Add device to users
  const onSubmitaddDeviceToUser = formValue => {
    //return false
    const { email, user_id, device_id, device_name } = formValue
    Swal.fire({
      title: 'Are you sure ?',
      text: "want to add this device!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {

        setisaddDeviceToUser(true)
        let data = {
          user_id,
          device_id,
          device_name
        }
        UserService.assignDeviceTousers(email, data)
          .then((res) => {
            setisaddDeviceToUser(false)
            if (res.data.message === "Not_found") {
              toast.info('This user is not registered with us,sent a email to sign our plateform!', { toastId: 4524 })
            } if (res.data.message === "successfully_added_shared_device") {
              toast.success('Device successfully shared.', { toastId: 4224 })
            } if (res.data.message === "already_added_shared_device") {
              toast.info('Device already shared.', { toastId: 4024 })
            }

            // if (res.data.data.error == false) {
            //   toast.success('Device successfully moved!', { toastId: 4464676867878 })
            //   setisUpdateData(res.data.data.updatedId)
            //   setisaddDeviceToUser(false)
            // } else {
            //   toast.error('Internal server error, please try after some time!', { toastId: 4164676867878 })
            // }
          })
          .catch((error) => {
            setisaddDeviceToUser(false)
            console.log(error)
            { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
          });


      } else {
        setisaddDeviceToUser(false)
      }
    })

  }

  const onSubmitStepOne = formValue => {
    setstepOne(false)
    setstepTwo(true)
    return false
  }
  const onSubmitSteptwo = formValue => {
    //return false
    setstepTwoisLoading(true)
    const deviceID = formValue.device_id
    //--------------------------------- Api for check valid device using device ID -------------------------
    UserService.checkDeviceID(deviceID)
      .then((res) => {
        setstepTwoisLoading(false)
        if (res.data.data.error) {
          //device id not found
          toast.error("The device ID entered is incorrect. Please re-enter the device ID ", { toastId: 2345363333343 })
          setAddDeviceBtnText("Retry");
        } else {
          //1. ************************ found a valid device next check device is online/offline *******************
          console.log("call API for check online/offline")
          UserService.checkDeviceOnlineStatus(deviceID)
            .then((result) => {
              console.log(result)
              console.log("result----------", result)
              if (result.data.data.error) {
                toast.error("The device ID entered is incorrect. Please re-enter the device ID ", { toastId: 2145363333343 })
                setAddDeviceBtnText("Retry");
              } else {
                console.log("data==", result.data.data[0].device_status)
                let deviceStatus = result.data.data[0].device_status; //1=online,o=offline,2=not connected
                if (deviceStatus === 1) {
                  //online
                  Swal.fire({
                    title: 'The device is detected online',
                    text: "To link the device, Select Device-link button. To exit the device link procedure select Exit button ( Please note that if you link the device to this user account, it will be disconnected from any other user account, Are you sure to link device?",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Device Link',
                    cancelButtonText: "Exit",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      console.log('call api for check already added device id for same user')
                      UserService.checkAlreadyAddedDevice(userID, deviceID)
                        .then((res) => {
                          console.log("check already added device id for same user res--", res.data.data.error)
                          if (res.data.data.error != false) {
                            //not exists device id 
                            console.log("not exixts")
                            console.log("call api for remove assign device if exists")
                            //remove associated user device
                            UserService.removeAssignDeviceID(deviceID)
                              .then((resultData) => {
                                console.log("resultData=======", resultData.data)
                                let timerInterval
                                Swal.fire({
                                  title: 'Please press the Device link combination buttons at the device Terminal.',
                                  html: 'It will be close in <b></b> seconds.',
                                  icon: 'info',
                                  timer: 90000,
                                  timerProgressBar: true,
                                  showCancelButton: true,
                                  cancelButtonColor: '#d33',
                                  cancelButtonText: "Exit",
                                  allowOutsideClick: false,
                                  allowEscapeKey: false,
                                  didOpen: () => {
                                    Swal.showLoading()
                                    timerInterval = setInterval(() => {
                                      Swal.getHtmlContainer().querySelector('b')
                                        .textContent = (Swal.getTimerLeft() / 1000)
                                          .toFixed(0)
                                    }, 100)
                                  },
                                  willClose: () => {
                                    Swal.fire(
                                      'Device Link failed. Please again!.',
                                      '',
                                      'error'
                                    )
                                    clearInterval(timerInterval)
                                    clearInterval(interval);
                                  }
                                })
                                //check for Link_Cfm value 50 to 125 every second 
                                console.log('device link api call')

                                const interval = setInterval(() => {
                                  UserService.checkDeviceLinkValue(deviceID)
                                    .then((linkVal) => {
                                      console.log("linkVal.data.error----", linkVal.data.error)
                                      if (linkVal.data.error == false) {
                                        console.log("linkVal.data.data[0]--------------------------", linkVal.data.data[0])
                                        let checkLinkVal = linkVal.data.data[0].link_cfm_updated
                                        let isConnectedDevice = linkVal.data.data[0].is_connected
                                        console.log("checkLinkVal-=======", checkLinkVal)
                                        if (checkLinkVal == "true") {
                                          //Added a new device to area
                                          console.log("Call api for add device finally when not assign to any device")
                                          UserService.AddNewDevice(userID, formValue)
                                            .then((resData) => {
                                              console.log(resData.data.data.area.id)
                                              setisAddDeviceLoading(resData.data.data.area.id)
                                              setisgetDeviceLoading(resData.data.data.area.id)
                                              Swal.fire(
                                                'Device-link is completed successfully.',
                                                '',
                                                'success'
                                              )
                                              clearInterval(timerInterval)
                                              toast.success("Device successfully Added.", { toastId: 2345353643 })
                                              resetField('parent_id');
                                              resetField('device_name');
                                              resetField('device_id');
                                              clearInterval(interval);
                                              UserService.UpdateDeviceConState(deviceID, {
                                                is_connected: 1,
                                                device_status_for_iot_gateway: 77,
                                                link_cfm_updated: "false",
                                              })
                                                .then((ress) => {
                                                  console.log("is_connected res--", ress)
                                                }).catch(err => console.log("is connected err--", err))
                                            })
                                            .catch((error) => {
                                              setisAddDeviceLoading(false)
                                              { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
                                            });
                                        } else {
                                          console.log("NOOOOOOOOOOOOOOOOO")
                                        }
                                      }

                                    })
                                    .catch((linkErr) => {
                                      console.log(linkErr)
                                    })
                                }, 2000)

                              }).catch((errorData) => {
                                console.log("errorData", errorData)
                              })
                          } else {
                            Swal.fire(
                              'Device is already connected.',
                              '',
                              'warning'
                            )
                          }
                        }).catch((err) => console.log(err))


                    }
                  })

                } else if (deviceStatus === 0) {
                  //offline
                  setAddDeviceBtnText("Refresh");
                  toast.info("The device is offline. Make sure the device is connected to the network.", { toastId: 23 })
                } else {
                  //offline and not connected
                  setAddDeviceBtnText("Refresh");
                  toast.info("The device is offline. Make sure the device is connected to the network.", { toastId: 2398765e4 })
                }
              }
            })
            .catch((errorLog) => {
              setAddDeviceBtnText("Verify");
              console.log(errorLog)
            })
        }
      })
      .catch((error) => {
        setstepTwoisLoading(false)
        { error && toast.info(error.response.data.message, { toastId: 3424213 }) }
        setAddDeviceBtnText("Verify");
      });
  }



  let optionTemplate = Object.values(content).map((v, i) => (
    (i == 0) ? <option value={v.id}>New Area</option> : <option value={v.id}>{v.label}</option>
  ));

  let addedDevices = Object.values(contentDevice).map((v, i) => (
    // <option value={v.id} selected={renameDeleteId === v.id}>{v.label}</option>
    <option value={v.id} >{v.label}</option>
  ));

  let addedAreas = Object.values(contentArea).map((v, i) => (
    // <option value={v.id} selected={renameDeleteId === v.id}>{v.label}</option>
    <option value={v.id} >{v.label}</option>
  ));






  //--------------------------  Power Graph Range Switcher Handler ----------------
  const powerGrapghRangeSwitcher = (args) => {
    console.log("args ", args)
    setisActiveRangeSwitch(args)

    if (isPower && isPowerTotal) {
      console.log("power total")
      UserService.GetLinkedDeviceData(isDeviceID, "T_power_A", args)
        .then((res) => {
          setpowerDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })

    } if (isPower && isPowerPhase1) {
      console.log("power phase 1")
      UserService.GetLinkedDeviceData(isDeviceID, "L1_Power_A", args)
        .then((res) => {
          setpowerDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })

    } if (isPower && isPowerPhase2) {
      console.log("power phase 2")
      UserService.GetLinkedDeviceData(isDeviceID, "L2_Power_A", args)
        .then((res) => {
          setpowerDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })

    } if (isPower && isPowerPhase3) {
      console.log("power phase 3")
      UserService.GetLinkedDeviceData(isDeviceID, "L3_Power_A", args)
        .then((res) => {
          setpowerDataFromDB(res.data.data.deviceData)
        }).catch(err => {
          console.log(err)
        })

    }
  }


  return (
    <div>
      <Header />
      {/* MAin Navigation END    */}

      <section className="main-slider">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <div className>
                <div id="left" className="span3">
                  <Tooltip title="Right click to edit" placement="left">
                    <HelpOutlineOutlined className='help-icon' />
                  </Tooltip>
                  <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpanded={["root"]}
                    defaultExpandIcon={<ChevronRight />}
                    sx={{ height: '100%', flexGrow: 1, maxWidth: 500, overflowY: "auto" }}
                  >
                    {renderTree(rootTreeViewData)}
                  </TreeView>


                  {/* <TreeMenu data={rootTreeViewData}>
                    {({ search, items, resetOpenNodes }) => {
                      return (
                        <>
                          <input onChange={e => search(e.target.value)} placeholder="Search area & device" />
                          <button className="btn-info btn-sm" style={{ margin: 5 }} onClick={resetOpenNodes} >Collapse All</button>
                          <ul className="tree-item-group">

                            {items.map(props => {
                              const childrenProps = {
                                ...props,
                                onClick: () => {
                                  const { index, level, hasNodes, label, parent, is_type, device_id } = props
                                  console.log(index, level)
                                  console.log("hasNode", hasNodes)
                                  console.log(typeof (index))
                                  if (index == parseInt(0) && level == parseInt(0)) {
                                    console.log("true")
                                  } else {
                                    console.log("is type", is_type)
                                    if (is_type == "device") {
                                      console.log("device_id", device_id)
                                      setisDeviceID(device_id)
                                      setisPower(true)
                                      setisPowerTotal(true)
                                      setisEnergyPhase1(false)
                                      setisEnergyPhase2(false)
                                      setisEnergyPhase3(false)
                                      setisPowerPhase1(false)
                                      setisPowerPhase2(false)
                                      setisPowerPhase3(false)
                                      setisEnergy(false)
                                      setisEnergyDaily(false)
                                      setisEnergyMonthly(false)
                                      setshowGraph(true)
                                      setIsRenameDevice(false)
                                      setIsRenameArea(false)
                                      setIsAddArea(false)
                                      setIsAddDevice(false)
                                      setshowWelcomeDiv(false)
                                      setIsForgotDevice(false)
                                      setIsDeleteArea(false)
                                      setDeviceName(label)
                                      setisActiveRangeSwitch(null)

                                      setisStaticTxtValue1('T-Voltage')
                                      setisStaticTxtValue2('T-Current')
                                      setisStaticTxtValue3('T-Power')
                                      setisStaticTxtValue4('T-Energy')
                                      setisGraphLabelTxt('Total Power')

                                      let areaName = parent.split("/").pop()
                                      setAreaName(areaName)
                                      console.log("call device data api", { device_id: device_id, objectName: "T_power", dataType: null })
                                      io.current.emit("liveStatsData", { device_id: device_id, objectName: "T_power", dataType: null }, (response) => {
                                        console.log(response.status); // ok
                                      }); // sent to socket server
                                      io.current.emit("liveGraphData", { user_id: userID, device_id: device_id, objectName: "T_power_A", dataType: null }, (response) => {
                                        console.log(response.status); // ok
                                      }); // sent to socket server
                                      io.current.emit("checkDeviceStatus", { device_id: device_id }, (response) => {
                                        console.log(response.status); // ok
                                      })
                                      UserService.GetLinkedDeviceData(device_id, "T_power_A")
                                        .then((res) => {
                                          setpowerDataFromDB(res.data.data.deviceData)
                                        }).catch(err => {
                                          console.log(err)
                                        })

                                      //get latest stats for total voltage, current, power and energy
                                      setisGraphStatsLoading(true)
                                      UserService.GetLatestDeviceStatsData(device_id).then((res) => {
                                        setTimeout(() => {
                                          setisGraphStatsLoading(false)
                                        }, 1000)
                                        if (res.data.data.error) {
                                          setisStaticValue1("0.00")
                                          setisStaticValue2("0.00")
                                          setisStaticValue3("0.00")
                                          setisStaticValue4("0.00")
                                        } else {
                                          const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]

                                          setisStaticValue1(T_voltage)
                                          setisStaticValue2(T_current)
                                          setisStaticValue3(T_power)
                                          setisStaticValue4(T_energy)
                                          setisStaticTemperature(temperature) // temperature
                                        }

                                      }).catch(err => {
                                        console.log(err)
                                        setisGraphStatsLoading(false)
                                      })
                                    }
                                  }
                                },
                                style: { color: props.color || "black" }
                              };

                              return <ItemComponent {...childrenProps} />;
                            })}
                          </ul>
                        </>
                      );
                    }}
                  </TreeMenu> */}
                  <br />
                  <Stack className="add-btn" spacing={2} direction="row">
                    <Button
                      variant="contained"
                      color="success"
                      className={`${isAddDevice && isActiveBtn ? 'active' : null}`}
                      style={{
                        borderRadius: 25,
                        backgroundColor: "rgb(51, 164, 165)",
                        textTransform: "capitalize"
                      }}
                      onClick={() => {
                        setIsAddDevice(true)
                        setIsRenameArea(false)
                        setIsRenameDevice(false)
                        setIsDeleteArea(false)
                        setIsAddArea(false)
                        setshowGraph(false)
                        setshowWelcomeDiv(false)
                        setIsForgotDevice(false)
                        setIsActiveBtn(true)
                      }}
                    >
                      Add Device
                    </Button>
                    <Button
                      variant="contained"
                      className={`${isAddArea && isActiveBtn ? 'active' : null}`}
                      style={{
                        borderRadius: 25,
                        backgroundColor: "rgb(51, 164, 165)",
                        textTransform: "capitalize"
                      }}
                      onClick={() => {
                        setIsAddArea(true)
                        setIsRenameArea(false)
                        setIsRenameDevice(false)
                        setIsDeleteArea(false)
                        setIsAddDevice(false)
                        setshowWelcomeDiv(false)
                        setIsForgotDevice(false)
                        setIsActiveBtn(true)
                      }}
                    >
                      Add New Area
                    </Button>
                  </Stack>
                  <div className='btn-group'>
                    {/* <button type="button" class="btn-info btn-sm" onClick={() => {
                      setIsAddDevice(true)
                      setIsRenameArea(false)
                      setIsRenameDevice(false)
                      setIsDeleteArea(false)
                      setIsAddArea(false)
                      setshowGraph(false)
                      setshowWelcomeDiv(false)
                      setIsForgotDevice(false)
                    }}> Add Device</button>
                    <button type="button" class="btn-primary btn-sm" onClick={() => {
                      setIsAddArea(true)
                      setIsRenameArea(false)
                      setIsRenameDevice(false)
                      setIsDeleteArea(false)
                      setIsAddDevice(false)
                      setshowWelcomeDiv(false)
                      setIsForgotDevice(false)
                    }}> Add New Area</button> */}
                    {/* <button type="button" class="btn-primary btn-sm" onClick={() => {
                      setIsRenameArea(true)
                      setIsRenameDevice(false)
                      setIsDeleteArea(false)
                      setIsForgotDevice(false)
                      setIsAddDevice(false)
                      setIsAddArea(false)
                      setshowGraph(false)
                      setshowWelcomeDiv(false)
                    }}> Rename Areas</button>
                    <button type="button" class="btn-danger btn-sm" onClick={() => {
                      setIsForgotDevice(true)
                      setIsRenameArea(false)
                      setIsRenameDevice(false)
                      setIsDeleteArea(false)
                      setIsAddDevice(false)
                      setIsAddArea(false)
                      setshowGraph(false)
                      setshowWelcomeDiv(false)
                    }}> Delete Devices</button>
                    <button type="button" class="btn-danger btn-sm" onClick={() => {
                      setIsDeleteArea(true)
                      setIsRenameArea(false)
                      setIsRenameDevice(false)
                      setIsForgotDevice(false)
                      setIsAddDevice(false)
                      setIsAddArea(false)
                      setshowGraph(false)
                      setshowWelcomeDiv(false)
                    }}> Delete Areas</button>
                    <button type="button" class="btn-primary btn-sm" onClick={() => {
                      setIsRenameDevice(true)
                      setIsRenameArea(false)
                      setIsDeleteArea(false)
                      setIsForgotDevice(false)
                      setIsAddDevice(false)
                      setIsAddArea(false)
                      setshowGraph(false)
                      setshowWelcomeDiv(false)
                    }}> Rename Device</button>
                    <button type="button" class="btn-info btn-sm"
                    // onClick={() => {
                    //   setIsRenameDevice(true)
                    //   setIsRenameArea(false)
                    //   setIsDeleteArea(false)
                    //   setIsForgotDevice(false)
                    //   setIsAddDevice(false)
                    //   setIsAddArea(false)
                    //   setshowGraph(false)
                    //   setshowWelcomeDiv(false)
                    // }}
                    >Move Devices</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-sm-12">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  {
                    isforgotdDevice
                      ?
                      <div className="welcome_wraper" id='step2'>
                        <div className="section-heading text-center">
                          <section className="login_wraper">
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12 col-sm-12">
                                  <div className="contact-form2">
                                    <h4 className="text-uppercase text-center">Forgot Device</h4>
                                    <form onSubmit={handleSubmit4(onSubmitForgotDevice)}>
                                      <div className="form-group">
                                        <select
                                          {...register4("device_id")}
                                          className={`form-control ${errors4.device_id ? 'is-invalid' : ''}`}
                                        >
                                          <option value="">--------------------------- Select Device Name ---------------------------</option>
                                          {addedDevices}
                                        </select>
                                        <span style={{ color: 'red', float: 'left' }}>{errors4.device_id?.message}</span>
                                      </div>
                                      {
                                        forgotisLoading
                                          ?
                                          <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                          </button>
                                          :
                                          <>
                                            <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting4}>Submit</button>
                                          </>
                                      }
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      :
                      null
                  }
                  {
                    isDeleteArea
                      ?
                      <div className="welcome_wraper" id='step2'>
                        <div className="section-heading text-center">
                          <section className="login_wraper">
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12 col-sm-12">
                                  <div className="contact-form2">
                                    <h4 className="text-uppercase text-center">Delete Area</h4>
                                    <form onSubmit={handleSubmit5(onSubmitDeleteArea)}>
                                      <div className="form-group">
                                        <select
                                          {...register5("area_id")}
                                          className={`form-control ${errors5.area_id ? 'is-invalid' : ''}`}
                                        >
                                          <option value="">--------------------------- Select Area Name ---------------------------</option>
                                          {addedAreas}
                                        </select>
                                        <span style={{ color: 'red', float: 'left' }}>{errors5.area_id?.message}</span>
                                      </div>
                                      {
                                        deleteAreaisLoading
                                          ?
                                          <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                          </button>

                                          :
                                          <>
                                            <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting5}>Submit</button>
                                          </>

                                      }
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      :
                      null
                  }
                  {
                    isRenameArea
                      ?
                      <div className="welcome_wraper" id='step2'>
                        <div className="section-heading text-center">
                          <section className="login_wraper">
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12 col-sm-12">
                                  <div className="contact-form2">
                                    <h4 className="text-uppercase text-center">Rename Area</h4>
                                    <form onSubmit={handleSubmit6(onSubmitRenameArea)}>
                                      <div className="form-group">
                                        <select
                                          {...register6("area_id")}
                                          className={`form-control ${errors6.area_id ? 'is-invalid' : ''}`}
                                        >
                                          <option value="">--------------------------- Select Area Name ---------------------------</option>
                                          {addedAreas}
                                        </select>
                                        <span style={{ color: 'red', float: 'left' }}>{errors6.area_id?.message}</span>
                                      </div>
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          {...register6("area_name")}
                                          placeholder="Enter area name"
                                          className={`form-control ${errors6.area_name ? 'is-invalid' : ''}`}
                                          autoComplete="off"
                                        />
                                        <span style={{ color: 'red', float: 'left' }}>{errors6.area_name?.message}</span>
                                      </div>
                                      {
                                        renameAreaisLoading
                                          ?
                                          <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                          </button>

                                          :
                                          <>
                                            <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting6}>Submit</button>
                                          </>

                                      }
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      :
                      null
                  }
                  {
                    isRenameDevice
                      ?
                      <div className="welcome_wraper" id='step2'>
                        <div className="section-heading text-center">
                          <section className="login_wraper">
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12 col-sm-12">
                                  <div className="contact-form2">
                                    <h4 className="text-uppercase text-center">Rename Device</h4>
                                    <form onSubmit={handleSubmit7(onSubmitRenameDevice)}>
                                      <div className="form-group">
                                        <select
                                          {...register7("device_id")}
                                          className={`form-control ${errors7.device_id ? 'is-invalid' : ''}`}
                                        >
                                          <option value="">--------------------------- Select Device Name ---------------------------</option>
                                          {addedDevices}
                                        </select>
                                        <span style={{ color: 'red', float: 'left' }}>{errors7.device_id?.message}</span>
                                      </div>
                                      <div className="form-group">
                                        <input
                                          type="text"
                                          {...register7("device_name")}
                                          placeholder="Enter device name"
                                          className={`form-control ${errors7.device_name ? 'is-invalid' : ''}`}
                                          autoComplete="off"
                                        />
                                        <span style={{ color: 'red', float: 'left' }}>{errors7.device_name?.message}</span>
                                      </div>
                                      {
                                        deleteAreaisLoading
                                          ?
                                          <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                          </button>

                                          :
                                          <>
                                            <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting7}>Submit</button>
                                          </>

                                      }
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      :
                      null
                  }
                  {
                    isMoveDevice
                      ?
                      <div className="welcome_wraper" id='step2'>
                        <div className="section-heading text-center">
                          <section className="login_wraper">
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12 col-sm-12">
                                  <div className="contact-form2">
                                    <h4 className="text-uppercase text-center">Move Device</h4>
                                    <form onSubmit={handleSubmit8(onSubmitMoveDevice)}>
                                      <div className="form-group">
                                        <select
                                          {...register8("device_id")}
                                          className={`form-control ${errors8.device_id ? 'is-invalid' : ''}`}
                                        >
                                          <option value="">--------------------------- Select Device Name ---------------------------</option>
                                          {addedDevices}
                                        </select>
                                        <span style={{ color: 'red', float: 'left' }}>{errors8.device_id?.message}</span>
                                      </div>
                                      <div className="form-group">
                                        <select
                                          {...register8("area_id")}
                                          className={`form-control ${errors8.area_id ? 'is-invalid' : ''}`}
                                        >
                                          <option value="">--------------------------- Select Area Name ---------------------------</option>
                                          {addedAreas}
                                        </select>
                                        <span style={{ color: 'red', float: 'left' }}>{errors8.area_id?.message}</span>
                                      </div>

                                      {
                                        deleteAreaisLoading
                                          ?
                                          <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                          </button>

                                          :
                                          <>
                                            <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting7}>Submit</button>
                                          </>

                                      }
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      :
                      null
                  }
                  {
                    isAddDeviceTouser
                      ?
                      <div className="welcome_wraper" id='step2'>
                        <div className="section-heading text-center">
                          <section className="login_wraper">
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12 col-sm-12">
                                  <div className="contact-form2">
                                    <h4 className="text-uppercase text-center">Add Device To User</h4>
                                    <form onSubmit={handleSubmit9(onSubmitaddDeviceToUser)}>
                                      <div className="form-group">
                                        <input
                                          type="hidden"
                                          {...register9("device_name")}
                                        />
                                        <input
                                          type="hidden"
                                          {...register9("user_id")}
                                        />
                                        <input
                                          type="hidden"
                                          {...register9("device_id")}
                                        />
                                        <input
                                          type="text"
                                          {...register9("email")}
                                          className={`form-control ${errors9.email ? 'is-invalid' : ''}`}
                                          placeholder="Enter User Email ID"
                                        />
                                        <span style={{ color: 'red', float: 'left' }}>{errors9.email?.message}</span>
                                      </div>
                                      {
                                        isaddDeviceToUser
                                          ?
                                          <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                          </button>

                                          :
                                          <>
                                            <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting9}>Submit</button>
                                          </>

                                      }
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      :
                      null
                  }
                  {/* ---------------------- Add new device section ------------------------- */}

                  {/* Step 1 */}
                  {
                    isAddDevice
                      ?
                      stepOne
                        ?
                        <div className="welcome_wraper" id='step1'>
                          <div className="section-heading text-center">
                            <section className="login_wraper">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-12 col-sm-12">
                                    <div className="contact-form2">
                                      <h4 className="text-uppercase text-center">Add Device (Step 1)</h4>
                                      <form onSubmit={handleSubmit2(onSubmitStepOne)}>
                                        <div className="form-group">
                                          <select
                                            {...register2("modal_name")}
                                            className={`form-control ${errors2.modal_name ? 'is-invalid' : ''}`}
                                          >
                                            <option value="">--------------------------- Select Modal  ---------------------------</option>
                                            <option value="IPL - 100 V1">IPL - 100 V1</option>
                                          </select>
                                          <span style={{ color: 'red', float: 'left' }}>{errors2.modal_name?.message}</span>
                                        </div>
                                        <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting2}>Next</button>

                                      </form>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                        :
                        stepTwo
                          ?
                          <div className="welcome_wraper" id='step2'>
                            <div className="section-heading text-center">
                              <section className="login_wraper">
                                <div className="container">
                                  <div className="row">
                                    <div className="col-lg-12 col-sm-12">
                                      <div className="contact-form2">
                                        <h4 className="text-uppercase text-center">Add Device (Step 2)</h4>
                                        <form onSubmit={handleSubmit3(onSubmitSteptwo)}>
                                          <div className="form-group">
                                            <select
                                              {...register3("parent_id")}
                                              className={`form-control ${errors3.parent_id ? 'is-invalid' : ''}`}
                                            >
                                              <option value="">--------------------------- Select Area ---------------------------</option>
                                              {optionTemplate}
                                            </select>
                                            <span style={{ color: 'red', float: 'left' }}>{errors3.parent_id?.message}</span>
                                          </div>
                                          <div className="form-group">
                                            <input
                                              type="text"
                                              {...register3("device_name")}
                                              placeholder="Please enter device name"
                                              className={`form-control ${errors3.device_name ? 'is-invalid' : ''}`}
                                              autoComplete="off"
                                            />
                                            <span style={{ color: 'red', float: 'left' }}>{errors3.device_name?.message}</span>
                                          </div>

                                          <div className="form-group">
                                            <input
                                              type="text"
                                              {...register3("device_id")}
                                              placeholder="Please enter the device ID "
                                              className={`form-control ${errors3.device_id ? 'is-invalid' : ''}`}
                                              autoComplete="off"
                                            />
                                            <span style={{ color: 'red', float: 'left' }}>{errors3.device_id?.message}</span>
                                          </div>

                                          <button type="button" style={{ borderRadius: 25, margin: 10 }} className="btn btn-info" onClick={() => {
                                            setstepOne(true)
                                            setstepTwo(false)
                                          }}>Exit</button>
                                          {
                                            stepTwoisLoading
                                              ?
                                              <button className="btn btn-primary" style={{ borderRadius: 25 }}>Verifying...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                              </button>

                                              :
                                              <>
                                                <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting3}>{addDeviceBtnText}</button>
                                              </>

                                          }
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                          :
                          null
                      :
                      null
                  }

                  {
                    showWelcomeDiv
                      ?
                      <div className="welcome_wraper">
                        <div className="section-heading text-center">
                          <h2>Welcome</h2>
                          <p className>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                          <div className="seperator" />
                        </div>
                      </div>
                      :
                      null
                  }


                  {/*graph chart*/}
                  {
                    showGraph
                      ?
                      isAddArea
                        ?
                        <div className="welcome_wraper">
                          <div className="section-heading text-center">
                            <section className="login_wraper">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-12 col-sm-12">
                                    <div className="contact-form2">
                                      <h4 className="text-uppercase text-center">Add Area</h4>
                                      <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                          <select
                                            {...register("parent_id")}
                                            className={`form-control ${errors.parent_id ? 'is-invalid' : ''}`}
                                          >
                                            <option value="">--------------------------- Select Area ---------------------------</option>
                                            {optionTemplate}
                                          </select>
                                          <span style={{ color: 'red', float: 'left' }}>{errors.parent_id?.message}</span>
                                        </div>
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            {...register("area_name")}
                                            placeholder="Enter Area name"
                                            className={`form-control ${errors.area_name ? 'is-invalid' : ''}`}
                                            autoComplete="off"
                                          />
                                          <span style={{ color: 'red', float: 'left' }}>{errors.area_name?.message}</span>
                                        </div>
                                        {
                                          isLoading
                                            ?
                                            <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                            </button>

                                            :
                                            <>
                                              <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                                              <button type="button" style={{ borderRadius: 25 }} className="btn btn-danger" onClick={() => setIsAddArea(false)}>Close</button>
                                            </>

                                        }

                                      </form>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                        :
                        <div className="grpah_table">
                          <div className="col-lg-12 box_graph device_name">
                            <div className="widget_categories right-widget top_heding ">
                              {/* <h4><b>{areaName}</b> - {devicename} */}
                              <h4>{devicename}
                                <span style={{ background: `${isDeviceStatus}` }} />
                              </h4>
                            </div>
                          </div>
                          <div className="col-lg-12 box_graph">
                            <div className="widget_categories right-widget top_heding">
                              <div className="tags top_tag">
                                {
                                  isPower || isTemperature || isControl
                                    ?
                                    <>
                                      {/* <div className="tags bottom_tag"> */}
                                      <a
                                        onClick={() => {
                                          setisPower(true)
                                          setisPowerTotal(true)
                                          setisPowerPhase1(false)
                                          setisPowerPhase2(false)
                                          setisPowerPhase3(false)
                                          setisEnergy(false)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisStaticTxtValue1('T-Voltage')
                                          setisStaticTxtValue2('T-Current')
                                          setisStaticTxtValue3('T-Power')
                                          setisStaticTxtValue4('T-Energy')
                                          setisGraphLabelTxt('Total Power')



                                          setisActiveRangeSwitch(null)

                                          UserService.GetLinkedDeviceData(isDeviceID, "T_power_A")
                                            .then((res) => {
                                              setpowerDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(T_voltage)
                                            setisStaticValue2(T_current)
                                            setisStaticValue3(T_power)
                                            setisStaticValue4(T_energy)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })
                                          //socket event emit
                                          io.current.emit("liveGraphData", { user_id: userID, device_id: isDeviceID, objectName: "T_power_A", dataType: null }, (response) => {
                                            console.log(response.status); // ok
                                          }); // sent to socket server

                                        }}
                                        className={`tag-cloud-link ${isPowerTotal || isEnergyTotal ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Total
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(true)
                                          setisPowerTotal(false)
                                          setisPowerPhase1(true)
                                          setisPowerPhase2(false)
                                          setisPowerPhase3(false)
                                          setisEnergy(false)
                                          setisEnergyTotal(false)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisStaticTxtValue1('L1-Voltage')
                                          setisStaticTxtValue2('L1-Current')
                                          setisStaticTxtValue3('L1-Power')
                                          setisStaticTxtValue4('L1-Energy')
                                          setisGraphLabelTxt('L1 Power')

                                          setisActiveRangeSwitch(null)



                                          UserService.GetLinkedDeviceData(isDeviceID, "L1_Power_A")
                                            .then((res) => {
                                              setpowerDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l1_voltage, l1_current, AP_power_l1, T_Energy_L1, temperature } = res.data.data.deviceData[0]
                                            console.log("power phase 1 res data", res.data.data.deviceData[0])
                                            setisStaticValue1(l1_voltage)
                                            setisStaticValue2(l1_current)
                                            setisStaticValue3(AP_power_l1)
                                            setisStaticValue4(T_Energy_L1)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })
                                          //socket event emit
                                          io.current.emit("liveGraphData", { user_id: userID, device_id: isDeviceID, objectName: "L1_Power_A", dataType: null }, (response) => {
                                            console.log(response.status); // ok
                                          }); // sent to socket server

                                        }}
                                        className={`tag-cloud-link ${isPowerPhase1 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 1
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(true)
                                          setisPowerTotal(false)
                                          setisPowerPhase1(false)
                                          setisPowerPhase2(true)
                                          setisPowerPhase3(false)
                                          setisEnergy(false)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisStaticTxtValue1('L2-Voltage')
                                          setisStaticTxtValue2('L2-Current')
                                          setisStaticTxtValue3('L2-Power')
                                          setisStaticTxtValue4('L2-Energy')
                                          setisGraphLabelTxt('L2 Power')
                                          setisActiveRangeSwitch(null)



                                          UserService.GetLinkedDeviceData(isDeviceID, "L2_Power_A")
                                            .then((res) => {
                                              setpowerDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l2_voltage, l2_current, AP_power_l2, T_Energy_L2, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(l2_voltage)
                                            setisStaticValue2(l2_current)
                                            setisStaticValue3(AP_power_l2)
                                            setisStaticValue4(T_Energy_L2)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })
                                          //socket event emit
                                          io.current.emit("liveGraphData", { user_id: userID, device_id: isDeviceID, objectName: "L2_Power_A", dataType: null }, (response) => {
                                            console.log(response.status); // ok
                                          }); // sent to socket server

                                        }}
                                        className={`tag-cloud-link ${isPowerPhase2 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 2
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(true)
                                          setisPowerTotal(false)
                                          setisPowerPhase1(false)
                                          setisPowerPhase2(false)
                                          setisPowerPhase3(true)
                                          setisEnergy(false)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisStaticTxtValue1('L3-Voltage')
                                          setisStaticTxtValue2('L3-Current')
                                          setisStaticTxtValue3('L3-Power')
                                          setisStaticTxtValue4('L3-Energy')
                                          setisGraphLabelTxt('L3 Power')
                                          setisActiveRangeSwitch(null)



                                          UserService.GetLinkedDeviceData(isDeviceID, "L3_Power_A")
                                            .then((res) => {
                                              setpowerDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l3_voltage, l3_current, AP_power_l3, T_Energy_L3, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(l3_voltage)
                                            setisStaticValue2(l3_current)
                                            setisStaticValue3(AP_power_l3)
                                            setisStaticValue4(T_Energy_L3)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })
                                          //socket event emit
                                          io.current.emit("liveGraphData", { user_id: userID, device_id: isDeviceID, objectName: "L3_Power_A", dataType: null }, (response) => {
                                            console.log(response.status); // ok
                                          }); // sent to socket server

                                        }}
                                        className={`tag-cloud-link ${isPowerPhase3 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 3</a>
                                      {/* </div> */}
                                    </>
                                    :
                                    null
                                }
                                {
                                  isEnergyDaily
                                    ?
                                    <>
                                      {/* <div className="tags bottom_tag"> */}
                                      <a
                                        onClick={() => {
                                          setisPower(false)
                                          setisPowerTotal(false)
                                          setisEnergyPhase1(false)
                                          setisEnergyPhase2(false)
                                          setisEnergyPhase3(false)
                                          setisEnergy(true)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisEnergyTotal(true)
                                          setisStaticTxtValue1('T-Voltage')
                                          setisStaticTxtValue2('T-Current')
                                          setisStaticTxtValue3('T-Power')
                                          setisStaticTxtValue4('T-Energy')
                                          setisGraphLabelTxt('T-Energy-Daily')

                                          UserService.GetLinkedDeviceData(isDeviceID, "T_Energy_Hr_A", "daily")
                                            .then((res) => {
                                              setenergyDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(T_voltage)
                                            setisStaticValue2(T_current)
                                            setisStaticValue3(T_power)
                                            setisStaticValue4(T_energy)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })

                                        }}
                                        className={`tag-cloud-link ${isPowerTotal || isEnergyTotal ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Total
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(false)
                                          setisPowerTotal(false)
                                          setisEnergyPhase1(true)
                                          setisEnergyPhase2(false)
                                          setisEnergyPhase3(false)
                                          setisEnergy(true)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisEnergyTotal(false)
                                          setisStaticTxtValue1('L1-Voltage')
                                          setisStaticTxtValue2('L1-Current')
                                          setisStaticTxtValue3('L1-Power')
                                          setisStaticTxtValue4('L1-Energy')
                                          setisGraphLabelTxt('L1-Energy-Daily')

                                          UserService.GetLinkedDeviceData(isDeviceID, "L1_Energy_Hr_A", "daily")
                                            .then((res) => {
                                              setenergyDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l1_voltage, l1_current, AP_power_l1, T_Energy_L1, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(l1_voltage)
                                            setisStaticValue2(l1_current)
                                            setisStaticValue3(AP_power_l1)
                                            setisStaticValue4(T_Energy_L1)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })

                                        }}
                                        className={`tag-cloud-link ${isEnergyPhase1 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 1
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(false)
                                          setisPowerTotal(false)
                                          setisEnergyPhase1(false)
                                          setisEnergyPhase2(true)
                                          setisEnergyPhase3(false)
                                          setisEnergy(true)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisEnergyTotal(false)
                                          setisStaticTxtValue1('L2-Voltage')
                                          setisStaticTxtValue2('L2-Current')
                                          setisStaticTxtValue3('L2-Power')
                                          setisStaticTxtValue4('L2-Energy')
                                          setisGraphLabelTxt('L2-Energy-Daily')

                                          UserService.GetLinkedDeviceData(isDeviceID, "L2_Energy_Hr_A", "daily")
                                            .then((res) => {
                                              setenergyDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l2_voltage, l2_current, AP_power_l2, T_Energy_L2, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(l2_voltage)
                                            setisStaticValue2(l2_current)
                                            setisStaticValue3(AP_power_l2)
                                            setisStaticValue4(T_Energy_L2)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })

                                        }}
                                        className={`tag-cloud-link ${isEnergyPhase2 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 2
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(false)
                                          setisPowerTotal(false)
                                          setisEnergyPhase1(false)
                                          setisEnergyPhase2(false)
                                          setisEnergyPhase3(true)
                                          setisEnergy(true)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisEnergyTotal(false)
                                          setisStaticTxtValue1('L3-Voltage')
                                          setisStaticTxtValue2('L3-Current')
                                          setisStaticTxtValue3('L3-Power')
                                          setisStaticTxtValue4('L3-Energy')
                                          setisGraphLabelTxt('L3-Energy-Daily')

                                          UserService.GetLinkedDeviceData(isDeviceID, "L3_Energy_Hr_A", "daily")
                                            .then((res) => {
                                              setenergyDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l3_voltage, l3_current, AP_power_l3, T_Energy_L3, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(l3_voltage)
                                            setisStaticValue2(l3_current)
                                            setisStaticValue3(AP_power_l3)
                                            setisStaticValue4(T_Energy_L3)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })

                                        }}
                                        className={`tag-cloud-link ${isEnergyPhase3 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 3
                                      </a>
                                      {/* </div> */}
                                    </>
                                    :
                                    null
                                }
                                {
                                  isEnergyMonthly
                                    ?
                                    <>
                                      {/* <div className="tags bottom_tag"> */}
                                      <a
                                        onClick={() => {
                                          setisPower(false)
                                          setisPowerTotal(false)
                                          setisEnergyPhase1(false)
                                          setisEnergyPhase2(false)
                                          setisEnergyPhase3(false)
                                          setisEnergy(true)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisEnergyTotal(true)
                                          setisStaticTxtValue1('T-Voltage')
                                          setisStaticTxtValue2('T-Current')
                                          setisStaticTxtValue3('T-Power')
                                          setisStaticTxtValue4('T-Energy')
                                          setisGraphLabelTxt('T-Energy-Monthly')


                                          UserService.GetLinkedDeviceData(isDeviceID, "T_Energy_D_A", "monthly")
                                            .then((res) => {
                                              setenergyDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(T_voltage)
                                            setisStaticValue2(T_current)
                                            setisStaticValue3(T_power)
                                            setisStaticValue4(T_energy)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })

                                        }}
                                        className={`tag-cloud-link ${isPowerTotal || isEnergyTotal ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Total
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(false)
                                          setisPowerTotal(false)
                                          setisEnergyPhase1(true)
                                          setisEnergyPhase2(false)
                                          setisEnergyPhase3(false)
                                          setisEnergy(true)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisEnergyTotal(false)
                                          setisStaticTxtValue1('L1-Voltage')
                                          setisStaticTxtValue2('L1-Current')
                                          setisStaticTxtValue3('L1-Power')
                                          setisStaticTxtValue4('L1-Energy')
                                          setisGraphLabelTxt('L1-Energy-Monthly')

                                          UserService.GetLinkedDeviceData(isDeviceID, "L1_Energy_D_A", "monthly")
                                            .then((res) => {
                                              setenergyDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l1_voltage, l1_current, AP_power_l1, T_Energy_L1, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(l1_voltage)
                                            setisStaticValue2(l1_current)
                                            setisStaticValue3(AP_power_l1)
                                            setisStaticValue4(T_Energy_L1)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })

                                        }}
                                        className={`tag-cloud-link ${isEnergyPhase1 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 1
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(false)
                                          setisPowerTotal(false)
                                          setisEnergyPhase1(false)
                                          setisEnergyPhase2(true)
                                          setisEnergyPhase3(false)
                                          setisEnergy(true)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisEnergyTotal(false)
                                          setisStaticTxtValue1('L2-Voltage')
                                          setisStaticTxtValue2('L2-Current')
                                          setisStaticTxtValue3('L2-Power')
                                          setisStaticTxtValue4('L2-Energy')
                                          setisGraphLabelTxt('L2-Energy-Monthly')

                                          UserService.GetLinkedDeviceData(isDeviceID, "L2_Energy_D_A", "monthly")
                                            .then((res) => {
                                              setenergyDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l2_voltage, l2_current, AP_power_l2, T_Energy_L2, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(l2_voltage)
                                            setisStaticValue2(l2_current)
                                            setisStaticValue3(AP_power_l2)
                                            setisStaticValue4(T_Energy_L2)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })

                                        }}
                                        className={`tag-cloud-link ${isEnergyPhase2 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 2
                                      </a>
                                      <a
                                        onClick={() => {
                                          setisPower(false)
                                          setisPowerTotal(false)
                                          setisEnergyPhase1(false)
                                          setisEnergyPhase2(false)
                                          setisEnergyPhase3(true)
                                          setisEnergy(true)
                                          setisTemperature(false)
                                          setisControl(false)
                                          setisEnergyTotal(false)
                                          setisStaticTxtValue1('L3-Voltage')
                                          setisStaticTxtValue2('L3-Current')
                                          setisStaticTxtValue3('L3-Power')
                                          setisStaticTxtValue4('L3-Energy')
                                          setisGraphLabelTxt('L3-Energy-Monthly')

                                          UserService.GetLinkedDeviceData(isDeviceID, "L3_Energy_D_A", "monthly")
                                            .then((res) => {
                                              setenergyDataFromDB(res.data.data.deviceData)
                                            }).catch(err => {
                                              console.log(err)
                                            })
                                          //get latest stats for total voltage, current, power and energy
                                          UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                            const { l3_voltage, l3_current, AP_power_l3, T_Energy_L3, temperature } = res.data.data.deviceData[0]
                                            setisStaticValue1(l3_voltage)
                                            setisStaticValue2(l3_current)
                                            setisStaticValue3(AP_power_l3)
                                            setisStaticValue4(T_Energy_L3)
                                            setisStaticTemperature(temperature) // temperature
                                          }).catch(err => {
                                            console.log(err)
                                          })

                                        }}
                                        className={`tag-cloud-link ${isEnergyPhase3 ? "bg_green" : null} `}
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Phase - 3
                                      </a>
                                      {/* </div> */}
                                    </>
                                    :
                                    null
                                }
                                <a
                                  onClick={() => {
                                    setisPower(false)
                                    setisPowerTotal(false)
                                    setisEnergyPhase1(false)
                                    setisEnergyPhase2(false)
                                    setisEnergyPhase3(false)
                                    setisPowerPhase1(false)
                                    setisPowerPhase2(false)
                                    setisPowerPhase3(false)
                                    setisEnergy(false)
                                    setisTemperature(false)
                                    setisEnergyDaily(false)
                                    setisEnergyMonthly(false)
                                    setshowGraph(true)
                                    setIsRenameDevice(false)
                                    setIsRenameArea(false)
                                    setIsAddArea(false)
                                    setIsAddDevice(false)
                                    setshowWelcomeDiv(false)
                                    setIsForgotDevice(false)
                                    setIsDeleteArea(false)
                                    SetIsMoveDevice(false)
                                    //setDeviceName(label)
                                    setisActiveRangeSwitch(null)
                                    setisControl(true)
                                    setisEnergyDaily(false)
                                    setisEnergyMonthly(false)
                                    setisEnergyTotal(false)
                                  }}
                                  style={{ cursor: 'pointer' }}
                                  className={`tag-cloud-link ${isControl ? "bg_green" : null} `}
                                >
                                  Control
                                </a>
                                <a href="#" className="tag-cloud-link ">Diagnostic</a>
                                <a
                                  onClick={() => {
                                    setisPower(false)
                                    setisPowerTotal(false)
                                    setisEnergyPhase1(false)
                                    setisEnergyPhase2(false)
                                    setisEnergyPhase3(false)
                                    setisPowerPhase1(false)
                                    setisPowerPhase2(false)
                                    setisPowerPhase3(false)
                                    setisEnergy(false)
                                    setisTemperature(true)
                                    setisEnergyDaily(false)
                                    setisEnergyMonthly(false)
                                    setshowGraph(true)
                                    setIsRenameDevice(false)
                                    setIsRenameArea(false)
                                    setIsAddArea(false)
                                    setIsAddDevice(false)
                                    setshowWelcomeDiv(false)
                                    setIsForgotDevice(false)
                                    setIsDeleteArea(false)
                                    SetIsMoveDevice(false)
                                    //setDeviceName(label)
                                    setisActiveRangeSwitch(null)
                                    setisControl(false)
                                    setisEnergyDaily(false)
                                    setisEnergyMonthly(false)
                                    setisEnergyTotal(false)

                                    setisStaticTxtValue1('T-Voltage')
                                    setisStaticTxtValue2('T-Current')
                                    setisStaticTxtValue3('T-Power')
                                    setisStaticTxtValue4('T-Energy')
                                    setisGraphLabelTxt('Temperature in ℃')

                                    UserService.GetLinkedDeviceTemperatureData(isDeviceID, "temperature")
                                      .then((res) => {
                                        console.log("get device temperature data res--", res.data.data.deviceData)
                                        settempetureDataFromDB(res.data.data.deviceData)
                                        setIsstartDate(res.data.data.deviceData[0].date)
                                      }).catch(err => {
                                        console.log(err)
                                      })
                                    //get latest stats for total voltage, current, power and energy
                                    UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                      const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]
                                      setisStaticValue1(T_voltage)
                                      setisStaticValue2(T_current)
                                      setisStaticValue3(T_power)
                                      setisStaticValue4(T_energy)
                                      setisStaticTemperature(temperature) // temperature
                                    }).catch(err => {
                                      console.log(err)
                                    })
                                    io.current.emit("liveStatsData", { user_id: userID, device_id: isDeviceID, objectName: "T_power", dataType: null }); // sent to socket server
                                    io.current.emit("liveGraphData", { user_id: userID, device_id: isDeviceID, objectName: "temperature", dataType: null }); // sent to socket server
                                    io.current.emit("checkDeviceStatus", { device_id: isDeviceID })

                                  }}
                                  style={{ cursor: 'pointer' }}
                                  className={`tag-cloud-link ${isTemperature ? "bg_green" : null} `}
                                >
                                  <DeviceThermostat />
                                  {parseFloat(isStaticTemperature).toFixed(2)} ℃
                                </a>
                              </div>
                            </div>


                            <DeviceStats
                              isStaticTxtValue1={isStaticTxtValue1}
                              isStaticTxtValue2={isStaticTxtValue2}
                              isStaticTxtValue3={isStaticTxtValue3}
                              isStaticTxtValue4={isStaticTxtValue4}
                              isStaticValue1={isStaticValue1}
                              isStaticValue2={isStaticValue2}
                              isStaticValue3={isStaticValue3}
                              isStaticValue4={isStaticValue4}
                              isGraphStatsLoading={isGraphStatsLoading}
                            />


                            {
                              isControl
                                ?
                                <Control device_id={isDeviceID} userID={userID} isSharedDevice={isSharedDevice} isDeviceStatus={isDeviceStatus} />
                                :
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <div className="row">
                                    {
                                      (isTemperature == false)
                                        ?
                                        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
                                          <div className="row">
                                            <div className="tags left_wraper">
                                              <Stack spacing={2} sx={{ paddingRight: "10px" }}>

                                                <Button
                                                  variant="contained"
                                                  className={`${isPower ? 'active' : null}`}
                                                  style={{
                                                    borderRadius: 25,
                                                    backgroundColor: "rgb(51, 164, 165)",
                                                    textTransform: "capitalize"
                                                  }}
                                                  size="large"
                                                  onClick={() => {
                                                    setisPower(true)
                                                    setisPowerTotal(true)
                                                    setisPowerPhase1(false)
                                                    setisPowerPhase2(false)
                                                    setisPowerPhase3(false)
                                                    setisEnergy(false)
                                                    setisTemperature(false)
                                                    setisControl(false)
                                                    setisEnergyDaily(false)
                                                    setisEnergyMonthly(false)
                                                    setisActiveRangeSwitch(null)
                                                    setisStaticTxtValue1('T-Voltage')
                                                    setisStaticTxtValue2('T-Current')
                                                    setisStaticTxtValue3('T-Power')
                                                    setisStaticTxtValue4('T-Energy')
                                                    setisGraphLabelTxt('Total Power')

                                                    UserService.GetLinkedDeviceData(isDeviceID, "T_power_A")
                                                      .then((res) => {
                                                        setpowerDataFromDB(res.data.data.deviceData)
                                                      }).catch(err => {
                                                        console.log(err)
                                                      })
                                                    //get latest stats for total voltage, current, power and energy
                                                    UserService.GetLatestDeviceStatsData(isDeviceID).then((res) => {
                                                      const { T_voltage, T_current, T_power, T_energy, temperature } = res.data.data.deviceData[0]
                                                      setisStaticValue1(T_voltage)
                                                      setisStaticValue2(T_current)
                                                      setisStaticValue3(T_power)
                                                      setisStaticValue4(T_energy)
                                                      setisStaticTemperature(temperature) // temperature
                                                    }).catch(err => {
                                                      console.log(err)
                                                    })
                                                  }}
                                                >
                                                  Power
                                                </Button>
                                                <Button
                                                  variant="contained"
                                                  className={`${isEnergy ? 'active' : null}`}
                                                  style={{
                                                    borderRadius: 25,
                                                    backgroundColor: "rgb(51, 164, 165)",
                                                    textTransform: "capitalize"
                                                  }}
                                                  size="large"
                                                  aria-controls={open ? 'basic-menu' : undefined}
                                                  aria-haspopup="true"
                                                  aria-expanded={open ? 'true' : undefined}
                                                  onClick={handleClick}
                                                  endIcon={<KeyboardArrowDown />}
                                                >
                                                  Energy
                                                </Button>
                                                <Menu
                                                  id="basic-menu"
                                                  anchorEl={anchorEl}
                                                  open={open}
                                                  // onClose={handleCloseMenu}
                                                  MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                  }}
                                                >
                                                  <MenuItem onClick={() => handleCloseMenu('daily')}>Daily</MenuItem>
                                                  <MenuItem onClick={() => handleCloseMenu('monthly')}>Monthly</MenuItem>
                                                </Menu>
                                              </Stack>
                                            </div>
                                          </div>
                                        </div>
                                        :
                                        null
                                    }

                                    <div className={`col-xl-${isTemperature ? 12 : 10} col-lg-${isTemperature ? 12 : 8} col-md-${isTemperature ? 12 : 8} col-sm-12`}>
                                      <div className="row right_wraper">

                                        <div className="tags ">
                                          <span>{isGraphLabelTxt}</span>
                                          <span>
                                            {
                                              isPower || isTemperature
                                                ?
                                                <DateRangePicker
                                                  key={keyRef.current}
                                                  onCallback={handleCallback}
                                                  onApply={handleApply}
                                                  initialSettings={isInitialDateData}
                                                >
                                                  <input type="text" className="form-control" placeholder='Select date range' style={{ fontSize: 12, border: "1px solid #46acad", borderRadius: 25 }} />
                                                </DateRangePicker>
                                                :
                                                null
                                            }
                                          </span>

                                        </div>

                                        <div className="graph_wraper">
                                          {
                                            isPower
                                              ?
                                              <PowerCharts
                                                powerDataFromDB={powerDataFromDB}
                                              />
                                              :
                                              null
                                          }

                                          {
                                            isTemperature
                                              ?
                                              <TempetureChart
                                                tempetureDataFromDB={tempetureDataFromDB}
                                              />
                                              :
                                              null
                                          }
                                          {
                                            isEnergyDaily
                                              ?
                                              <EnergyChart
                                                energyDataFromDB={energyDataFromDB}
                                                chartType="daily" />
                                              :
                                              null
                                          }

                                          {
                                            isEnergyMonthly
                                              ?
                                              <EnergyChart
                                                energyDataFromDB={energyDataFromDB}
                                                chartType="monthly" />
                                              :
                                              null
                                          }

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            }



                            {
                              isPower
                                ?
                                <>
                                  {/* <div class="switcher">
                                    <button title='1 Day' class={`switcher-item ${isActiveRangeSwitch == "1D" ? 'switcher-active-item' : null}`} onClick={() => powerGrapghRangeSwitcher("1D")}>1D</button>
                                    <button title='1 Week' class={`switcher-item ${isActiveRangeSwitch == "1W" ? 'switcher-active-item' : null}`} onClick={() => powerGrapghRangeSwitcher("1W")}>1W</button>
                                    <button title='1 Month' class={`switcher-item ${isActiveRangeSwitch == "1M" ? 'switcher-active-item' : null}`} onClick={() => powerGrapghRangeSwitcher("1M")}>1M</button>
                                    <button title='6 Month' class={`switcher-item ${isActiveRangeSwitch == "6M" ? 'switcher-active-item' : null}`} onClick={() => powerGrapghRangeSwitcher("6M")}>6M</button>


                                  </div> */}

                                </>
                                :
                                null
                            }



                          </div>
                        </div>
                      :
                      isAddArea
                        ?
                        <div className="welcome_wraper">
                          <div className="section-heading text-center">
                            <section className="login_wraper">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-12 col-sm-12">
                                    <div className="contact-form2">
                                      <h4 className="text-uppercase text-center">Add Area</h4>
                                      <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                          <select
                                            {...register("parent_id")}
                                            className={`form-control ${errors.parent_id ? 'is-invalid' : ''}`}
                                          >
                                            <option value="">--------------------------- Select Area ---------------------------</option>
                                            {optionTemplate}
                                          </select>
                                          <span style={{ color: 'red', float: 'left' }}>{errors.parent_id?.message}</span>
                                        </div>
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            {...register("area_name")}
                                            placeholder="Enter Area name"
                                            className={`form-control ${errors.area_name ? 'is-invalid' : ''}`}
                                            autoComplete="off"
                                          />
                                          <span style={{ color: 'red', float: 'left' }}>{errors.area_name?.message}</span>
                                        </div>
                                        {
                                          isLoading
                                            ?
                                            <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                            </button>

                                            :
                                            <>
                                              <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                                              <button type="button" style={{ borderRadius: 25 }} className="btn btn-danger" onClick={() => setIsAddArea(false)}>Close</button>
                                            </>

                                        }

                                      </form>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                        :
                        null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer STYLES  */}
      <Footer />
      {/* FOOTER STYLES END */}
    </div>
  )
}
export default Dashboard
