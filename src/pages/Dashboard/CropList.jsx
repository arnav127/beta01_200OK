import React from "react";
import Select from "react-select";
import { useMutation, useQuery } from "@apollo/client";

import { GET_CROPS, CREATE_PLANTATION, PLANTED_CROPS } from "../../graphql/crop";

const CropInstance = ({ crop }) => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <div className="relative m-2 shadow-lg">
                <div
                    className="w-56 h-56 bg-center bg-cover rounded-lg"
                    style={{
                        backgroundImage: `url("http://${process.env.REACT_APP_BACKEND_BASEURI}/${crop.crop.photo}")`,
                    }}
                />
                <div className="absolute bottom-0 p-2 w-full bg-white rounded-b-sm">
                    <div className="flex justify-between items-center px-2">
                        <h3>{crop.crop.name}</h3>
                        <button className="text-red-400 inline-block" onClick={() => setShowModal(true)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>

                    </div>
                    <div className="flex justify-between items-center px-2 text-sm">
                        <span>{crop.plantedDate}</span>
                        <span
                            className={`rounded-3xl text-xs uppercase inline-block py-1 px-3 ${crop.crop.season === "Kharif"
                                ? "bg-yellow-200 text-yellow-600"
                                : "bg-blue-200 text-blue-600"
                                }`}
                        >
                            {crop.crop.season}
                        </span>
                    </div>
                </div>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Harvested {crop.crop.name}?
                                    </h3>
                                </div>
                                <div className="flex items-center justify-end border-t border-solid rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Delete crop
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

const CropList = () => {
    const { data: cropData } = useQuery(PLANTED_CROPS);
    const { data: allCropData } = useQuery(GET_CROPS);

    return cropData ? (
        <div className="mt-2">
            <div className="flex items-center">
                <div className="flex justify-center items-center w-56 h-56 rounded-sm shadow-lg">
                    <svg
                        className="w-24 h-24"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>

                    <Select
                        placeholder="Crop"
                        options={allCropData?.allCrops}
                        inputId="cropName"
                        name="cropName"

                    />
                </div>

                {cropData.allCropsPlanted.map((crop) => (
                    <CropInstance key={crop.id} crop={crop} />
                ))}
            </div>
        </div>
    ) : (
        ""
    );
};

export default CropList;
