import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/inertia-react";
import Moment from "moment";
// import Weather from "../Features/Weather";
// import details from "../fulldetails.json";

export default function FullForecasts(props) {
    const [days, setDays] = useState([]);
    const [location, setLocation] = useState("");
    const [queryResults, setQueryResults] = useState([]);

    const { ip, subscription } = usePage().props

    const forecast = async () => {
        // fetch(`
        //     http://dataservice.accuweather.com/forecasts/v1/hourly/24hour/265720?apikey=jtHUlap8GSXGCIRJmkW7RXtDoQAKPhQx        
        // `)
        //     .then(response => response.json())
        //     .then(data => {
        //         if(subscription == 0) {
        //             setDays(data.DailyForecasts.splice(0, 3));
        //         } else if(subscription == 1) {
        //             setDays(data.DailyForecasts);
        //         } 
        //     });
        if(subscription == 0) {
            setDays(weatherData.DailyForecasts.splice(0, 3));
        } else if(subscription == 1) {
            setDays(weatherData.DailyForecasts);
        } 
    }   

    useEffect(() => forecast(), []);

    console.log(`subscription: ${days}`);


    // useEffect(() => {
    //     fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${location}&apikey=jtHUlap8GSXGCIRJmkW7RXtDoQAKPhQx`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setQueryResults(data)
    //             console.log(`results from api: ${queryResults}`)
    //         })    
    //     console.log(`Location event ${queryResults}`);
    // }, [location]);

    const onHandleChange = (event) => {
        setLocation(event.target.value)
    }
    console.log(queryResults)
    console.log(`ip: ${ip}`)
    console.log('details:', props)

    const details = props.details

    const dayWeatherLogo = details.Day.Icon > 9 ? details.Day.Icon : '0' + details.Day.Icon
    const nightWeatherLogo = details.Night.Icon > 9 ? details.Night.Icon : '0' + details.Night.Icon
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-center text-xl text-gray-800 leading-tight">
                    Today's Weather
                </h2>
            }
        >
            <Head title="Weather" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-white mb-8">  
                            <div className="weather-container font-sans md:w-128 max-w-full overflow-hidden bg-gray-900 shadow-lg">
                                <div className="m-4 flex flex-row items-right">
                                    <div className="w-1/2">
                                        <div className="flex flex-row">
                                            <div className="w-1/4">Current Weather</div>
                                            <div className="w-1/2 font-bold m-5 flex flex-row">
                                                <div className="basis-1/2 text-xl">
                                                    <img typeof="foaf:Image" src={`https://www.accuweather.com/images/weathericons/${dayWeatherLogo}.svg`} width="75" height="45" alt={details.Day.PrecipitationIntensity + details.Day.PrecipitationType} title={details.Day.PrecipitationIntensity + details.Day.PrecipitationType} />
                                                </div>
                                                <div div className="basis-1/2 text-5xl text-left m-4">{details.Temperature.Maximum.Value}°F</div>
                                            </div>
                                            <div className="w-1/4"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-1/2">
                                        <div className="w-3/4 font-semibold flex items-center justify-center border-x-gray-200">
                                            {details.Day.IconPhrase} <br />
                                            {details.Day.PrecipitationIntensity} {details.Day.PrecipitationType}
                                        </div>
                                        <div className="w-1/4 text-right border-x-gray-200">
                                            {Moment(details.Date).format("M/D")}
                                        </div>
                                    </div>
                                </div> 
                            </div>     
                            <div className="flex flex-row text-black justify-center mt-5 mb-5">
                                <div className="text-md">{details.Day.LongPhrase}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Min Temperature: {details.Temperature.Minimum.Value}°{details.Temperature.Minimum.Unit}</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Max Temperature: {details.Temperature.Maximum.Value}°{details.Temperature.Maximum.Unit}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Real Feel Min Temperature: {details.RealFeelTemperature.Minimum.Value}°{details.RealFeelTemperature.Minimum.Unit} <br /> {details.RealFeelTemperature.Minimum.Phrase} </div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Real Feel Max Temperature: {details.RealFeelTemperature.Maximum.Value}°{details.RealFeelTemperature.Maximum.Unit} <br /> {details.RealFeelTemperature.Minimum.Phrase}</div>
                            </div> 
                        </div>
                        <div className="text-white mb-8">  
                            <div className="weather-container font-sans md:w-128 max-w-full overflow-hidden bg-gray-900 shadow-lg">
                                <div className="m-4 flex flex-row items-right">
                                    <div className="w-1/2">
                                        <div className="flex flex-row">
                                            <div className="w-1/4">Day</div>
                                            <div className="w-1/2 font-bold m-5 flex flex-row">
                                                <div className="basis-1/2 text-xl">
                                                    <img typeof="foaf:Image" src={`https://www.accuweather.com/images/weathericons/${dayWeatherLogo}.svg`} width="75" height="45" alt={details.Day.PrecipitationIntensity + details.Day.PrecipitationType} title={details.Day.PrecipitationIntensity + details.Day.PrecipitationType} />
                                                </div>
                                                <div div className="basis-1/2 text-5xl text-left m-4">{details.Temperature.Maximum.Value}°F</div>
                                            </div>
                                            <div className="w-1/4"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-1/2">
                                        <div className="w-3/4 font-semibold flex items-center justify-center">
                                            {details.Day.IconPhrase} <br />
                                            {details.Day.PrecipitationIntensity} {details.Day.PrecipitationType}
                                        </div>
                                        <div className="w-1/4 text-right">
                                            {Moment(details.Date).format("M/D")}
                                        </div>
                                    </div>
                                </div> 
                            </div>   
                            <div className="flex flex-row text-black justify-center mt-5 mb-5">
                                <div className="text-md">{details.Day.LongPhrase}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Wind Speed: {details.Day.Wind.Speed.Value}{details.Day.Wind.Speed.Unit}</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Wind Gust: {details.Day.WindGust.Speed.Value}{details.Day.WindGust.Speed.Unit}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Rain: {details.Day.Rain.Value} {details.Day.Rain.Value.Unit}</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Snow: {details.Day.Snow.Value}{details.Day.Rain.Unit}</div>
                            </div>       
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Probability of Precipitation: {details.Day.PrecipitationProbability}%</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Hours of Precipitation: {details.Day.HoursOfPrecipitation}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Probability of Rain: {details.Day.RainProbability}%</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Hours of Rain: {details.Day.HoursOfRain}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Probability of Snow: {details.Day.SnowProbability}%</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Hours of Snow: {details.Day.HoursOfSnow}</div>
                            </div>                       
                        </div>                
                        <div className="text-white mb-8">  
                            <div className="weather-container font-sans md:w-128 max-w-full overflow-hidden bg-gray-900 shadow-lg">
                                <div className="m-4 flex flex-row items-right">
                                    <div className="w-1/2">
                                        <div className="flex flex-row">
                                            <div className="w-1/4">Night</div>
                                            <div className="w-3/4 font-bold m-5">
                                                <div className="w-1/2 text-xl">
                                                    <img typeof="foaf:Image" src={`https://www.accuweather.com/images/weathericons/${nightWeatherLogo}.svg`} width="75" height="45" alt={details.Night.PrecipitationIntensity + details.Night.PrecipitationType} title={details.Night.PrecipitationIntensity + details.Night.PrecipitationType} />
                                                </div>
                                                <div div className="w-1/2 text-xl">
                                                {details.Night.IconPhrase} <br />
                                            {details.Night.PrecipitationIntensity} {details.Night.PrecipitationType}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-1/2">
                                        <div className="w-3/4 font-semibold flex items-center justify-center">
                                        {details.Night.ShortPhrase}
                                        </div>
                                        <div className="w-1/4 text-right">
                                            {Moment(details.Date).format("M/D")}
                                        </div>
                                    </div>
                                </div> 
                            </div>   
                            <div className="flex flex-row text-black justify-center mt-5 mb-5">
                                <div className="text-md">{details.Night.LongPhrase}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Wind Speed: {details.Night.Wind.Speed.Value}{details.Night.Wind.Speed.Unit}</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Wind Gust: {details.Night.WindGust.Speed.Value}{details.Night.WindGust.Speed.Unit}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Rain: {details.Night.Rain.Value} {details.Night.Rain.Value.Unit}</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Snow: {details.Night.Snow.Value}{details.Night.Rain.Unit}</div>
                            </div>       
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Probability of Precipitation: {details.Night.PrecipitationProbability}%</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Hours of Precipitation: {details.Night.HoursOfPrecipitation}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Probability of Rain: {details.Night.RainProbability}%</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Hours of Rain: {details.Night.HoursOfRain}</div>
                            </div> 
                            <div className="flex flex-row text-black ml-4">
                                <div className="w-2/5 text-center mb-3">Probability of Snow: {details.Night.SnowProbability}%</div>
                                <div className="w-1/5"></div>
                                <div className="w-2/5 text-center mb-3">Hours of Snow: {details.Night.HoursOfSnow}</div>
                            </div>                 
                        </div> 
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
