import React from 'react'
import Plot from 'react-plotly.js'

const CryptoGraph = (props) => {
  const { history, crypto } = props

  // plots price history data of coin
  return (
    <>
      <Plot
        className="plot-container"
        data={[
          {
            type: 'scatter',
            mode: 'lines',
            x: history['time'],
            y: history['price'],
            marker: { color: '#ed022d' },
          },
        ]}
        layout={{
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
          title: {
            text: `Price History for ${crypto.name}`,
          },
          font: {
            color: 'white',
          },
          xaxis: {
            showgrid: false,
            color: 'white',
          },
          yaxis: {
            showgrid: true,
            color: 'white',
          },
          width: '30%',
          height: '30%',
          autosize: true,
        }}
      />
    </>
  )
}

export default CryptoGraph
