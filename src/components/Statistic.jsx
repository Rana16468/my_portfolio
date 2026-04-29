import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, Legend, Bar, Area, AreaChart } from 'recharts';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

const Statistic = () => {
    const [spinner, setSpinner] = useState(true);
    const [learningActivity, setLearningActivity] = useState([]);
    const [academicResult, setAcademicResult] = useState([]);
    const [bscResult, setBscResult] = useState([]);
   
    useEffect(() => {
        fetch('extraCA.json').then((res) => res.json()).then((data) => {
            setLearningActivity(data);
            setSpinner(false);
        }).catch((error) => {
            toast.error(error?.message);
        })
    }, []);

    useEffect(() => {
        fetch("Eduction.json").then((res) => res.json()).then((data) => {
            setAcademicResult(data);
            setSpinner(false);
        }).catch((error) => {
            toast.error(error?.message);
        })
    }, []);

    useEffect(() => {
        fetch("BSC.json").then((res) => res.json()).then((data) => {
            setBscResult(data);
            setSpinner(false);
        }).catch((error) => {
            toast.error(error?.message);
        })
    }, []);

    // Custom tooltip styles
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                    <p className="font-bold text-gray-800">{`${label}`}</p>
                    <p className="text-emerald-600 font-medium">
                        {`${payload[0].name}: ${payload[0].value}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Chart colors
    const chartColors = {
        primary: "#6366f1", // Indigo
        secondary: "#ec4899", // Pink
        tertiary: "#10b981", // Emerald
        gradient1: "#6366f1",
        gradient2: "#8b5cf6",
        gridLine: "#4b5563",
        background: "rgba(15, 23, 42, 0.7)"
    };

    if (spinner) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-gray-900">
                <LoadingSpinner />
                <Link className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30" to="/dashboard/allprojects">
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div name="statistic" className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-800  py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4">
                        My Educational Journey
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"></div>
                </div>

                {/* Extra Curricular Section */}
                <div className="mb-16 bg-slate-800 bg-opacity-50 rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-gray-700">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                            Extra Curricular Certificates
                        </span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-800 rounded-xl p-4 shadow-lg hover:shadow-emerald-500/10 transition-all">
                            <h3 className="text-xl font-semibold text-emerald-400 mb-4 text-center">Performance Timeline</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={learningActivity}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorResult" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={chartColors.tertiary} stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor={chartColors.tertiary} stopOpacity={0.1}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.gridLine} opacity={0.3} />
                                        <XAxis dataKey="courseName" stroke="#e2e8f0" />
                                        <YAxis stroke="#e2e8f0" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="result" stroke={chartColors.tertiary} fillOpacity={1} fill="url(#colorResult)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4 shadow-lg hover:shadow-pink-500/10 transition-all">
                            <h3 className="text-xl font-semibold text-pink-400 mb-4 text-center">Certificate Scores</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={learningActivity}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.gridLine} opacity={0.3} />
                                        <XAxis dataKey="courseName" stroke="#e2e8f0" />
                                        <YAxis stroke="#e2e8f0" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ color: "#e2e8f0" }} />
                                        <Bar dataKey="result" fill={chartColors.secondary} radius={[4, 4, 0, 0]} barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Results Section */}
                <div className="bg-slate-800 bg-opacity-50 rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-gray-700">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
                            Academic Performance
                        </span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-800 rounded-xl p-4 shadow-lg hover:shadow-indigo-500/10 transition-all">
                            <h3 className="text-xl font-semibold text-indigo-400 mb-4 text-center">BSc CGPA by Semester</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={bscResult}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.gridLine} opacity={0.3} />
                                        <XAxis dataKey="semester" stroke="#e2e8f0" />
                                        <YAxis stroke="#e2e8f0" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ color: "#e2e8f0" }} />
                                        <Bar dataKey="cgpa" fill={chartColors.primary} radius={[4, 4, 0, 0]} barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-4 shadow-lg hover:shadow-blue-500/10 transition-all">
                            <h3 className="text-xl font-semibold text-blue-400 mb-4 text-center">Course Results</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={academicResult}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.gridLine} opacity={0.3} />
                                        <XAxis dataKey="course" stroke="#e2e8f0" />
                                        <YAxis stroke="#e2e8f0" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line type="monotone" dataKey="result" stroke="#38bdf8" strokeWidth={2} dot={{ fill: "#38bdf8", r: 4 }} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistic;