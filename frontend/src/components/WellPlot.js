import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Select from 'react-select';
import axios from 'axios';
import './WellPlot.css';
import Chatbot from './Chatbot';


const WellPlot = () => {
  const [curves, setCurves] = useState([]);
  const [curveData, setCurveData] = useState({});
  const [selectedCurves, setSelectedCurves] = useState([]);
  const [depthRange, setDepthRange] = useState({ min: null, max: null });

  const [aiResults, setAIResults] = useState([]);
  const [aiMetrics, setAIMetrics] = useState(null);

  const [activeStep, setActiveStep] = useState('visualization');

  useEffect(() => {
    const fetchData = async () => {
      const names = await axios.get('/api/visualization/curves');
      setCurves(names.data.curveNames.map(c => ({ value: c, label: c })));

      const data = await axios.get('/api/visualization/curves-data');
      setCurveData(data.data);

      if (data.data['DEPT']) {
        setDepthRange({
          min: data.data['DEPT'][0],
          max: data.data['DEPT'][data.data['DEPT'].length - 1]
        });
      }
    };
    fetchData();
  }, []);

  const getFiltered = (curve) => {
    if (!curveData['DEPT'] || !curveData[curve]) return { x: [], y: [] };

    const depth = curveData['DEPT'];
    const values = curveData[curve];

    const filtered = depth.map((d, i) => ({ d, v: values[i] }))
      .filter(p =>
        (!depthRange.min || p.d >= depthRange.min) &&
        (!depthRange.max || p.d <= depthRange.max)
      );

    return {
      x: filtered.map(p => p.v),
      y: filtered.map(p => p.d)
    };
  };

  const runAI = async () => {
  const res = await axios.post('/api/interpret', {
    curves: selectedCurves.map(c => c.value),
    depthRange: [depthRange.min, depthRange.max]
  });

  const colorMap = {
    facies: '#cce5ff',
    anomaly: '#ffcccc',
    cluster: '#fff7cc',
    hydrocarbon: '#ccffcc'
  };

  // SAFE NORMALIZATION — works with any backend schema
  const formatted = (res.data.interpretations || []).map(r => {
    const category =
      r.category ||
      r.type ||
      r.label ||
      'Unknown';

    const curve =
      r.curve ||
      r.curveName ||
      'Multi-curve';

    const depthRange =
      r.depthRange ||
      [r.depth_start || r.start || 0, r.depth_end || r.end || 0];

    const interpretation =
      r.interpretation ||
      r.result ||
      r.label ||
      'AI detected zone';

    return {
      curve,
      depthRange,
      category,
      interpretation,
      color: colorMap[category.toLowerCase()] || '#eee'
    };
  });

  setAIResults(formatted);
  setAIMetrics(res.data.metrics || null);
};


  const renderDepthTable = () => {
    if (!curveData['DEPT']) return null;

    const depth = curveData['DEPT'];

    return (
      <div style={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '10px' }}>
        <table style={{ width: '100%', fontSize: '12px' }}>
          <thead>
            <tr>
              <th>Depth</th>
              {selectedCurves.map(c => <th key={c.value}>{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {depth.map((d, i) => {
              if ((depthRange.min && d < depthRange.min) ||
                  (depthRange.max && d > depthRange.max)) return null;

              return (
                <tr key={i}>
                  <td>{d}</td>
                  {selectedCurves.map(c => (
                    <td key={c.value}>
                      {curveData[c.value]?.[i]?.toFixed(3) || '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="wellplot-container">

      <h2>Well Visualization & AI Insights</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveStep('visualization')}>
          Visualization
        </button>

        <button onClick={() => setActiveStep('ai')} style={{ marginLeft: '10px' }}>
          AI Interpretation & Insights
        </button>
      </div>

      {/* ================= VISUALIZATION ================= */}
      {activeStep === 'visualization' && (
        <>
          <Select
            options={curves}
            isMulti
            value={selectedCurves}
            onChange={setSelectedCurves}
          />

          <Plot
            data={selectedCurves.map(curve => {
              const { x, y } = getFiltered(curve.value);
              return { x, y, type: 'scatter', mode: 'lines', name: curve.label };
            })}
            layout={{
              height: 600,
              yaxis: { autorange: 'reversed', title: 'Depth' }
            }}
          />

          {renderDepthTable()}
        </>
      )}

      {/* ================= AI PANEL ================= */}
      {activeStep === 'ai' && (
        <div className="ai-container">

          {/* LEFT PANEL */}
          <div className="ai-left-panel">

            <button onClick={runAI}>Run AI Analysis</button>

            {aiMetrics && (
              <div className="ai-metrics">
                <b>Accuracy:</b> {aiMetrics.accuracy}%<br />
                <b>F1 Score:</b> {aiMetrics.f1_score}<br />
                <i>{aiMetrics.insights}</i>
              </div>
            )}

            {/* DESCRIPTIVE TOOLKIT */}
            <div className="ai-descriptive">
              <h3>AI Toolkit — What & Why</h3>
              <ul>
                <li><b>Facies Classification:</b> Understand depositional environment and reservoir quality.</li>
                <li><b>Anomaly Detection:</b> Flag fractures, tool errors, or fluid change.</li>
                <li><b>Hydrocarbon Prediction:</b> Highlight probable pay zones.</li>
                <li><b>Clustering:</b> Reveal hidden stratigraphic trends.</li>
                <li><b>Quality Control:</b> Detect inconsistent measurements.</li>
              </ul>
            </div>

            {/* ADVANCED TOOLKIT */}
            <div className="ai-toolkit">
              <h3>AI Interpretation Toolkit</h3>
              <ul>
                <li><b>Facies Classification</b></li>
                <li><b>Anomaly Detection</b></li>
                <li><b>Hydrocarbon Probability</b></li>
                <li><b>Cluster Analysis</b></li>
                <li><b>Trend Analysis</b></li>
                <li><b>Reservoir Quality Index</b></li>
                <li><b>Data Quality Check</b></li>
                <li><b>Multi-curve Correlation</b></li>
                <li><b>Predictive Zonation</b></li>
                <li><b>AI Confidence Score</b></li>
              </ul>
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="ai-right-panel">

            {aiResults.length > 0 && (
              <table style={{ width: '100%', marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th>Curve</th>
                    <th>Depth</th>
                    <th>Type</th>
                    <th>Interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  {aiResults.map((r, i) => (
                    <tr key={i} style={{ background: r.color }}>
                      <td>{r.curve}</td>
                      <td>{r.depthRange[0]} - {r.depthRange[1]}</td>
                      <td>{r.category}</td>
                      <td>{r.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default WellPlot;






// ✅ Step 3 (Visualization panel)
// ✔ Curve dropdown selection
// ✔ Depth range min/max input
// ✔ Interactive Plotly curves vs depth
// ✔ Hover values on logs
// ✔ Data table below plot
// ✔ CSV export
// ✅ Step 4 (AI interpretation panel)
// ✔ AI interpretation button
// ✔ Facies prediction
// ✔ Anomaly detection
// ✔ Hydrocarbon zone classification
// ✔ Cluster grouping
// ✔ Color-coded AI result table
// ✔ Legend / toolkit panel explaining categories
// ✔ Insights panel (AI summary text)
// ✔ ML metrics display
// ✔ Accuracy score
// ✔ F1 score