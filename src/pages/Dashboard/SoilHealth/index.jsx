import React, { useContext } from "react";
import { useMutation, useSubscription } from "@apollo/client";

import { AuthContext } from "../../../context/auth";
import { CREATE_SOIL, SOIL_SUBSCRIPTION } from "../../../graphql/soil";

const inputStyles =
    "flex-1 py-2 px-4 m-4 w-56 text-base placeholder-gray-400 text-gray-700 bg-white rounded-lg border border-transparent border-cyan-300 shadow-sm appearance-none focus:border-transparent focus:ring-2 focus:ring-cyan-600 focus:outline-none";

const SoilHealth = () => {
    const { user } = useContext(AuthContext);

    const [createSoil] = useMutation(CREATE_SOIL);
    const { data: recc } = useSubscription(SOIL_SUBSCRIPTION, {
        variables: {
            username: user?.username,
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const { data, error } = await createSoil({
            variables: {
                humidity: formData.get("humidity"),
                nitrogen: formData.get("nitrogen"),
                ph: formData.get("ph"),
                phosphorous: formData.get("phosphorous"),
                potas: formData.get("potas"),
                rainfall: formData.get("rainfall"),
                temp: formData.get("temp"),
            },
        });
    };

    return (
        <section className="container mx-auto">
            <h2 className="text-2xl font-semibold px-4">
                Crop Recommender
            </h2>
            <p className="px-4 py-2">Enter values from soil test below to find out the recommended crops for your soil type.</p>
            <hr />

            <form className="my-8" onSubmit={handleSubmit}>
                <input
                    type="number"
                    step="any"
                    id="nitrogen"
                    name="nitrogen"
                    placeholder="Nitrogen"
                    className={inputStyles}
                    required
                />
                <input
                    type="number"
                    step="any"
                    id="phosphorous"
                    name="phosphorous"
                    placeholder="Phosphorous"
                    className={inputStyles}
                    required
                />
                <input
                    type="number"
                    step="any"
                    id="potas"
                    name="potas"
                    placeholder="Potassium"
                    className={inputStyles}
                    required
                />
                <input
                    type="number"
                    step="any"
                    id="humidity"
                    name="humidity"
                    placeholder="Humidity"
                    className={inputStyles}
                    required
                />
                <input
                    type="number"
                    step="any"
                    id="ph"
                    name="ph"
                    placeholder="pH value"
                    className={inputStyles}
                    required
                />
                <input
                    type="number"
                    step="any"
                    id="rainfall"
                    name="rainfall"
                    placeholder="Rainfall (cm)"
                    className={inputStyles}
                    required
                />
                <input
                    type="number"
                    step="any"
                    id="temp"
                    name="temp"
                    placeholder="Temperature °C"
                    className={inputStyles}
                    required
                />
                <button
                    type="submit"
                    className="py-2 px-4 m-4 w-56 text-base font-semibold text-center text-white bg-cyan-600 rounded-lg shadow-md transition duration-200 ease-in hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-cyan-200 focus:outline-none"
                >
                    Submit
                </button>
            </form>


            {recc &&
                <>
                    <p>Recommended crops are: </p>
                    <ul className="list-disc">
                        {recc?.soilRec?.recommendations.map(crop => <li key={crop}>{crop}</li>)}
                    </ul>
                </>
            }
        </section>
    );
};

export default SoilHealth;
