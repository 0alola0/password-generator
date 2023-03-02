import React from 'react';
import {useState} from 'react';
import './style.css';
import CopyIcon from './assets/images/icon-copy.svg';
import ArrowIcon from './assets/images/icon-arrow-right.svg';
import Checkbox from './components/Checkbox';
import RangeSlider from './components/RangeSlider';


function App() {
    const [password, setPassword] =  useState({
        length: 10,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
        strength: '',
        style: 'indicator',
    });
    const [handleText, setHandleText] = useState('')
    const [copied, setCopied] = useState(false)

    const setPasswordLength = (val) => {
        setPassword({
            ...password,
            length: val,
        })
        console.log(password.length)
    }
    const handleUppercase = () => {
        setPassword({
            ...password,
            uppercase: !password.uppercase,
        })
        console.log(password.length)

    }
    const handleStyle = (v) => {
        setPassword({
            ...password,
            style: v,
        })
    }

    const handleLowercase = () => {
        setPassword({
            ...password,
            lowercase: !password.lowercase,
        })
    }
    const handleNumber = () => {
        setPassword({
            ...password,
            numbers: !password.numbers,
        })
    }
    const handleSymbol = () => {
        setPassword({
            ...password,
            symbols: !password.symbols,
        })
    }
    function generatePassword(event){
        event.preventDefault()
        const numbersArr = [1,2,3,4,5,6,7,8,9,0]
        const symbolsArr = ["!","@","#","$","%","^","&","*","(",")","_","-","+","="]
        const lowercaseArr = 'abcdefghijklmnopqrstuvwxyz'.split('')
        const uppercaseArr = lowercaseArr.map((l)=> l.toUpperCase())
        console.log(lowercaseArr, numbersArr, uppercaseArr, symbolsArr)
        const {length, uppercase, lowercase, numbers, symbols} = password

        const generateResult = (length, uppercase, lowercase, numbers, symbols)=>{
            const available = [
                ...(uppercase? uppercaseArr : []),
                ...(lowercase? lowercaseArr : []),
                ...(numbers? numbersArr : []),
                ...(symbols? symbolsArr : [])
            ]
            const shuffle = (array) => array.sort(()=> Math.random()-0.5)
            const characters = shuffle(available).slice(0, length)
            console.log(length, "length")
            if((length < 5) || (!uppercase && !numbers && !symbols)){
                password.strength = "TOO WEAK!"
                handleStyle('indicator too-weak')
            }else if((length < 7) || (!numbers && !symbols)){
                password.strength = "WEAK"
                handleStyle('indicator weak')
            }else if(length < 11 || !symbols){
                password.strength = "MEDIUM"
                handleStyle('indicator medium')
            }else{
                password.strength = "STRONG"
                handleStyle('indicator strong')
            }
            // handleStrong('WEAK!')
            setHandleText(characters.join(''))
            return characters
        }
        
        console.log(generateResult(length, uppercase, lowercase, numbers, symbols))


    }
    
  return (
    <section className="generator-interface">
        <div className="container">
            <form className="main-form" id="pass-form">
                <h3 className="naming">Password Generator</h3>
                <div className="result-container">
                    <input className="result-input" type="text" id="result" placeholder="P4$5W0rD!" value={handleText} readOnly/>
                    <button className="copy-btn" onClick={(e)=>{
                        e.preventDefault()
                        if(password.length>0){
                            console.log("big pass")
                            navigator.clipboard.writeText(handleText)
                            setCopied(true)
                            setTimeout(()=>{
                                setCopied(false)
                            },2000)
                        }
                    }}>{copied?'Copied': ''} <img src={CopyIcon} alt="copy-icon" /></button>
                </div>
                <div className="input-container">
                    <div className="slider-component">
                        <RangeSlider className="range-slider" length={password.length} setLength={(e)=> setPasswordLength(e.target.value)}/>
                    </div>

                    <div className="field">
                        <Checkbox value={password.uppercase} onChange={handleUppercase} />
                        <label className="label-inclusion">Include Uppercase Letters</label>
                    </div>
                    <div className="field">
                        <Checkbox value={password.lowercase} onChange={handleLowercase} />
                        <label className="label-inclusion">Include Lowercase Letters</label>
                    </div>
                    <div className="field">
                        <Checkbox value={password.numbers} onChange={handleNumber} />
                        <label className="label-inclusion">Include Numbers</label>
                    </div>
                    <div className="field">
                        <Checkbox value={password.symbols} onChange={handleSymbol} />
                        <label className="label-inclusion">Include Symbols</label>
                    </div>

                    <div className="strength-container">
                        <h4 className="static-strength">STRENGTH</h4>
                        <div className="strength-showcase">
                            <h4 className="dynamic-strength">{password.strength}</h4>
                            <div className={password.style}></div>
                            <div className={password.style}></div>
                            <div className={password.style}></div>
                            <div className={password.style}></div>
                        </div>
                    </div>

                    <button className="generate-btn" onClick={generatePassword}>Generate <div className="arrow"></div></button>
                </div>
            </form>

        </div>
    </section>
  );
}

export default App;
