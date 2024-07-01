import React, { useState, useEffect } from 'react';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillBellFill,
} from 'react-icons/bs';
import { GrDocumentText } from "react-icons/gr";
import { MdGroups } from "react-icons/md";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import '../index.css';

function Home() {
  const [accountCount, setAccountCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8081/account-count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAccountCount(data.count))
      .catch(error => console.error('Error fetching account count:', error));
    
    fetch('http://localhost:8081/group-count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setGroupCount(data.count))
      .catch(error => console.error('Error fetching group count:', error));
  }, []);

  const data = [
    { name: 'Jan', uv: 4000, pv: 180, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 70, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 579, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 986, amt: 2000 },
    { name: 'May', uv: 1890, pv: 498, amt: 2181 },
    { name: 'June', uv: 2390, pv: 698, amt: 2500 },
    { name: 'July', uv: 3490, pv: 180, amt: 2100 },
  ];

  const data1 = [
    { name: 'Flag1', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Flag2', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Flag3', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Flag4', uv: 2780, pv: 3908, amt: 2000 },
  ];

  const pieData1 = data1.map((entry) => ({
    name: entry.name,
    value: entry.uv,
  }));

  const flagDetails = [
    { flagName: 'Flag1', timeSpent: '5 mins', openedBy: 'User1', contentViewed: 'Wikipedia is a free online encyclopethat allows users to access and contribute to a vast repository of knowledge. Founded in 2001, Wikipedia is a collaborative project that reliesWikipedia is a free online encyclopethat allows users to access and contribute to a vast repository of knowledge.' },
    { flagName: 'Flag2', timeSpent: '3 mins', openedBy: 'User2', contentViewed: 'Document2' },
    { flagName: 'Flag3', timeSpent: '8 mins', openedBy: 'User3', contentViewed: 'Document3' },
    { flagName: 'Flag4', timeSpent: '2 mins', openedBy: 'User4', contentViewed: 'Document4' },
    { flagName: 'Flag5', timeSpent: '6 mins', openedBy: 'User5', contentViewed: 'Document5' },
    { flagName: 'Flag6', timeSpent: '4 mins', openedBy: 'User6', contentViewed: 'Document6' },
  ];

  // Define colors for each slice
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <main className='main-container' style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 800 }}>
      <div className='main-title'>
        DASHBOARD
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            Accounts
            <BsFillArchiveFill className='card_icon' />
          </div>
          {accountCount}
        </div>
        <div className='card'>
          <div className='card-inner'>
            Groups
            <MdGroups className='card_icon' />
          </div>
          {groupCount}
        </div>
        <div className='card'>
          <div className='card-inner'>
            Docs
            <GrDocumentText className='card_icon' />
          </div>
          33
        </div>
        <div className='card'>
          <div className='card-inner'>
           Flags
            <BsFillBellFill className='card_icon' />
          </div>
          42
        </div>
      </div>

      <div className='flag-details'>
        <h3>Most Recent Open Flags</h3>
        <div className='flag-items-container'>
          {flagDetails.map((detail, index) => (
            <div key={index} className='flag-item'>
              <div className='flag-icon'><img className='flag-icon' src='../src/assets/img/llm.webp' alt='Flag icon'/></div>
              <div className='flag-content'>
                <p><strong>{detail.openedBy}</strong></p>
                <p>{detail.contentViewed}</p>
              </div>
              <div className='flag-time'> about {detail.timeSpent} ago</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;