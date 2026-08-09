import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorPage from '../../components/ErrorPage';
import { Link } from 'react-router-dom';
import UpdateProjectModal from '../../components/modal/UpdateProjectModal';
import DeleteAction from '../../FatchAction/DeleteAction';

const AllProjects = () => {

  const [updateProject, setUpdateProject] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const {
    data: allprojects = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['allprojects', page, limit],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/project/?page=${page}&limit=${limit}`,
          {
            method: 'GET',
            headers: {
              authorization: `${localStorage.getItem('token')}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res?.json();
        return data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error?.message}`);
      }
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  const projectModel = (project) => {
    document.getElementById('project_modal').showModal();
    setUpdateProject(project);
  };

  const handelDeleteProject = (id) => {
    if (id) {
      DeleteAction(`${process.env.REACT_APP_SERVER_URL}/project/${id}`, refetch);
    }
  };

  const meta = allprojects?.data?.meta;
  const totalPage = meta?.totalPage || 1;
  const currentPage = meta?.page || page;

  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPage) setPage(currentPage + 1);
  };

  const handlePageClick = (p) => {
    setPage(p);
  };

  return (
    <>
      <div className='max-w-screen-lg p-4 sm:p-6 py-20 mx-auto flex flex-col justify-center w-full h-full text-white'>

        {/* terminal-style heading */}
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-violet-400/80 mb-3">
            work
          </p>
          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-zinc-100">
            <span className="text-zinc-600">$</span> projects{" "}
            <span className="text-amber-300">--all</span>
            <span className="inline-block w-[10px] h-[1em] ml-2 -mb-1 bg-violet-400 animate-pulse" />
          </h2>
          <p className="mt-4 text-sm text-zinc-500 font-mono">
            Check out some of my work right here
          </p>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {!isLoading &&
            allprojects?.data?.data?.map(({ _id, src, demo, code, server }) => (
              <div
                key={_id}
                className='group rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm overflow-hidden
                  transition-all duration-300 hover:border-violet-500/50
                  hover:shadow-[0_0_35px_-12px_rgba(167,139,250,0.55)]'
              >
                <div className='w-full h-52 overflow-hidden bg-zinc-900'>
                  <img
                    src={src}
                    alt=''
                    className='w-full h-full object-cover grayscale-[30%] opacity-90 transition-all duration-300
                      group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105'
                  />
                </div>

                <div className='flex items-center justify-center border-t border-zinc-800/80'>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={demo}
                    className='flex-1 text-center px-4 py-3 font-mono text-xs text-zinc-400
                      hover:text-violet-300 hover:bg-violet-500/5 transition-colors'
                  >
                    demo
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={code}
                    className='flex-1 text-center px-4 py-3 font-mono text-xs text-zinc-400 border-l border-zinc-800/80
                      hover:text-violet-300 hover:bg-violet-500/5 transition-colors'
                  >
                    code
                  </a>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={server}
                    className='flex-1 text-center px-4 py-3 font-mono text-xs text-zinc-400 border-l border-zinc-800/80
                      hover:text-violet-300 hover:bg-violet-500/5 transition-colors'
                  >
                    server
                  </a>
                </div>

                <div className='flex items-center justify-center gap-2 px-4 py-3 border-t border-zinc-800/80'>
                  <Link
                    to={`/dashboard/project_details/${_id}`}
                    className='font-mono text-xs px-3 py-1.5 rounded-md border border-zinc-700
                      text-zinc-300 hover:border-violet-400/50 hover:text-violet-300 transition-colors'
                  >
                    details
                  </Link>

                  <button
                    onClick={() => projectModel({ _id, src, demo, code, server })}
                    className='font-mono text-xs px-3 py-1.5 rounded-md border border-violet-400/40
                      text-violet-300 hover:bg-violet-400/10 transition-colors'
                  >
                    update
                  </button>
                  <UpdateProjectModal updateProject={updateProject} refetch={refetch} />

                  <button
                    onClick={() => handelDeleteProject(_id)}
                    className='font-mono text-xs px-3 py-1.5 rounded-md border border-red-400/40
                      text-red-300 hover:bg-red-400/10 transition-colors'
                  >
                    delete
                  </button>
                </div>
                <div className='flex justify-center items-center pb-4'>
                  <Link
                    to={`/dashboard/add_to_details/${_id}`}
                    className='font-mono text-xs px-3 py-1.5 rounded-md border border-sky-400/40
                      text-sky-300 hover:bg-sky-400/10 transition-colors'
                  >
                    add to details
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination controls */}
        {totalPage > 1 && (
          <div className='flex justify-center items-center gap-2 mt-12 font-mono text-xs'>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className='px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-300
                hover:border-violet-400/50 hover:text-violet-300 transition-colors
                disabled:opacity-40 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300'
            >
              prev
            </button>

            {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageClick(p)}
                className={`w-8 h-8 rounded-md border transition-colors ${
                  p === currentPage
                    ? 'border-violet-400/60 bg-violet-500/15 text-violet-300'
                    : 'border-zinc-700 text-zinc-400 hover:border-violet-400/50 hover:text-violet-300'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPage}
              className='px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-300
                hover:border-violet-400/50 hover:text-violet-300 transition-colors
                disabled:opacity-40 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300'
            >
              next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProjects;