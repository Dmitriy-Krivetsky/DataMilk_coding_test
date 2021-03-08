import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {postJSON} from "./API";
import {CanvasJSChart} from 'canvasjs-react-charts'


const options = {
  animationEnabled: true,
  zoomEnabled: true,
  theme: "light2",
  axisX: {
    title:"Revenue",
    minimum: 0,
    gridThickness: 1
  },
  axisY:{
    title: "Downloads",
    minimum: 0,
  },
};

export default function Home() {
  const [topTen, setTopTen] = useState();
  const [data, setData] = useState([]);
  const [stat, setStat] = useState();
  const setMemoStat = useCallback(async () => {
    setStat(await postJSON('/stats'));
  }, []);
  useEffect(() => {
    setMemoStat();
  }, [setMemoStat]);
  useEffect(() => {
    if (stat) {
      setTopTen(stat.sort((a, b) => b.downloads - a.downloads).slice(0, 10));
    }
  }, [stat]);
  useEffect(() => {
    if (topTen) {
      setData(topTen.map(app => ({
        id: app.id,
        x: app.revenue || 0,
        y: app.downloads || 0,
        z: 1,
        name: app.name,
      })))
    }
  }, [topTen]);
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row justify-content-between flex-container w-50-wrap">
        <div className="w-50 rounded-8 flex-center h-main market m-8 text-white flex-column ">
          <h1 className="price">$ 10.6 B</h1>
          <p className="text-white fw-bold m-0">Market size</p>
        </div>
        <div className="w-50 rounded-8 h-main bg-white m-8 px-16">
          <p className="block-header">Top 5 Apps</p>
          <div className="table-container">
            <table className="table">
              <thead>
              <tr>
                <th>App name</th>
                <th className="text-end">Downloads</th>
              </tr>
              </thead>
              <tbody>
              {topTen && topTen.slice(0, 5).map((app, i) => (
                <tr key={app.id}>
                  <td className="d-flex flex-row align-items-center py-11">
                    <p className="m-0 mr-8">{i+1}</p>
                    <img className="icon-28 rounded-8 mx-8" alt="icon" src={app.image}/>
                    <span className="mx-8">{app.name}</span>
                  </td>
                  <td className="text-end py-11">
                    <span className="vertical-middle">{app.downloads || 'Null'}</span>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-8 m-8 px-16 chart-box">
        <p className="block-header">Downloads & Revenue</p>
        <CanvasJSChart
          options={{
            ...options,
            data:[{
              type: "bubble",
              toolTipContent: "<b>{name}</b><br/>Revenue: {x} <br/> Downloads: {y}<br/>",
              dataPoints: [...data],
            }]
          }}
        />
      </div>
      <div className="bg-white rounded-8 min-h-main m-8 overflow-hidden">
        <p className="block-header px-16">Top app performance</p>
        <div className="table-container max-h-10-row-48 px-16">
          <table className="table table-grid">
            <thead>
            <tr>
              <th/>
              <th className="px-8">Image</th>
              <th className="px-8">App name</th>
              <th className="px-8">Rating</th>
              <th className="px-8">Downloads</th>
              <th className="px-8">Revenue</th>
              <th className="px-8">Released</th>
            </tr>
            </thead>
            <tbody>
            {stat && stat.map((app, i) => (
              <tr key={app.id}>
                <td><p className="m-0">{i+1}</p></td>
                <td><img className="icon-32 rounded-8 mx-8" alt="icon" src={app.image}/></td>
                <td><a href={app.url} className="mx-8">{app.name || 'Null'}</a></td>
                <td><span className="mx-8">{app.rating || 'Null'}</span></td>
                <td><span className="mx-8">{app.downloads || 'Null'}</span></td>
                <td><span className="mx-8">{app.revenue || 'Null'}</span></td>
                <td><span className="mx-8">{moment(app.released).format('D MMM YYYY') || 'Null'}</span></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <p className="count-table py-5 px-16 m-0">{`${stat ? stat.length : '00'} Rows`}</p>
      </div>
    </div>
  );
}
