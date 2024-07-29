import React from 'react'

type Props = {
    page: number,
    setPage: any
}

const ATMPagination = ({ setPage, page }: Props) => {
    return (
        <div className="flex gap-3">
            <span className={`py-1 px-3 cursor-pointer ${page === 1 ? 'bg-white text-black font-bold' : 'bg-slate-400 text-white font-bold'} rounded-full`} onClick={() => setPage(1)}>1</span>
            <span className={`py-1 px-3 cursor-pointer ${page === 2 ? 'bg-white text-black font-bold' : 'bg-slate-400 text-white font-bold'} rounded-full`} onClick={() => setPage(2)}>2</span>
            <span className={`py-1 px-3 cursor-pointer ${page === 3 ? 'bg-white text-black font-bold' : 'bg-slate-400 text-white font-bold'} rounded-full`} onClick={() => setPage(3)}>3</span>
            <span className={`py-1 px-3 cursor-pointer ${page === 4 ? 'bg-white text-black font-bold' : 'bg-slate-400 text-white font-bold'} rounded-full`} onClick={() => setPage(4)}>4</span>
            <span className={`py-1 px-3 cursor-pointer ${page === 5 ? 'bg-white text-black font-bold' : 'bg-slate-400 text-white font-bold'} rounded-full`} onClick={() => setPage(5)}>5</span>
        </div>
    )
}

export default ATMPagination