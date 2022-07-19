
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { getTrainDetail } from '../api';

export default function TrainDetail() {
  let { trainId } = useParams();

  const [trainDetail, setTrainDetail] = useState({})

  const fetchDetail = async () => {
    const trainIdNumber = parseInt(trainId || "");
    const detail = await getTrainDetail(trainIdNumber);
    console.info("train detail:", detail);
    setTrainDetail(detail);
  }

  useEffect(() => {
    fetchDetail();
  }, [])


  return (
    <main>
      <h2>Train {trainId}</h2>

      {/* <div>
        {trainDetail}
      </div> */}
    </main>
  );
}
  