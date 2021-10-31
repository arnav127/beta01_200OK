import React from 'react'

import { AuthContext } from "../../../context/auth"

import { useQuery } from '@apollo/client'
import { GET_MSRP } from '../../../graphql/msrp'

const inputStyles =
  "flex-1 py-2 px-4 m-4 w-56 text-base placeholder-gray-400 text-gray-700 bg-white rounded-lg border border-transparent border-cyan-300 shadow-sm appearance-none focus:border-transparent focus:ring-2 focus:ring-cyan-600 focus:outline-none";

const MSRP = (props) => {
  const { user } = React.useContext(AuthContext);

  const [msrpData, setMsrpData] = React.useState([]);

  const { loading } = useQuery(GET_MSRP, {
    variables: {
      city: user?.city
    },
    onCompleted: (data) => setMsrpData(JSON.parse(data.getMsrp).records || [])
  });



  return (
    <div className="container mx-auto">

      <h2 className="text-2xl font-semibold px-4">
        MSRP Values
      </h2>
      <p className="px-4 py-2">Today's latest MSRP values</p>
      <hr />
      <ul className="list-disc">
        {msrpData.map(c => (
          <li>{c.commodity}:
            Minimum: {c.min_price}, Maximum: {c.max_price}, Modal: {c.modal_price}</li>
        ))}
      </ul>
    </div>
  )
}

export default MSRP
