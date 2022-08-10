import React, { useState } from 'react'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'
import TreeMenu, { defaultChildren, ItemComponent } from 'react-simple-tree-menu';
import randomcolor from "randomcolor";

//import "../../node_modules/react-simple-tree-menu/dist/main.css";
import "react-simple-tree-menu/dist/main.css";


import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/AuthenticationSlice";




const Dashboard = () => {
  const [showGraph, setshowGraph] = useState(false)
  const [areaName, setAreaName] = useState("")
  const [devicename, setDeviceName] = useState("")
  const isAuthenticated = useSelector(selectUser);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dataInArray = [
    {
      key: `${currentUser.data.profile.first_name} ${currentUser.data.profile.last_name}`,
      label: `${currentUser.data.profile.first_name} ${currentUser.data.profile.last_name}`,
      nodes: [
        {
          key: "hall",
          label: "Hall",
          nodes: [
            {
              key: "device1",
              label: "Device1",

              nodes: []
            },
            {
              key: "device2",
              label: "Device2",

              nodes: []
            },
            {
              key: "Area",
              label: "Area",
              nodes: [
                {
                  key: "Router",
                  label: "Router"
                }
              ]
            }
          ]
        },
        {
          key: 'bathroom',
          label: 'Bath Room',
          nodes: [
            {
              key: "wifi",
              label: "WiFi Device",
            },
            {
              key: "dongal",
              label: "WiFi Dongal",
            },
            {
              key: "Area3",
              label: "Area3",
              nodes: [
                {
                  key: 'Device44444',
                  label: 'Device4444'
                }
              ]
            }
          ]
        }
      ],


    },

  ];

  // My JSON Data
  const locations = [
    {
      id: 1,
      label: "Shubham Kumar",
      key: "Shubham Kumar",
      parentId: 26
    },
    {
      id: 2,
      label: "Device1",
      key: "Device1",
      parentId: 3
    },
    {
      id: 3,
      label: "Hall",
      key: "Hall",
      parentId: 1
    },
    {
      id: 4,
      label: "Bathroom",
      key: "Bathroom",
      parentId: 1
    },
    {
      id: 5,
      label: "WiFi Device",
      key: "WiFi Device",
      parentId: 4
    },
    {
      id: 6,
      label: "Test Area",
      key: "Test Area",
      parentId: 4
    },
    {
      id: 7,
      label: "Router",
      key: "Router",
      parentId: 6
    },
  ];

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

        if (child.parentId && object[child["parentId"]]) {
          delete child.id
          //
          object[child["parentId"]]["nodes"].push(child);
          delete child.parentId
        } else {
          delete child.id
          delete child.parentId

          tree.push(child);
        }
      }
    }

    return tree;
  }
  var root = createTreeView(locations);
  console.log("dataInArray", dataInArray)
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
                    {({ search, items }) => {
                      return (
                        <>
                          <input onChange={e => search(e.target.value)} />
                          <ul className="tree-item-group">
                            {items.map(props => {
                              const childrenProps = {
                                ...props,
                                onClick: () => {
                                  const { index, level, hasNodes, label, parent } = props
                                  console.log(index, level)
                                  console.log(typeof (index))
                                  if (index == parseInt(0) && level == parseInt(0)) {
                                    console.log("true")
                                  } else {
                                    if (hasNodes == false) {
                                      setshowGraph(true)
                                      setDeviceName(label)
                                      let areaName = parent.split("/").pop()
                                      setAreaName(areaName)
                                    }
                                    console.log("false")
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
                  <button type="button" class="btn btn-primary btn-sm">Add Area</button>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">

                  {/* Add Area Form */}

                  <div className="welcome_wraper">
                    <div className="section-heading text-center">
                      <section className="login_wraper">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12 col-sm-12">
                              <div className="contact-form2">
                                <h4 className="text-uppercase text-center">Add Area</h4>
                                <form>
                                  <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Select Parent Category</label>
                                    <select class="form-control" id="sel1">
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Area</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Area name" />
                                  </div>
                                  <button type="submit" className="btn btn-primary">Submit</button>
                                </form>

                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>


                  {/*graph chart*/}
                  {
                    showGraph
                      ?
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
