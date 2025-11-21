import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CodingPlayground = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const initial = query.get("code") ? decodeURIComponent(query.get("code")) : "// Write JavaScript here\nconsole.log('Hello world');";
  const [code, setCode] = useState(initial);
  const iframeRef = useRef(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    // prepare message listener for iframe responses
    const onMessage = (e) => {
      if (!e.data || e.data.source !== "playground-runner") return;
      setOutput((prev) => prev + e.data.payload + "\n");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const runCode = () => {
    setOutput("");
    const iframe = iframeRef.current;
    if (!iframe) return;
    const srcdoc = `
      <html>
      <body>
        <script>
          // intercept console
          (function(){
            function send(msg){ parent.postMessage({ source: 'playground-runner', payload: msg+'' }, '*'); }
            console.log = function(){ try{ send(Array.from(arguments).join(' ')); }catch(e){} };
            console.error = function(){ try{ send('ERROR: '+Array.from(arguments).join(' ')); }catch(e){} };
            window.onerror = function(msg, src, line, col, err){ send('UNCAUGHT ERROR: '+msg + ' ('+ (err && err.stack ? err.stack : src+':'+line+':'+col) +')'); };
          })();
        <\/script>
        <script>
          try {
            ${code}
          } catch (e) {
            parent.postMessage({ source: 'playground-runner', payload: 'ERROR: '+(e && e.message ? e.message : e) }, '*');
          }
        <\/script>
      </body>
      </html>
    `;
    iframe.srcdoc = srcdoc;
  };

  return (
    <div className="main-content">
      <div style={{display:'flex', gap:16}}>
        <div style={{flex:1}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
            <h2>Coding Playground</h2>
            <div>
              <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
              <button className="btn" onClick={runCode} style={{marginLeft:8}}>Run</button>
            </div>
          </div>
          <textarea value={code} onChange={(e)=>setCode(e.target.value)} style={{width:'100%', minHeight:360, fontFamily:'monospace', fontSize:13, padding:12, borderRadius:8, border:'1px solid #e6eef7'}} />
        </div>

        <div style={{width:420}}>
          <h3>Output</h3>
          <div style={{background:'#0b1220', color:'#e6eefb', minHeight:200, padding:12, borderRadius:8, fontFamily:'monospace', fontSize:13, whiteSpace:'pre-wrap', overflow:'auto'}}>
            {output || <span style={{opacity:0.6}}>No output yet. Click Run.</span>}
          </div>
        </div>
      </div>

      <iframe ref={iframeRef} title="runner" sandbox="allow-scripts" style={{width:0,height:0,border:0,visibility:'hidden'}} />
    </div>
  );
};

export default CodingPlayground;
