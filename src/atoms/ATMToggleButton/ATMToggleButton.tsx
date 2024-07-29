import React from 'react'
import { GrTemplate } from 'react-icons/gr';
import { TfiMenuAlt } from 'react-icons/tfi';

type props = {
    setSelectedToggle: any,
    selectedToggle: string,

}

const ATMToggleButton = ({ setSelectedToggle, selectedToggle }: props) => {
    return (
        <div className="bg-white p-4 rounded-lg">
            <p className="text-2xl font-bold text-center">View Toggle</p>
            <div className="flex justify-center mt-4">
                <div className="flex bg-slate-200  justify-center w-fit rounded-lg">
                    <div
                        onClick={() => {
                            setSelectedToggle("Card");
                        }}
                        className={` py-3 px-8  rounded-lg cursor-pointer ${selectedToggle === "Card" ? "bg-green-300" : ""
                            }`}
                    >
                        <GrTemplate size="1.5em" />
                    </div>
                    <div
                        onClick={() => {
                            setSelectedToggle("Para");
                        }}
                        className={`py-3 px-8 rounded-lg cursor-pointer ${(selectedToggle === "Para" || selectedToggle === 'Form') ? "bg-green-300" : ""
                            }`}
                    >
                        <TfiMenuAlt size="1.5em" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ATMToggleButton