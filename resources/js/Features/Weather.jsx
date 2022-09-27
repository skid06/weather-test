import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import Moment from "moment";

export default function Weather({ days }) {
    return (
    {
        days.map((daily, index) => {
            if (index == 0) {
                return (
                    <div
                        key={index}
                        className="weather-container font-sans md:w-128 max-w-lg rounded-lg overflow-hidden bg-gray-900 shadow-lg mt-8"
                    >
                        <div className="current-weather flex items-center justify-between px-6 py-8">
                            <div className="flex flex-col md:flex-row items-center">
                                <div>
                                    <div className="text-6xl font-semibold">
                                        {daily.Temperature.Maximum.Value}°F
                                    </div>
                                    <div>
                                        {daily.Day.PrecipitationIntensity}{" "}
                                        {daily.Day.PrecipitationType}
                                    </div>
                                </div>
                                <div className="md:mx-5">
                                    <div className="font-semibold">
                                        {daily.Day.IconPhrase}
                                    </div>
                                    <div>New York</div>
                                </div>
                            </div>
                            <div>
                                <canvas
                                    id="iconCurrent"
                                    width="96"
                                    height="96"
                                ></canvas>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        key={index}
                        className="future-weather text-sm bg-gray-800 px-6 py-8 overflow-hidden"
                    >
                        <div>{daily.Day.IconPhrase}</div>
                        <div
                            className={
                                index == 1
                                    ? "flex items-center mt-8"
                                    : "flex items-center"
                            }
                        >
                            <div className="w-1/6 text-lg text-gray-200">
                                {Moment(daily.Date).format("MMM Do")}
                            </div>
                            <div className="w-3/6 px-4 flex items-center">
                                <div>
                                    <canvas
                                        id="`icon1`"
                                        data-icon=""
                                        width="24"
                                        height="24"
                                    ></canvas>
                                </div>
                                <div className="ml-3">
                                    {daily.Day.PrecipitationIntensity}{" "}
                                    {daily.Day.PrecipitationType}
                                </div>
                            </div>
                            <div className="w-1/6 text-center">
                                <div>{daily.Temperature.Minimum.Value}°F</div>
                                <div>{daily.Temperature.Maximum.Value}°F</div>
                            </div>
                            <div className="w-1/6 text-right">
                                <canvas
                                    className="cursor-e-resize"
                                    width="96"
                                    height="96"
                                ></canvas>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    })
}
