import React from 'react';
import {useState} from 'react';
import './style.css';
import CopyIcon from './assets/images/icon-copy.svg';
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
    }
    const handleUppercase = () => {
        setPassword({
            ...password,
            uppercase: !password.uppercase,
        })
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
        const {length, uppercase, lowercase, numbers, symbols} = password

        const generateResult = (length, uppercase, lowercase, numbers, symbols)=>{
            const available = [
                ...(uppercase? uppercaseArr : []),
                ...(lowercase? lowercaseArr : []),
                ...(numbers? numbersArr : []),
                ...(symbols? symbolsArr : [])
            ]
            let checks = 0
            //ამ ცვლადით აღვნიშნავ რამდენი ელემენტია მონიშნული რომ მაგით შევამოწმო
            checks = uppercase + lowercase + symbols + numbers
            const shuffle = (array) => array.sort(()=> Math.random()-0.5)
            const characters = shuffle(available).slice(0, length)
            //თუ 5-ზე პატარაა (რამდენი სახის სიმბოლოც არ უნდა იყოს) ან 7-ზე ნაკლები და მარტო 1 სახის სიმბოლო Too weak არის 
            if(length < 1 || checks <1){
            }else if(length < 5 || checks<2 && length<7){
                password.strength = "TOO WEAK!"
                handleStyle('indicator too-weak')
            //თუ 7-ზე პატარაა (2-ზე მეტი სახის სიმბოლოთი) ან 10-ზე ნპატარა და მარტო 2 სახის სიმბოლო weak არის 
            }else if((length<7 && checks>2) || (checks<4 && length<10)){
                password.strength = "WEAK"
                handleStyle('indicator weak')
            //თუ 10-ზე პატარაა (3-ზე მეტი სახის სიმბოლოთი) ან 10-ზე დიდი და მარტო 3 სახის სიმბოლო medium არის 

            }else if((length<10 && checks >3) || (checks<4 && length>9)){
                password.strength = "MEDIUM"
                handleStyle('indicator medium')
            //დანარჩენი სთრონგია
            }else{
                password.strength = "STRONG"
                handleStyle('indicator strong')
            }
            setHandleText(characters.join(''))
            return characters
        }
        
        generateResult(length, uppercase, lowercase, numbers, symbols)


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
