import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../config';

export default function ViewWeather() {
  let { id } = useParams();
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/weathers/${id}`);
        const json = await res.json();
        setWeather(json.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetWeather();
  }, [id]);
  return (
    <div>
      {!loading ? (
        <div className='flex justify-center'>
          <div>
            <Link to='/'>Go Back</Link>
          </div>
          <div className='px-3 py-10 mr-3'>
            <div>{weather.title}</div>
            <div>{weather.prediction}</div>
            <div>{weather.email}</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
