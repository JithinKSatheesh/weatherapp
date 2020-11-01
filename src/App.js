import React,{useState} from 'react'
import {fetchWeather} from './api/Fetchweather'
import './App.css'

// import Search from './Components/Search'
import Splash from './Components/Splash'
import bg from './images/background.jpg'

export default function App() {

    const [query,setQuery] = useState('')
    const [weather,setWeather] = useState({})
    const [placeholder,setPlaceholder] = useState('e.g. Alappuzha, Delhi, New York ')
    const [error,setError] = useState(false)
    const [fetching,setFetching] = useState(false)

    const search = async (e)=>{
        try{

                setFetching(true)
                const data = await fetchWeather(query)
                setWeather(data)
                setFetching(false)
                setQuery('')
                setPlaceholder('e.g. Alappuzha, Delhi, New York')
            
        }
        catch(err){
            setFetching(false) 
            setError(true) 
        }
    }

    const enterKey = async(e)=>{
        if(e.key === 'Enter'){
            search()
        }
    }
    

    return (
        <div  
            // style={{backgroundImage:`url(${bg})`}}  
            className="main-container" 
            onClick={()=>{ 
                setPlaceholder('e.g. Alappuzha, Delhi, New York')
                setError(false)
            }}
            
            >
            <div className="space-20"></div>
            <div className="search-container">
                <input 
                    type="text"
                    className="search"
                    placeholder={ placeholder}
                    value={query}
                    onChange={(e)=> setQuery(e.target.value)}
                    onKeyPress={enterKey}
                    onClick={()=>{setPlaceholder('')}}
                    />
                <div onClick={()=>{search()}} 
                    className="searchButton">
                        {fetching?
                        "..."
                        :
                        <svg fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
                        }
                </div>
            </div>
            
           <div className="space-50"></div>
           <div className="space-20"></div>
            {error && <> <div className="err_text"> Error or City not found!</div></>}
            {weather.main && (<> 
                <br/>
                <div className="result-container">
                    <div className="result-city">
                        {weather.name} 
                        <span className="result-country">
                            {weather.sys.country}
                        </span>
                    </div>
                    <div className="space-20"></div>
                    <div className="city-temp">
                    <svg fill="orange" width="24" height="24" viewBox="0 0 24 24"><path d="M17.5 2c.827 0 1.5.673 1.5 1.5v7.525c0 1.569.514 2.287 1.411 3.05 1.01.858 1.589 2.106 1.589 3.425 0 2.481-2.019 4.5-4.5 4.5s-4.5-2.019-4.5-4.5c0-1.319.579-2.567 1.59-3.425.896-.761 1.41-1.479 1.41-3.05v-7.525c0-.827.673-1.5 1.5-1.5zm0-2c-1.933 0-3.5 1.567-3.5 3.5v7.525c0 .587-.258 1.146-.705 1.525-1.403 1.192-2.295 2.965-2.295 4.95 0 3.59 2.909 6.5 6.5 6.5s6.5-2.91 6.5-6.5c0-1.985-.892-3.758-2.295-4.95-.447-.38-.705-.938-.705-1.525v-7.525c0-1.933-1.567-3.5-3.5-3.5zm2.107 14.718c-1.012-.89-1.607-1.734-1.607-3.22v-6.498h-1v6.498c0 1.484-.597 2.332-1.607 3.22-.794.698-1.393 1.642-1.393 2.782 0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5c0-1.14-.599-2.083-1.393-2.782zm-9.607-6.218c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5zm-8 0c0-.171.032-.333.051-.5h-2.051v1h2.051c-.019-.167-.051-.329-.051-.5zm1.705-3.501l-1.448-1.449-.707.707 1.448 1.448c.21-.261.445-.497.707-.706zm6.297.706l1.447-1.448-.707-.707-1.448 1.448c.263.21.498.445.708.707zm-3.502-1.705c.171 0 .334.032.5.05v-2.05h-1v2.05c.166-.018.329-.05.5-.05zm0 9c-.171 0-.334-.032-.5-.05v2.05h1v-2.05c-.166.018-.329.05-.5.05zm4.449-5c.019.167.051.329.051.5l-.051.5h2.051v-1h-2.051zm-7.951 3.294l-1.448 1.449.707.707 1.448-1.448c-.262-.21-.497-.446-.707-.708zm6.296.708l1.448 1.448.707-.707-1.447-1.448c-.21.262-.445.497-.708.707z"/></svg>
                        &nbsp;
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="text-small">
                         {weather.main.temp_min} <sup>&deg;c</sup>
                        &nbsp;
                        -
                        &nbsp;
                         {weather.main.temp_max} <sup>&deg;c</sup>
                    </div>
                    <div className="space-50"></div>
                    <div className="report_row">
                        <div className="report_col left_align">
                        <svg fill="#5c91c6" width="20" height="20" viewBox="0 0 24 24"><path d="M20.422 11.516c-.178-3.233-3.031-5.778-6.432-5.492-1.087-1.239-2.693-2.024-4.49-2.024-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21.967 0 1.714.25 2.29.644-1.823.922-3.096 2.746-3.212 4.872-2.022.358-3.697 2.127-3.551 4.484z"/></svg>
                            &nbsp;
                            Weather
                        </div>
                        <div className="report_col">
                            {weather.weather[0].main}
                        </div>     
                    </div>
                    <div className="space-20"></div>
                    <div className="report_row">
                        <div className="report_col left_align">
                            <svg fill="#5c91c6" width="20" height="20" viewBox="0 0 24 24"><path d="M9.019 15.404c-.194 0-.335-.121-.422-.364-.087-.242-.131-.61-.131-1.102s.044-.858.131-1.097c.087-.238.228-.358.422-.358.372 0 .558.485.558 1.454 0 .979-.186 1.467-.558 1.467zm5.957.477c-.194 0-.335.119-.422.358-.087.239-.131.604-.131 1.097s.044.86.131 1.102c.087.242.228.364.422.364.372 0 .558-.489.558-1.466 0-.97-.186-1.455-.558-1.455zm5.024.194c0 4.378-3.579 7.925-8 7.925-4.421 0-8-3.547-8-7.925 0-5.887 5.667-7.117 8-16.075 2.333 8.958 8 10.188 8 16.075zm-10.993.533c.667 0 1.173-.224 1.518-.672.345-.448.518-1.118.518-2.01 0-.853-.175-1.51-.526-1.969-.351-.46-.854-.689-1.51-.689-1.338 0-2.007.886-2.007 2.659 0 .869.174 1.533.524 1.992.349.46.843.689 1.483.689zm6.038-5.218h-1.396l-4.718 8.505h1.396l4.718-8.505zm1.955 5.934c0-.853-.176-1.51-.527-1.969-.351-.46-.854-.689-1.51-.689-1.338 0-2.007.886-2.007 2.658 0 .865.174 1.527.523 1.987.35.459.845.689 1.485.689.667 0 1.173-.224 1.518-.672.345-.448.518-1.116.518-2.004z"/></svg>
                            &nbsp;
                            Humidity
                        </div>
                        <div className="report_col">
                            {weather.main.humidity}
                        </div>     
                    </div>
                    <div className="space-20"></div>
                    <div className="report_row">
                        <div className="report_col left_align">
                        <svg fill="#5c91c6" width="20" height="20" viewBox="0 0 24 24"><path d="M11 10h-11v-2h11c.552 0 1-.448 1-1s-.448-1-1-1c-.403 0-.747.242-.905.587l-1.749-.956c.499-.965 1.494-1.631 2.654-1.631 3.971 0 3.969 6 0 6zm7 7c0-1.656-1.344-3-3-3h-15v2h15c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-20.5v2h20.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728z"/></svg>
                            &nbsp;
                            Wind&nbsp;Speed
                        </div>
                        <div className="report_col">
                            {weather.wind.speed}
                        </div>     
                    </div>
                </div>
                {/* ===================== */}
            </>)}
            <div className="space-20"></div>
            {(!weather.main)&&<Splash/> }
            
               
           <div className="space-50"></div>
            
                <div className="head-text-1">
                    WEATHER SNAP
                </div>
                <div className="space-20"></div>
                <div className="head-text-2">
                    Search for quick weather report
                </div>
                <div className="space-20"></div>
                <div className="head-text-2">
                   Designed and developed by Jithin K Satheesh
                </div>
            
            
           {/* <div className="space-50"></div>
           <div className="space-50"></div>
           <div className="space-50"></div> */}

        </div>
    )
}
