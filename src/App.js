import React, { Component, Fragment } from 'react';
import AMap from 'AMap';
import axios from 'axios';
import './App.css';

const AMAP_KEY = 'your_key'

class App extends Component {
  state = {
    openEdit: false,
    polygonData: [],
    searchKey: '',
    searchPoi: null
  }
  componentDidMount() {
    var map = new AMap.Map("container", {
      resizeEnable: true,
      zoom: 13 //地图显示的缩放级别
    });
    this.map = map

    var mouseTool = new AMap.MouseTool(map)
    //添加绘制完成事件
    AMap.event.addListener(mouseTool, 'draw', (e) => {
      this.setState({
        polygonData: e.obj.getPath().map(({ lng, lat }) => ({ lng, lat })),
        openEdit: false,
      })
      // 关闭鼠标绘图
      this.mouseTool.close()

      const editor = this.editor
      this._polygon = e.obj
      // 生成多边形编辑器
      editor._polygonEditor = new AMap.PolyEditor(map, this._polygon);
      editor.startEditPolygon = function () {
        editor._polygonEditor.open();
      }
      editor.closeEditPolygon = function () {
        editor._polygonEditor.close();
      }
      // 添加编辑完成事件
      AMap.event.addListener(editor._polygonEditor, 'end', (editEvent) => {
        this.setState({
          polygonData: editEvent.target.getPath().map(({ lng, lat }) => ({ lng, lat }))
        })
      })
    });

    this.mouseTool = mouseTool
    var editor = {}
    this.editor = editor
  }
  render() {
    const mouseDraw = () => {
      this.mouseTool.polygon();
    }
    const editPolygon = () => {
      if (this.state.openEdit) {
        this.editor.closeEditPolygon()
      } else {
        this.editor.startEditPolygon()
      }
      this.setState({
        openEdit: !this.state.openEdit
      })
    }
    const removePolygon = () => {
      if (this._polygon) {
        this.map.remove(this._polygon)
        this._polygon = null
      }
      this.editor = {}
      this.setState({

      })
    }
    const clearMap = () => {
      this.map.clearMap()
      this.setState({
        openEdit: false,
        polygonData: [],
        searchKey: '',
        searchPoi: null
      })
    }
    const search = () => {
      if (this.state.searchKey) {
        const url = `http://restapi.amap.com/v3/place/text?keywords=${this.state.searchKey}&key=${AMAP_KEY}&extensions=base`
        axios.get(url).then(response => {
          if (response.status === 200) {
            const { data: { pois } } = response
            if (pois.length > 0) {
              const { location, address, pname, cityname, adname, type } = pois[0]
              const center = location.split(',')
              this.map.setZoomAndCenter(20, center)
              this.setState({
                searchPoi: {
                  location,
                  address: pname + cityname + adname + address,
                  type
                }
              })
              var marker = new AMap.Marker({
                position: center,
                draggable: true,
                cursor: 'move',
                raiseOnDrag: true
              });
              // 添加点拖拽完成事件
              AMap.event.addListener(marker, 'dragend', (e) => {
                const { lng, lat } = e.lnglat
                this.setState({
                  searchPoi: {
                    location: `${lng},${lat}`,
                    address: pname + cityname + adname + address,
                    type
                  }
                })
              })
              marker.setMap(this.map);
            }
          }
        })
      }
    }
    return (
      <div className="App">
        <div id="container" style={{ height: document.body.clientHeight }} />
        <div className="searchDiv">
          <input
            value={this.state.searchKey}
            onChange={(e) => this.setState({ searchKey: e.target.value })} />
          <button onClick={search}>搜索</button>
          <button onClick={clearMap}>清除</button>
        </div>
        <div className="operation" >
          {
            this.state.polygonData.length === 0 ? (
              <button onClick={mouseDraw} >绘制区域</button>
            ) : (
                <Fragment>
                  <button onClick={editPolygon} >{
                    this.state.openEdit ? '完成编辑' : '编辑区域'}
                  </button>
                  <button onClick={removePolygon}>清除区域</button>
                </Fragment>
              )
          }
        </div>
        {
          this.state.searchPoi && (<div className="showSearch">
            <div>
              搜索结果
            </div>
            <div>
              坐标：{this.state.searchPoi.location}
            </div>
            <div>
              描述：{this.state.searchPoi.address}
            </div>
            <div>
              类型：{this.state.searchPoi.type}
            </div>
          </div>)
        }
        {
          this.state.polygonData.length !== 0 && (
            <div className="showData">
              {
                this.state.polygonData.map(
                  ({ lng, lat }, index) => (<div key={index}>{lng},{lat}</div>)
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
