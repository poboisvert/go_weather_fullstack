import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from '../config';
import EachWeather from './EachWeather';

export default function List() {
  const [weathers, setWeathers] = useState([]);
  const [pages, setPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const fetchData = async () => {
    const page = searchParams.get('page')
      ? '&page=' + searchParams.get('page')
      : '';

    try {
      setWeathers('');
      const res = await fetch(`${API_URL}/weathers?sort=-id&size=5${page}`);
      const json = await res.json();
      setWeathers(json.data.items);
      setPages(json.data.total_pages);
    } catch (err) {
      console.log(err);
    }
  };

  const completeForm = (form) => {
    closeModal();
    form.reset();
    navigate('/');
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const storeWeather = (e) => {
    e.preventDefault();
    var form = document.getElementById('newform');
    var formData = new FormData(form);
    axios
      .post(`${API_URL}/weathers`, formData)
      .then((res) => completeForm(form))
      .catch((error) => console.log(error.response));
  };

  const openModal = () => {
    document.getElementById('new-modal').classList.remove('hidden');
  };
  const closeModal = () => {
    document.getElementById('new-modal').classList.add('hidden');
  };

  let activePage = searchParams.get('page') ? searchParams.get('page') : 0;

  return (
    <div className='flex justify-center'>
      <div className='p-10'>
        <div className='mb-10 flex items-center justify-between'>
          <h1>Weather Data</h1>
          <button
            className='text-white block px-6 py-2 text-sm text-slate-500 
      rounded-lg border-0
      text-sm font-semibold
      bg-violet-50 text-violet-700
      hover:bg-violet-100'
            onClick={openModal}
          >
            Add weather
          </button>
        </div>
        <div>
          {weathers.length > 0
            ? weathers.map((weather, key) => (
                <EachWeather key={key} weather={weather} />
              ))
            : ''}
        </div>
        <div className='mt-10'>
          {Array.from({ length: pages }, (_, index) => index + 1).map(
            (pg, key) => (
              <Link
                className={`border px-3 py-1 mr-3 ${
                  activePage == key
                    ? 'bg-violet-50 text-violet-7000 text-violet-700'
                    : ''
                }`}
                to={`?page=${key}`}
                key={key}
              >
                {key + 1}
              </Link>
            )
          )}
        </div>

        {/* Start modal */}
        <div
          className='relative z-10 hidden'
          aria-labelledby='title'
          role='dialog'
          aria-modal='true'
          id='new-modal'
        >
          <div className='fixed inset-0 bg-black bg-opacity-70 transition-opacity'></div>

          <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <span
                className='hidden sm:inline-block sm:align-middle sm:h-screen'
                aria-hidden='true'
              >
                &#8203;
              </span>

              <div className='relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full'>
                <form id='newform' onSubmit={storeWeather} method='post'>
                  <div className='bg-white'>
                    <div className='flex justify-between px-8 py-4 border-b'>
                      <h1>Add weather</h1>
                      <button type='button' onClick={closeModal}>
                        Close
                      </button>
                    </div>
                    <div className='px-8 py-8'>
                      <div className='mb-5'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                          Title
                        </label>
                        <input
                          type='text'
                          name='title'
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          required
                        />
                      </div>
                      <div className='mb-5'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                          Name
                        </label>
                        <input
                          type='text'
                          name='name'
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          required
                        />
                      </div>
                      <div className='mb-5'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                          Email
                        </label>
                        <input
                          type='text'
                          name='email'
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          required
                        />
                      </div>
                      <div className='mb-5'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                          Date
                        </label>
                        <input
                          type='date'
                          name='date'
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          required
                        />
                      </div>
                      <div className='mb-5'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                          Prediction
                        </label>
                        <input
                          type='text'
                          name='prediction'
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          required
                        />
                      </div>
                      <div className='mb-5'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                          City
                        </label>
                        <input
                          type='text'
                          name='city'
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          required
                        />
                      </div>
                      <div className='mb-10'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                          Country
                        </label>
                        <input
                          type='text'
                          name='country'
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          required
                        />
                      </div>
                      <div className='flex justify-end'>
                        <button
                          className='bg-blue-500 text-white py-1.5 px-4 rounded'
                          type='submit'
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* End modal */}
      </div>
    </div>
  );
}
