import React, {useCallback, useEffect, useState} from 'react';
import {postJSON} from "./API";

export default function TopTen() {
  const [topRanked, setTopRanked] = useState();
  const setMemoTopRanked = useCallback(async () => {
    setTopRanked(await postJSON('/top_ranked'));
  }, []);
  useEffect(() => {
    setMemoTopRanked();
  }, [setMemoTopRanked]);
  return (
    <div className="page">
      <div className="rounded-8 min-h-main bg-white m-8 px-16">
        <div className="table-container">
          <table className="table">
            <thead>
            <tr>
              <th>#</th>
              <th>App name</th>
            </tr>
            </thead>
            <tbody>
            {topRanked && topRanked.slice(0, 10).map((app, i) => (
              <tr key={app.id}>
                <td className=""><p className="m-0 vertical-middle ">{i+1}</p></td>
                <td className="d-flex flex-row align-items-center py-11">
                  <img className="icon-28 rounded-8 mx-8" alt="icon" src={app.image}/>
                  <span className="mx-8">{app.name}</span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
