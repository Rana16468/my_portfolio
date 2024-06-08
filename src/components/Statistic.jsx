import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, Legend, Bar } from 'recharts';

const Statistic = () => {
    const [spinner, setSpinner] = useState(true);
    const [learningActivity, setLeraningActivity] = useState([]);
    const [academicResult, setAcademicresult] = useState([]);
    const [bscResult, setBscresult] = useState([]);

    useEffect(() => {
        fetch('extraCA.json').then((res) => res.json()).then((data) => {
            setLeraningActivity(data);
            setSpinner(false);
        }).catch((error) => {
            toast.error(error?.message);
        })
    }, []);

    useEffect(() => {
        fetch("Eduction.json").then((res) => res.json()).then((data) => {
            setAcademicresult(data);
            setSpinner(false);
        }).catch((error) => {
            toast.error(error?.message);
        })
    }, []);

    useEffect(() => {
        fetch("BSC.json").then((res) => res.json()).then((data) => {
            setBscresult(data);
            setSpinner(false);
        }).catch((error) => {
            toast.error(error?.message);
        })
    }, []);

   

    return (
        <div name="statistic" className="w-full bg-gradient-to-b from-black via-black to-gray-800">
              <div className='flex justify-center text-3xl font-bold text-white mb-3'>My Eduction Activity</div>
            <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
          
                <div style={{ backgroundColor: "#0a192f" }} className="w-full">
                    <br /><br />
                    <div className='flex justify-center'>
                        <button className="btn btn-active btn-success font-light text-white text-3xl">My Extra Curricular Certificate Activity</button>
                    </div>

                    {spinner && (
                        <div className='flex justify-center mt-5'>
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='line-chart'>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={learningActivity}>
                                    <XAxis dataKey="courseName" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="result" stroke="#82ca9d" />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className='line-chart'>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={learningActivity}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="courseName" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="result" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className='flex justify-center m-3'>
                        <button className="btn btn-active btn-success text-white font-light text-3xl">My-Education-Report (zero to End)</button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='line-chart'>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={bscResult}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="semester" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="cgpa" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className='line-chart'>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={academicResult}>
                                    <XAxis dataKey="course" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="result" stroke="#82ca9d" />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
