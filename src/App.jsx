import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const url = 'https://tinyurl-qcor.onrender.com'
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(''); 
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getUrls();
  }, [urls])

  const getUrls = async () => {
    const response = await axios.get(`${url}/api/urls`)
    console.log(response)
    setUrls(response.data)
  }

  const shortUrl = async (e) => {
    e.preventDefault()
    console.log(inputUrl)
    const response = await axios.post(`${url}/api/shorten`, {
      longUrl: inputUrl
    })

    setShortenedUrl(response.data.shortUrl)
    setInputUrl('')
  }

  const handleInputChange = (e) => { 
    setInputUrl(e.target.value);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
  }

  return (
    <div className="App">
      <h1>Welcome to the URL Shortener</h1>
      <p>Paste your URL below to shorten it</p>
      <input className='input' type="text" name='url' id='url' placeholder='Paste your URL' value={inputUrl} onChange={handleInputChange} />
      <br />
      <button className='button' onClick={shortUrl}>Ready</button>
      {shortenedUrl ? (<>
        <h2>Here is your shortened URL</h2>
        <h3><a href={shortenedUrl} rel='noreferrer' target='_BLANK'>{shortenedUrl}</a> <button onClick={copyToClipboard}>Copy</button></h3>
        
      </>) : null}

      {
        urls.map((url) => {
          return (
            <div className='url-container'>
              <h4><a href={url.longUrl} rel='noreferrer' target='_BLANK'>{url.longUrl}</a></h4>
              <h5><a href={url.shortUrl} rel='noreferrer' target='_BLANK'>{url.shortUrl}</a></h5>
              <h5>clicks: {url.cliks}</h5>
            </div>
          )
        })
      }
      
      <div className='footer'>
        <h5><a href='https://tinyurl-qcor.onrender.com/KDuO5tr3x' rel='noreferrer' target='_BLANK'>Linkedin</a></h5>
        <h5><a href='https://tinyurl-qcor.onrender.com/Q5vwK-7Ph' rel='noreferrer' target='_BLANK'>Julian Garcia Projects</a></h5>
        <h5><a href='https://tinyurl-qcor.onrender.com/egzmvQPMa' rel='noreferrer' target='_BLANK'>Github</a></h5>
      </div>
    </div>
  );
}

export default App;
