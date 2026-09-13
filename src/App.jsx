      import { useEffect, useRef, useState } from 'react'
      import './App.css'
      import './Landing.css'
      import './Logo.css'

      const BUSINESS_NAME = import.meta.env.VITE_BUSINESS_NAME || 'PLAYZ24 GAMING CAFE'
      const GOOGLE_URL = import.meta.env.VITE_GOOGLE_REVIEW_URL || ''
      const experiences = [['🎮', 'PS5 Gaming'], ['🏎️', 'Racing Wheel'], ['🎱', 'Pool Table'], ['🕹️', 'Other Games'], ['✨', 'Ambience'], ['🤝', 'Staff'], ['💳', 'Pricing'], ['🎁', 'Offers & Events']]
      const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

      /* ⬇️ LOGO — change src below to update your logo image */
      function Logo() { return <div className="logo" aria-label={BUSINESS_NAME}><img src="/garva.svg" alt={BUSINESS_NAME} className="logo-svg" /></div> }
      function Header({ onBack, simple = false }) { return <header className={`topbar ${simple ? 'simple-header' : ''}`}>{!simple && <button className="icon-button" onClick={onBack} aria-label="Go back">←</button>}<Logo />{!simple && <span className="header-heart">♡</span>}</header> }
      function GamingBackground({ children }) { return <main className="app-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="scanlines" /><div className="app-inner">{children}</div></main> }
      function NeonButton({ children, onClick, disabled = false, className = '' }) { return <button className={`neon-button ${className}`} onClick={onClick} disabled={disabled}>{children}</button> }

      function Landing({ onStart }) {
        const features = [['🎮', 'PS5 Gaming'], ['🏎️', 'Racing Wheel'], ['🎱', 'Pool Table'], ['✦', 'Great Ambience'], ['⚡', 'Friendly Staff']]
        const touchStartY = useRef(null)
        const [swipeDistance, setSwipeDistance] = useState(0)
        const handleTouchStart = event => { touchStartY.current = event.touches[0].clientY; setSwipeDistance(0) }
        const handleTouchMove = event => { if (touchStartY.current === null) return; setSwipeDistance(Math.max(0, Math.min(80, touchStartY.current - event.touches[0].clientY))) }
        const handleTouchEnd = () => { if (swipeDistance > 55) onStart(); touchStartY.current = null; setSwipeDistance(0) }
        return <div className="screen landing" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}><div className="landing-image" aria-hidden="true" /><Header simple onBack={() => {}} /><div className="landing-copy"><p className="eyebrow">WELCOME TO THE ARENA</p><h1>GREAT<br />GAMES<br />DESERVE<br /><em>GREAT WORDS</em></h1><p className="intro">Share your experience at {BUSINESS_NAME} and help more gamers discover the ultimate gaming experience.</p></div><div className="feature-row">{features.map(([icon, label]) => <div className="feature" key={label}><span>{icon}</span><small>{label}</small></div>)}</div><div className="vibe-copy"><span>GOOD GAMES</span><span>GOOD PEOPLE</span><strong>GREAT VIBES</strong></div><div className="script">More than a Gaming Cafe<br /><b>It's a Community</b> <i>♡</i></div><div className="swipe-hint" style={{ transform: `translateY(${-swipeDistance / 2}px)` }}><span>⌃</span><small>SWIPE UP TO REVIEW</small></div></div>
      }

      function Step({ number, title, optional, children }) { return <section className="form-step"><div className="step-title"><span>{number}</span><div><h2>{title} {optional && <small>(optional)</small>}</h2>{number === '01' && <p>Select the star rating you want to give</p>}</div></div>{children}</section> }
      function Generator({ form, setForm, onBack, onGenerate }) {
        const set = (key, value) => setForm(current => ({ ...current, [key]: value }))
        const toggleExperience = label => set('experiences', form.experiences.includes(label) ? form.experiences.filter(item => item !== label) : [...form.experiences, label])
        return <div className="screen generator"><Header onBack={onBack} /><div className="page-heading"><p className="eyebrow">YOUR EXPERIENCE, AMPLIFIED</p><h1>AI REVIEW<br /><em>GENERATOR</em></h1><p>Turn your gaming experience into a few amazing words.</p></div><div className="steps"><Step number="01" title="How would you rate your experience?"><div className="rating-grid">{ratingLabels.map((label, index) => <button key={label} className={`rating ${form.rating === index + 1 ? 'selected' : ''}`} onClick={() => set('rating', index + 1)}><b>{index + 1}</b><span>★</span><small>{label}</small></button>)}</div></Step><Step number="02" title="What was part of your experience?" optional><div className="chip-grid">{experiences.map(([icon, label]) => <button key={label} className={`chip ${form.experiences.includes(label) ? 'selected' : ''}`} onClick={() => toggleExperience(label)}><span>{icon}</span>{label}</button>)}</div></Step><Step number="03" title="Review language"><div className="choice-row">{['English', 'Hinglish'].map(language => <button key={language} className={`choice ${form.language === language ? 'selected' : ''}`} onClick={() => set('language', language)}>{language}<span>{form.language === language ? '✓' : ''}</span></button>)}</div></Step><Step number="04" title="Choose your gender"><div className="choice-row gender">{['Male', 'Female', 'Other'].map(gender => <button key={gender} className={`choice ${form.gender === gender ? 'selected' : ''}`} onClick={() => set('gender', gender)}>{gender}<span>{form.gender === gender ? '✓' : ''}</span></button>)}</div></Step></div><NeonButton onClick={onGenerate} disabled={!form.rating || !form.language || !form.gender}>✦ Generate AI Review <span>→</span></NeonButton><p className="support">GAMERS SUPPORT GAMERS <span>♥</span></p></div>
      }

      function buildReviews({ rating, experiences: selected, language }, shuffle) {
        const subject = selected.length ? selected.slice(0, 3).join(', ') : 'the gaming setups'
        const tone = rating >= 5 ? 'Absolutely loved' : rating === 4 ? 'Really enjoyed' : rating === 3 ? 'Had a decent time with' : rating === 2 ? 'The potential in' : 'I found the experience with'
        const endings = language === 'Hinglish' ? ['Full paisa vasool and the staff was genuinely helpful.', 'Friends ke saath chill karne ke liye perfect spot hai.', 'Overall vibe kaafi mast hai, definitely worth a visit.'] : ['The staff was welcoming and the whole place felt easy to enjoy.', 'A solid spot for a relaxed game night with friends.', 'The setup is thoughtfully done and the energy is great.']
        const starts = language === 'Hinglish' ? ['Kya mast gaming cafe hai!', 'Boisar mein gamers ke liye ekdum perfect place.', 'Gaming ka experience yahan kaafi next level laga.', 'Friends ke saath bahut maza aaya.', 'The vibe here is honestly too good!'] : ['Such a great gaming cafe!', 'One of the best places to game in Boisar.', 'The gaming experience here was seriously impressive.', 'Had a brilliant time with friends here.', 'The atmosphere at this cafe is genuinely special.']
        return starts.map((start, index) => `${start} ${tone.toLowerCase()} ${subject.toLowerCase()}. ${endings[(index + shuffle) % endings.length]}`)
      }
      function Suggestions({ form, reviews, setReviews, onBack, onCopy }) {
        const [shuffling, setShuffling] = useState(false)
        const shuffle = () => { setShuffling(true); window.setTimeout(() => { setReviews(buildReviews(form, Math.floor(Math.random() * 9) + 1)); setShuffling(false) }, 500) }
        return <div className="screen suggestions"><Header onBack={onBack} /><div className="page-heading"><p className="eyebrow">CURATED FOR YOU</p><h1>AI REVIEW<br /><em>SUGGESTIONS</em></h1><p>Here are 5 personalized review drafts for you.</p></div><div className="review-list">{reviews.map((review, index) => <article className="review-card" key={`${review}-${index}`}><div className="review-number">0{index + 1}</div><p>{review}</p><button className="copy-button" onClick={() => onCopy(review)}>Copy & Review on Google <span>↗</span></button></article>)}</div><button className="shuffle-button" onClick={shuffle} disabled={shuffling}>{shuffling ? 'Creating new drafts...' : '⤨ Shuffle More Reviews'}</button><p className="shuffle-note">Not happy with these? Get 5 new reviews instantly.</p></div>
      }
      function Success({ onBack, copyFailed }) {
        const [progress, setProgress] = useState(12)
        useEffect(() => { const timer = window.setInterval(() => setProgress(value => Math.min(value + 8, 92)), 220); const redirect = window.setTimeout(() => { if (GOOGLE_URL) window.open(GOOGLE_URL, '_blank', 'noopener,noreferrer') }, 2500); return () => { window.clearInterval(timer); window.clearTimeout(redirect) } }, [])
        return <div className="screen success"><Header onBack={onBack} /><div className="success-card"><div className="check">{copyFailed ? '!' : '✓'}</div><p className="eyebrow">{copyFailed ? 'COPY MANUALLY' : 'MISSION ACCOMPLISHED'}</p><h1>Review<br /><em>{copyFailed ? 'Ready!' : 'Copied!'}</em></h1><p>{copyFailed ? 'Clipboard access was blocked. Copy the draft from the previous screen.' : 'Redirecting you to Google Review Page...'}</p><div className="progress"><span style={{ width: `${progress}%` }} /></div><div className="tip"><b>💡 Tip</b><p>{copyFailed ? 'Select the draft again and use your browser copy command, then paste it into Google.' : 'Your review has been copied to clipboard. Now choose your rating on Google and paste it there.'}</p></div></div><div className="thank-you"><div className="controller">⌁</div><h2>THANK YOU<br />FOR BEING A PART OF<br /><em>OUR GAMING COMMUNITY ♥</em></h2><strong>{BUSINESS_NAME}</strong><small>PLAY · CONNECT · REPEAT</small>{!GOOGLE_URL && <p className="fallback">Google review link is not configured yet.</p>}</div></div>
      }
      function App() {
        const [screen, setScreen] = useState('landing')
        const [form, setForm] = useState({ rating: 0, experiences: [], language: 'English', gender: 'Other' })
        const [reviews, setReviews] = useState([])
        const [copied, setCopied] = useState(false)
        const [copyFailed, setCopyFailed] = useState(false)
        const generate = () => { setScreen('generating'); window.setTimeout(() => { setReviews(buildReviews(form, 0)); setScreen('suggestions') }, 700) }
        const copyReview = async review => { try { await navigator.clipboard.writeText(review); setCopied(true); setCopyFailed(false) } catch { setCopied(false); setCopyFailed(true) } setScreen('success') }
        return <GamingBackground>{screen === 'landing' && <Landing onStart={() => setScreen('generator')} />}{screen === 'generator' && <Generator form={form} setForm={setForm} onBack={() => setScreen('landing')} onGenerate={generate} />}{screen === 'generating' && <div className="loading-screen"><div className="loader">✦</div><p>COMPOSING YOUR REVIEW</p><span>Finding the right words...</span></div>}{screen === 'suggestions' && <Suggestions form={form} reviews={reviews} setReviews={setReviews} onBack={() => setScreen('generator')} onCopy={copyReview} />}{screen === 'success' && <Success onBack={() => setScreen('suggestions')} copyFailed={copyFailed} />}{copied && <span className="sr-only">Review copied successfully</span>}{copyFailed && <span className="sr-only">Clipboard access was blocked</span>}</GamingBackground>
      }
      export default App

