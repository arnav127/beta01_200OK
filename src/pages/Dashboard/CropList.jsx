import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import { PLANTED_CROPS, DELETE_PLANTATION } from "../../graphql/crop";

import { useTranslation } from "react-i18next";

const CropInstance = ({ crop }) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = React.useState(false);
    const [deletePlantation] = useMutation(DELETE_PLANTATION);
    return (
        <>
            <div className="relative m-2 shadow-lg">
                <div
                    className="w-full md:w-56 md:h-56 bg-center bg-cover rounded-lg"
                    style={{
                        backgroundImage: `url("https://${process.env.REACT_APP_BACKEND_BASEURI}/static/images/crops/${crop.crop.name}.jpg")`,
                    }}
                />
                <div className="absolute bottom-0 p-2 w-full bg-white rounded-b-sm">
                    <div className="flex justify-between items-center px-2">
                        <h3>{t(`${crop.crop.name}`)}</h3>
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
                                        {t("Harvested")} {crop.crop.name}?
                                    </h3>
                                </div>
                                <div className="flex items-center justify-end border-t border-solid rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            const { data, error } = deletePlantation({
                                                variables: {
                                                    id: crop?.id
                                                }
                                            });
                                            window.location.reload()
                                            setShowModal(false)
                                        }}
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

    return cropData ? (
        <div className="mt-2">
            <div className="flex flex-wrap items-center">
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
