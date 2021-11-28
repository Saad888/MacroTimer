import { useState } from 'react';
import './App.css';

const MacroField = ({ value, setValue, n, active }) => {
    if (!active)
        return null;
    return (
        <div class="field" style={{ marginBottom: 20 }}>
            <label>Macro {n}</label>
            <form class="ui form inverted"><textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder={`Enter Macro ${n}`} rows="7"></textarea></form>
        </div>
    )
}


const getTimes = (source) => {
    const re = /<wait.[0-9]>/g;
    const waits = source.match(re) ?? [];
    const times = waits.map(w => parseInt(w.replace('<wait.', '').replace('>', '')))
    return times.reduce((a, b) => a + b, 0);
}

const MacroTimer = ({ sources }) => {
    const times = sources.map(getTimes);
    console.log(times);
    return (
        <div style={{ marginTop: 15 }}>
            {times.map((t, i) => t > 0 ? <p key={i}>Macro {i + 1}: {t}s</p> : '')}
        </div>
    )
}

function App() {
    const [macro1, setMacro1] = useState('');
    const [macro2, setMacro2] = useState('');
    const [macro3, setMacro3] = useState('');


    return (
        <div className="ui container " style={{ marginTop: 50 }}>
            <h2 className="ui header">Macro Time Calculator</h2>
            <div class="ui divider"></div>
            <div class="ui grid">
                <div class="ten wide column">
                    <MacroField n={1} value={macro1} setValue={setMacro1} active={true}/>
                    <MacroField n={2} value={macro2} setValue={setMacro2} active={!!macro1 || !!macro2 || !!macro3}/>
                    <MacroField n={3} value={macro3} setValue={setMacro3} active={!!macro2 || !!macro3}/>
                </div>
                <div class="six wide column">
                    <MacroTimer sources={[macro1, macro2, macro3]} />
                </div>
            </div>
        </div>
    );
}

export default App;