import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';

const CryptoGraph = (props) => {
    const {history} = props
return (
    <>
    <Plot
      data = {[
        {type: 'scatter',
        mode: 'lines',
        x: history['time'],
        y: history['price'],
        marker: { color: '#ed022d'}}
        ]}
      layout = { {width: 1000, height: 500, title: `Price History for ${crypto.name}`} }
    />
    </>
    )
}

export default CryptoGraph