import React, { useState, useEffect, useRef } from 'react'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'
import TreeMenu, { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
import randomcolor from "randomcolor";
//import "../../node_modules/react-simple-tree-menu/dist/main.css";
import "react-simple-tree-menu/dist/main.css";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/AuthenticationSlice";
import UserService from "../services/user.service";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Swal from 'sweetalert2'


const Dashboard = () => {
  const [addDeviceBtnText, setAddDeviceBtnText] = useState("Verify")
  const [showWelcomeDiv, setshowWelcomeDiv] = useState(true)
  const [stepOne, setstepOne] = useState(true)
  const [stepTwo, setstepTwo] = useState(false)
  const [stepTwoisLoading, setstepTwoisLoading] = useState(false)
  const [forgotisLoading, setforgotisLoading] = useState(false)
  const [isAddArea, setIsAddArea] = useState(false);
  const [isAddDevice, setIsAddDevice] = useState(false);
  const [isforgotdDevice, setIsForgotDevice] = useState(false);
  const [content, setContent] = useState([]);
  const [contentDevice, setContentDevice] = useState([]);
  const [treeViewData, setTreeViewData] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const [isAddDeviceLoading, setisAddDeviceLoading] = useState(false)
  const [isGetDeviceLoading, setisgetDeviceLoading] = useState(false)
  const [showGraph, setshowGraph] = useState(false)
  const [areaName, setAreaName] = useState("")
  const [devicename, setDeviceName] = useState("")
  const { user } = useSelector((state) => state.auth);
  const userID = user.data.profile.id

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
  const formOptions = { resolver: yupResolver(Schema) }
  const adddeviceformOptionsStep1 = { resolver: yupResolver(AddDeviceSchemaStep1) }
  const adddeviceformOptionsStep2 = { resolver: yupResolver(AddDeviceSchemaStep2) }
  const formOptionforgotDevice = { resolver: yupResolver(forgotDevice) }
  const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, resetField } = useForm(formOptions);
  const { register: register2, formState: { errors: errors2, isSubmitting: isSubmitting2 }, handleSubmit: handleSubmit2, resetField: resetField2 } = useForm(adddeviceformOptionsStep1);
  const { register: register3, formState: { errors: errors3, isSubmitting: isSubmitting3 }, handleSubmit: handleSubmit3, resetField: resetField3 } = useForm(adddeviceformOptionsStep2);
  const { register: register4, formState: { errors: errors4, isSubmitting: isSubmitting4 }, handleSubmit: handleSubmit4, resetField: resetField4 } = useForm(formOptionforgotDevice);

  const callOnce = useRef(true)
  //add root user node 
  useEffect(() => {
    if (callOnce.current) {
      callOnce.current = false
      UserService.AddRootUser(userID, { user_name: user.data.profile.first_name + ' ' + user.data.profile.last_name }).then(
        (response) => {
          //console.log("response root user", response.data.data.profile)
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

  }, []);
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
  }, [isLoading]);

  //fetch category data
  useEffect(() => {
    UserService.GetAddedDevices(userID).then(
      (response) => {
        setContentDevice(response.data.data.profile);
        console.log("response device data ---", response.data.data.profile)
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
  }, [isGetDeviceLoading]);

  //fetch tree view data
  useEffect(() => {
    UserService.GetTreeViewData(userID).then(
      (response) => {
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
  }, [isLoading, isAddDeviceLoading]);

  let locations = []
  Object.values(treeViewData).map(item => {
    //.log("first", item)
    let newdata = { ...item, key: item.label + item.id };
    locations.push(newdata)
  })
  //console.log(locations)

  //submit handler
  const onSubmit = formValue => {
    console.log(formValue)
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
  const onSubmitForgotDevice = formValue => {
    console.log(formValue)
    // return false
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
                setContentDevice(res.data.data.updatedId);
                setforgotisLoading(false)
                setIsForgotDevice(false)
                setIsAddDevice(false)
                setIsAddArea(false)
                setshowGraph(false)
                setshowWelcomeDiv(true)
              } else {
                toast.error('Internal server error, please try after some time!', { toastId: 234534464676867878 })
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

  const onSubmitStepOne = formValue => {
    console.log(formValue)
    setstepOne(false)
    setstepTwo(true)
    return false
  }
  const onSubmitSteptwo = formValue => {
    console.log(formValue)
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
  // My JSON Data
  // const locations = [
  //   {
  //     id: 1,
  //     label: "Shubham Kumar",
  //     key: "Shubham Kumar",
  //     parent_id: 26
  //   },
  //   {
  //     id: 2,
  //     label: "Device1",
  //     key: "Device1",
  //     parent_id: 3
  //   },
  //   {
  //     id: 3,
  //     label: "Hall",
  //     key: "Hall",
  //     parent_id: 1
  //   },
  //   {
  //     id: 4,
  //     label: "Bathroom",
  //     key: "Bathroom",
  //     parent_id: 1
  //   },
  //   {
  //     id: 5,
  //     label: "WiFi Device",
  //     key: "WiFi Device",
  //     parent_id: 4
  //   },
  //   {
  //     id: 6,
  //     label: "Test Area",
  //     key: "Test Area",
  //     parent_id: 4
  //   },
  //   {
  //     id: 7,
  //     label: "Router",
  //     key: "Router",
  //     parent_id: 6
  //   },
  // ];

  //console.log(isAddArea)

  function createTreeView(location) {
    var tree = [],
      object = {},
      parent,
      child;
    for (var i = 0; i < location.length; i++) {
      parent = location[i];
      object[parent.id] = parent;
      object[parent.id]["nodes"] = [];
    }
    for (var id in object) {
      if (object.hasOwnProperty(id)) {
        child = object[id];
        if (child.parent_id && object[child["parent_id"]]) {
          delete child.id
          //
          object[child["parent_id"]]["nodes"].push(child);
          delete child.parent_id
        } else {
          delete child.id
          delete child.parent_id
          tree.push(child);
        }
      }
    }
    return tree;
  }
  var root = createTreeView(locations);
  let optionTemplate = Object.values(content).map((v, i) => (
    (i == 0) ? <option value={v.id}>New Area</option> : <option value={v.id}>{v.label}</option>
  ));

  let addedDevices = Object.values(contentDevice).map((v, i) => (
      <option value={v.id}>{v.label}</option>
  ));
  console.log(root)


  return (
    <div>
      <Header />
      {/* MAin Navigation END    */}

      <section className="main-slider">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <div className>
                <div id="left" className="span3">
                  <TreeMenu data={root}>
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
                                  const { index, level, hasNodes, label, parent } = props
                                  console.log(index, level)
                                  console.log("hasNode", hasNodes)
                                  console.log(typeof (index))
                                  if (index == parseInt(0) && level == parseInt(0)) {
                                    console.log("true")
                                  } else {
                                    if (hasNodes == false) {
                                      setshowGraph(true)
                                      setIsAddArea(false)
                                      setIsAddDevice(false)
                                      setshowWelcomeDiv(false)
                                      setDeviceName(label)
                                      let areaName = parent.split("/").pop()
                                      //console.log("areaName",areaName)
                                      setAreaName(areaName)
                                    }
                                    console.log("false-------------")
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
                  </TreeMenu>

                  <br />
                  <div className='btn-group'>
                    <button type="button" class="btn-info btn-sm" style={{ borderRadius: 30, margin: 5, padding: 20, }} onClick={() => {
                      setIsAddArea(true)
                      setIsAddDevice(false)
                      setshowWelcomeDiv(false)
                      setIsForgotDevice(false)
                    }}>Add New Area</button>

                    <button type="button" class="btn-primary btn-sm" style={{ borderRadius: 30, margin: 5, padding: 20, }} onClick={() => {
                      setIsAddDevice(true)
                      setIsAddArea(false)
                      setshowGraph(false)
                      setshowWelcomeDiv(false)
                      setIsForgotDevice(false)
                    }}>Add New Device</button>



                  </div>
                  <button type="button" class="btn-primary btn-sm" style={{ borderRadius: 30, margin: 5, padding: 20, }} onClick={() => {
                    setIsForgotDevice(true)
                    setIsAddDevice(false)
                    setIsAddArea(false)
                    setshowGraph(false)
                    setshowWelcomeDiv(false)
                  }}>Forgot Device</button>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
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
                                          <option value="">-------------------- Select Device Name --------------------</option>
                                          {addedDevices}
                                        </select>
                                        <span style={{ color: 'red' }}>{errors4.device_id?.message}</span>
                                      </div>

                                      {/* <button type="button" style={{ borderRadius: 25, margin: 10 }} className="btn btn-info" onClick={() => {
                                            setstepOne(true)
                                            setstepTwo(false)
                                          }}>Exit</button> */}
                                      {
                                        forgotisLoading
                                          ?
                                          <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                          </button>

                                          :
                                          <>
                                            <button type="submit" style={{ borderRadius: 25, margin: 10 }} className="btn btn-primary" disabled={isSubmitting3}>Submit</button>
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
                                            <option value="">-------------------- Select Modal  --------------------</option>
                                            <option value="IPL - 100 V1">IPL - 100 V1</option>
                                          </select>
                                          <span style={{ color: 'red' }}>{errors2.modal_name?.message}</span>
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
                                              <option value="">-------------------- Select Area --------------------</option>
                                              {optionTemplate}
                                            </select>
                                            <span style={{ color: 'red' }}>{errors3.parent_id?.message}</span>
                                          </div>
                                          <div className="form-group">
                                            <input
                                              type="text"
                                              {...register3("device_name")}
                                              placeholder="Please enter device name"
                                              className={`form-control ${errors3.device_name ? 'is-invalid' : ''}`}
                                              autoComplete="off"
                                            />
                                            <span style={{ color: 'red' }}>{errors3.device_name?.message}</span>
                                          </div>

                                          <div className="form-group">
                                            <input
                                              type="text"
                                              {...register3("device_id")}
                                              placeholder="Please enter the device ID "
                                              className={`form-control ${errors3.device_id ? 'is-invalid' : ''}`}
                                              autoComplete="off"
                                            />
                                            <span style={{ color: 'red' }}>{errors3.device_id?.message}</span>
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
                          <p className>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
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
                                            <option value="">---------- Select Area ----------</option>
                                            {optionTemplate}
                                          </select>
                                          <span style={{ color: 'red' }}>{errors.parent_id?.message}</span>
                                        </div>
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            {...register("area_name")}
                                            placeholder="Enter Area name"
                                            className={`form-control ${errors.area_name ? 'is-invalid' : ''}`}
                                            autoComplete="off"
                                          />
                                          <span style={{ color: 'red' }}>{errors.area_name?.message}</span>
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
                              <h4>{areaName} {devicename} <span /> <i className="icofont icofont-reply-all" /></h4>
                            </div>
                          </div>
                          <div className="col-lg-12 box_graph">
                            <div className="widget_categories right-widget top_heding">
                              <div className="tags top_tag">
                                <a href="#" className="tag-cloud-link ">Control</a>
                                <a href="#" className="tag-cloud-link ">Diagnostic</a>
                                <a href="#" className="tag-cloud-link ">A117</a>
                                <a href="#" className="tag-cloud-link">Trend</a>
                              </div>
                            </div>
                            <div className="tags">
                              <div className="tag_box">
                                <span>XXXXX</span>
                                <a href="#" className="tag-cloud-link ">A101</a>
                              </div>
                              <div className="tag_box">
                                <span>XXXXX</span>
                                <a href="#" className="tag-cloud-link ">A101</a>
                              </div>
                              <div className="tag_box">
                                <span>XXXXX</span>
                                <a href="#" className="tag-cloud-link ">A101</a>
                              </div>
                              <div className="tag_box">
                                <span>XXXXX</span>
                                <a href="#" className="tag-cloud-link ">A101</a>
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                  <div className="row">
                                    <div className="tags left_wraper">
                                      <a href="#" className="tag-cloud-link bg_green">Power</a>
                                      <a href="#" className="tag-cloud-link ">Energy</a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                                  <div className="row right_wraper">
                                    <div className="tags ">
                                      <span>XXXXX</span>
                                      <a href="#" className="tag-cloud-link bg_green">Daily</a>
                                      <a href="#" className="tag-cloud-link">Monthly</a>
                                    </div>
                                    <div className="graph_wraper">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tags bottom_tag">
                              <a href="#" className="tag-cloud-link bg_green">Total</a>
                              <a href="#" className="tag-cloud-link ">Phase - 1</a>
                              <a href="#" className="tag-cloud-link ">Phase - 2</a>
                              <a href="#" className="tag-cloud-link">Phase - 3</a>
                            </div>
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
                                            <option value="">---------- Select Area ----------</option>
                                            {optionTemplate}
                                          </select>
                                          <span style={{ color: 'red' }}>{errors.parent_id?.message}</span>
                                        </div>
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            {...register("area_name")}
                                            placeholder="Enter Area name"
                                            className={`form-control ${errors.area_name ? 'is-invalid' : ''}`}
                                            autoComplete="off"
                                          />
                                          <span style={{ color: 'red' }}>{errors.area_name?.message}</span>
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
