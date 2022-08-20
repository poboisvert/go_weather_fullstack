import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import axios from 'axios';
import moment from 'moment';

export default function EachWeather({ weather }) {
  let navigate = useNavigate();

  const completeForm = () => {
    closeModal();
    navigate('/');
  };

  const updateWeather = (e) => {
    e.preventDefault();
    var form = document.getElementById(`editform-${weather.ID}`);
    var formData = new FormData(form);
    axios
      .patch(`${API_URL}/weathers/${weather.ID}`, formData)
      .then((res) => completeForm(form))
      .catch((err) => console.log(err.response));
  };

  const deleteWeather = () => {
    if (window.confirm(`Delete weather id: ${weather.ID}`) == true) {
      axios
        .delete(`${API_URL}/weathers/${weather.ID}`)
        .then((res) => navigate('/'))
        .catch((err) => console.log(err.response));
    } else {
      console.log('You canceled!');
    }
  };

  const openModal = () => {
    document
      .getElementById('new-modal-' + weather.ID)
      .classList.remove('hidden');
  };
  const closeModal = () => {
    document.getElementById('new-modal-' + weather.ID).classList.add('hidden');
  };

  const [predictionValue, setPredictionValue] = useState(weather.prediction);
  const [emailValue, setEmailValue] = useState(weather.email);
  const [dateValue, setDateValue] = useState(
    moment(weather.date).format('YYYY-MM-DD')
  );
  const [cityValue, setCityValue] = useState(weather.city);
  const [countryValue, setCountryValue] = useState(weather.country);
  return (
    <>
      <div className='bg-slate-100 rounded-lg mb-8 p-8 hover:bg-slate-200'>
        <Link to={`/weather/${weather.ID}`}>
          <div>{weather.title}</div>
          <div>{weather.email}</div>
        </Link>
        <div className='text-sm flex space-x-4 mt-4'>
          <button
            type='button'
            onClick={openModal}
            data-modal-toggle='authentication-modal'
          >
            Edit
          </button>

          <Link
            className='text-red-700'
            to={`/weathers/${weather.ID}`}
            onClick={deleteWeather}
          >
            Delete
          </Link>
        </div>
      </div>
      <div
        id={`new-modal-${weather.ID}`}
        aria-hidden='true'
        className='absolute z-5 hidden overflow-y-auto  w-full'
      >
        <div className='fixed inset-0 bg-black bg-opacity-70 transition-opacity'></div>

        <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button
              onClick={closeModal}
              type='button'
              className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              data-modal-toggle='authentication-modal'
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span className='sr-only' onClick={closeModal}>
                Close modal
              </span>
            </button>
            <div className='py-6 px-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
                Update Card
              </h3>
              <form
                className='space-y-6'
                id={`editform-${weather.ID}`}
                onSubmit={updateWeather}
                method='post'
              >
                <div>
                  <label
                    for='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div>
                  <label
                    for='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Date
                  </label>
                  <input
                    type='date'
                    name='date'
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    id='date'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div>
                  <label
                    for='prediction'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Prediction
                  </label>
                  <input
                    type='prediction'
                    name='prediction'
                    value={predictionValue}
                    onChange={(e) => setPredictionValue(e.target.value)}
                    id='prediction'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div>
                  <label
                    for='city'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    City
                  </label>
                  <input
                    type='city'
                    name='city'
                    value={cityValue}
                    onChange={(e) => setCityValue(e.target.value)}
                    id='city'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div>
                  <label
                    for='city'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    City
                  </label>
                  <input
                    type='country'
                    name='country'
                    value={countryValue}
                    onChange={(e) => setCountryValue(e.target.value)}
                    id='country'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
