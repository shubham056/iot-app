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

const Dashboard = () => {
  const [isAddArea, setIsAddArea] = useState(false);
  const [content, setContent] = useState([]);
  const [treeViewData, setTreeViewData] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const [showGraph, setshowGraph] = useState(false)
  const [areaName, setAreaName] = useState("")
  const [devicename, setDeviceName] = useState("")
  const { user } = useSelector((state) => state.auth);
  const userID = user.data.profile.id

  const Schema = Yup.object().shape({
    parent_id: Yup.string().required('Select a category.'),
    area_name: Yup.string().required('Area name is required.').min(3).max(15),
  });
  const formOptions = { resolver: yupResolver(Schema) }
  const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, resetField } = useForm(formOptions);

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
  }, [isLoading]);

  let locations = []
  Object.values(treeViewData).map(item => {
    //.log("first", item)
    let newdata = { ...item, key: item.label + item.id };
    locations.push(newdata)
  })
  //console.log(locations)

  //submit handler
  const onSubmit = formValue => {
    //console.log(formValue)
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
  let optionTemplate = Object.values(content).map(v => (
    <option value={v.id}>{v.label}</option>
  ));
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
                                  // console.log(index, level)
                                  // console.log("hasNode", hasNodes)
                                  // console.log(typeof (index))
                                  if (index == parseInt(0) && level == parseInt(0)) {
                                    console.log("true")
                                  } else {
                                    if (hasNodes == false) {
                                      setshowGraph(true)
                                      setIsAddArea(false)
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
                  <button type="button" class="btn btn-info btn-sm" style={{ borderRadius: 25 }} onClick={() => setIsAddArea(true)}>Add Area</button>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">

                  {/* Add Area Form */}




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
                                            <option value="">---------- Select Category ----------</option>
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
                                            <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" />
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
                                            <option value="">---------- Select Category ----------</option>
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
                                            <button className="btn btn-primary" style={{ borderRadius: 25 }}>Submit...<div className="spinner-border" />
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
                        <div className="welcome_wraper">
                          <div className="section-heading text-center">
                            <h2>Welcome</h2>
                            <p className>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                            <div className="seperator" />
                          </div>
                        </div>
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
