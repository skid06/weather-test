import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import Moment from "moment";
// import Weather from "../Features/Weather";
import weatherData from "../data.json";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function Dashboard(props) {
    const [days, setDays] = useState([]);
    const [location, setLocation] = useState({id: "328328", name: "London"});
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");

    const { ip, subscription } = usePage().props
    const accuweather_key = props.accuweather_key

    const forecast = async () => {
        // Use this code if using a paid version of accuweather api
        // const no_of_days = subscription == 3 ? '15day' : (
        //     subscription == 2 ? '10day' : '5day')

        const no_of_days = '5day'

        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/${no_of_days}/${location.id}?details=true&metric=true&apikey=${accuweather_key}`)
            .then(response => response.json())
            .then(data => {
                if(subscription == 0) {
                    setDays(data.DailyForecasts.splice(0, 3));
                    return;
                }
                setDays(data.DailyForecasts);
            })
            .catch(err => console.log(err));
        // if(subscription == 0) {
        //     setDays(weatherData.DailyForecasts.splice(0, 3));
        //     return;
        // } 
        // setDays(weatherData.DailyForecasts);
    
    }   

    const searchCities = async () => {
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${query}&apikey=${accuweather_key}`)
            .then(response => response.json())
            .then(data => {
                setItems(data?.map(item => {
                    return {id: item.Key, name: `${item.LocalizedName}, ${item.AdministrativeArea.ID}, ${item.Country.ID}`}
                }))
            })
    }

    useEffect(() => forecast(), [location]);
    useEffect(() => searchCities(), [query]);


      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        setQuery(string);
        console.log('handle search', string, results)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        setLocation(item)
      }
    

    console.log('formatted items', items)
    console.log('selected location', location)

    console.log('days', days)
    console.log(`ip: ${ip}`)
    console.log('props', props)
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-center text-xl text-gray-800 leading-tight">
                    Weather Forecasts of {location.name} 
                </h2>
            }
        >
            <Head title="Weather" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <ReactSearchAutocomplete
                                items={items}
                                onSearch={handleOnSearch}
                                onSelect={handleOnSelect}
                                placeholder="Search for the cities..."
                                autoFocus
                            />
                        </div>
                        {/*  Start */}
                        <div className="text-white">
                            {days.map((day, index) => {
                                const logo = day.Day.Icon > 9 ? day.Day.Icon : '0' + day.Day.Icon

                                if(index == 0){
                                    return (
                                        <div key={index} className="weather-container font-sans md:w-128 max-w-full overflow-hidden bg-gray-900 shadow-lg">
                                            <div className="current-weather mt-4 mb-4 flex flex-row items-center justify-around">
                                                <div className="w-1/4 text-center">
                                                    <div>
                                                        <div className="w-1/4 text-sm text-gray-200">{Moment(day.Date).format('ddd')} <br /> {Moment(day.Date).format("M/D")}</div>
                                                        <div className="text-xl font-bold">{day.Day.IconPhrase}</div>
                                                        <div className="flex flex-row justify-center">
                                                            <img typeof="foaf:Image" src={`https://www.accuweather.com/images/weathericons/${logo}.svg`} width="75" height="45" alt={(day.Day.PrecipitationIntensity + day.Day.PrecipitationType).toString()} title={(day.Day.PrecipitationIntensity + day.Day.PrecipitationType).toString()} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 text-center">
                                                    <div className="md:mx-5">
                                                        <div>{weatherData.Headline.Text}</div>
                                                    </div>
                                                </div>
                                                <div className="w-1/4">
                                                    <div className="font-semibold mb-2 text-center">{day.Temperature.Maximum.Value}??{day.Temperature.Maximum.Unit}</div>
                                                    <div className="flex flex-row justify-center">
                                                    <Link href="/full-forecasts" data={{details: {...day, location: location.name}}}><span className="" width="96" height="96">View Full Forecast</span></Link>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>                                
                                    );
                                } else {
                                    return (
                                        <div key={index} className="future-weather text-sm bg-gray-800 px-6 py-8 overflow-hidden">
                                            {/* <div>{day.Day.IconPhrase}</div> */}
                                            <div  className="flex items-center">
                                                <div className="w-1/4 text-sm text-gray-200">{Moment(day.Date).format('ddd')} <br /> {Moment(day.Date).format("M/D")} <br />{day.Day.IconPhrase}</div>
                                                <div className="w-1/4 px-4 ">
                                                    <div className="flex flex-row font-semibold mb-2 text-center">{day.Day.PrecipitationIntensity} {day.Day.PrecipitationType}</div>
                                                    <div className="flex flex-row">
                                                        <img typeof="foaf:Image" src={`https://www.accuweather.com/images/weathericons/${logo}.svg`} width="75" height="45" alt={(day.Day.PrecipitationIntensity + day.Day.PrecipitationType).toString()} title={(day.Day.PrecipitationIntensity + day.Day.PrecipitationType).toString()} />
                                                    </div>
                                                    {/* <div className="flex flex-row">{day.Day.PrecipitationIntensity} {day.Day.PrecipitationType}</div> */}
                                                </div>
                                                <div className="w-1/4 text-center">
                                                    <div>{day.Day.LongPhrase}</div>
                                                </div>
                                                <div className="w-1/4 text-center">
                                                    <div>Hi {day.Temperature.Maximum.Value}??{day.Temperature.Maximum.Unit}</div>
                                                    <div>Lo {day.Temperature.Minimum.Value}??{day.Temperature.Maximum.Unit}</div> 
                                                    {subscription == 3 && <Link href="/full-forecasts" data={{details: {...day, location: location.name}}}><span className="" width="96" height="96">View Full Forecast</span></Link>}                                                       
                                                    {subscription != 3 && <Link href="/payment"><span className="" width="96" height="96">To view Full Forecast, subscribe to Premium Plan.</span></Link>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                            })}                          
                        </div> 
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
