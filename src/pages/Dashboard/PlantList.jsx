import React from "react";

const plantData = [
    {
        plantName: "Hydnocarpus",
        plantedDate: "13/04/2021",
        id: "66",
    },
    {
        plantName: "Winged Bean",
        plantedDate: "16/01/2021",
        id: "53923",
    },
    {
        plantName: "Cutleaf Meadowparsnip",
        plantedDate: "14/03/2021",
        id: "9",
    },
    {
        plantName: "Cream Sacs",
        plantedDate: "15/02/2021",
        id: "524",
    },
    {
        plantName: "Blue Sedge",
        plantedDate: "03/12/2020",
        id: "25",
    },
];
const Plant = ({ plantName, plantedDate }) => {
    return (
        <div className="flex bg-teal-50 p-2 rounded items-center justify-space-between">
            <div className="flex flex-col justify-center">
                <h4 className="text-lg font-semibold uppercase leading-relaxed">
                    {plantName}
                </h4>
                <p>{plantedDate}</p>
            </div>
        </div>
    );
};

const PlantList = () => {
    return (
        <div className="p-2 grid gap-3 grid-cols-1 lg:grid-cols-2">
            {plantData.map((plant) => (
                <Plant
                    plantName={plant.plantName}
                    plantedDate={plant.plantedDate}
                    key={plant.id}
                />
            ))}
        </div>
    );
};

export default PlantList;
