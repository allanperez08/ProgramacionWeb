import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:8000'

function App() {
  const [activeTab, setActiveTab] = useState('hide')
  const [secret, setSecret] = useState('')
  const [key, setKey] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleStoreSecret = async () => {
    if (!secret.trim()) {
      setError('Please enter a secret')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await axios.post(`${API_URL}/api/store`, {
        secret: secret
      })
      
      setResult(`Your secret key: ${response.data.key}`)
      setSecret('')
    } catch (err) {
      setError('Failed to store secret: ' + (err.response?.data?.error || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleRetrieveSecret = async () => {
    if (!key.trim()) {
      setError('Please enter a key')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await axios.get(`${API_URL}/api/retrieve/${key}`)
      setResult(`Your secret: ${response.data.secret}`)
      setKey('')
    } catch (err) {
      setError('Failed to retrieve secret: ' + (err.response?.data?.error || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔒 Secret Link</h1>
        <p>Share secrets securely - one time view only</p>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'hide' ? 'active' : ''}`}
          onClick={() => setActiveTab('hide')}
        >
          Hide Secret
        </button>
        <button 
          className={`tab ${activeTab === 'reveal' ? 'active' : ''}`}
          onClick={() => setActiveTab('reveal')}
        >
          Reveal Secret
        </button>
      </div>

      <div className="content">
        {activeTab === 'hide' && (
          <div className="tab-content">
            <h2>Hide a Secret</h2>
            <textarea
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter your secret here..."
              rows="6"
            />
            <button 
              onClick={handleStoreSecret} 
              disabled={loading}
            >
              {loading ? 'Hiding...' : 'Hide Secret'}
            </button>
          </div>
        )}

        {activeTab === 'reveal' && (
          <div className="tab-content">
            <h2>Reveal a Secret</h2>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your secret key..."
            />
            <button 
              onClick={handleRetrieveSecret} 
              disabled={loading}
            >
              {loading ? 'Revealing...' : 'Reveal Secret'}
            </button>
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {result && (
          <div className="result">
            {result}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

