import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, Legend, Bar } from 'recharts';
import LoadingSpinner from './LoadingSpinner';
import { Link} from 'react-router-dom';

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
        <div name="statistic"  className="w-full bg-gradient-to-b from-black via-black to-gray-800">
             {
                !spinner ? <>
                 <div className='flex justify-center text-3xl font-bold text-white font-signature mb-3'>My Eduction Activity</div>
            <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
          
                <div style={{ backgroundColor: "#0a192f" }} className="w-full">
                    <br /><br />
                    <div className='flex justify-center'>
                        <p className="font-signature text-white text-3xl">My Extra Curricular Certificate Activity</p>
                    </div>

                    {spinner && <LoadingSpinner/> }

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
                        <p className=" text-white font-signature text-3xl">My-Education-Report (zero to End)</p>
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
                </>:<>
                {spinner && <>
                    <LoadingSpinner/>,
                    <Link className='btn btn-outline btn-sm btn-error'  to="/dashboard/allprojects"> Click</Link>
                
                </> }
                </>
             }
        </div>
    );
};

export default Statistic;
