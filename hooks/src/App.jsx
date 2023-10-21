//password generator project to learn useEffect,useCallback,useRef
// import { useState,useCallback,useEffect,useRef } from "react"

// function App() {
//   const [length,setLength]=useState(5)
//   const [numberAllowed,setNumberAllowed]=useState(false)
//   const [charAllowed,setCharAllowed]=useState(false)
//   const [password,setPassword]=useState("")

//   //useref hook
//  const passwordRef=useRef(null)

//   const passwordGenerator=useCallback(()=>{
//     let pass=""
//     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

//     if(numberAllowed) str +="0123456789"
//     if(charAllowed) str +="!@#$%^&*()"

//      for(let i=1;i<=length;i++){
//       let char=Math.floor(Math.random()*str.length+1)

//       pass+=str.charAt(char)
//      }

//      setPassword(pass)

//   },[length,numberAllowed,
//   charAllowed,setPassword])

//   const copyPasswordToClipboard=useCallback(()=>{
//     passwordRef.current?.select()
//     passwordRef.current?.setSelectionRange(0,99)
//    window.navigator.clipboard.writeText(password)
//   },[password])

//   useEffect(() =>{
//     passwordGenerator()
//   },[length,numberAllowed,charAllowed,passwordGenerator])

//   return (
    
//        <div className="w-full max-w-md mx-auto shadow-md
//        rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-orange-500">

//         <h1 className='text-white text-center my-3'>Password Generator</h1>
//         <div className='className="flex shadow rounded-lg
//         overflow-hidden mb-4"'>

//           <input 
//           type="text"
//           value={password}
//           className="outline-none w-full py-1 px-3"
//           placeholder="Password"
//           readOnly
//           ref={passwordRef}
//           />
//           <button
//           onClick={copyPasswordToClipboard}
//           className="outline-none bg-blue-700 text-white 
//           px-3 py-5 shrink-0">Copy</button>
//         </div>
//         <div className="flex text-sm gap-x-2">
//           <div className="flex items-center gap-x-1">
//           <input
//            type="range"
//            min={6}
//            max={100}
//            value={length}
//            className="cursor-pointer"
//            onChange={(e)=>{setLength(e.target.value)}}
//            />
//            <label>Length:{length}</label>
//         </div>
//         <div className="flex items-center gap-x-1">
//        <input 
//        type="checkbox"
//        defaultChecked={numberAllowed}
//        id="numberInput"
//        onChange={()=>{
//         setNumberAllowed((prev)=>!prev);
//        }}
//        />
//        <label htmlFor="numberInput">Numbers</label>
//        </div>
       
//        <div className="flex items-center gap-x-1">
//        <input 
//        type="checkbox"
//        defaultChecked={numberAllowed}
//        id="characterInput"
//        onChange={()=>{
//         setNumberAllowed((prev)=>!prev);
//        }}
//        />
//        <label htmlFor="characterInput">characters</label>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default App


//currency converter project to learn custom hooks
import { useState } from "react"
import { InputBox } from "./components"
import useCurrencyInfo from "./hooks/useCurrencyInfo"

function App(){
  
  const [amount,setAmount]=useState(0)
  const [from,setFrom]=useState("usd")
  const [to,setTo]=useState("inr")
  const [convertedAmount,setConvertedAmount]=useState(0)

  const currencyInfo=useCurrencyInfo(from)

  const options=Object.keys(currencyInfo)

  const swap=()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert=()=>{setConvertedAmount(amount*currencyInfo[to])
  
  }
   

 
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/164636/pexels-photo-164636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=>
                              setFrom(currency)
                            }
                            selectCurrency={from}

                            onAmountChange={(amount)=>setAmount(amount)}
                            
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                            
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                             label="To"
                             amount={convertedAmount}
                             currencyOptions={options}
                             onCurrencyChange={
                              (currency)=>setTo(currency)
                             }
                             selectCurrency={to}
                             amountDisable
                            
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
                  }

export default App