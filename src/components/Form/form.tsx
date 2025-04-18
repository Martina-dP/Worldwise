import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, searchCountries } from '../../action/action';
import { RootState, AppDispatch } from '../../store/store';
import style from './form.module.css';

const SearchForm:  React.FC = () => {
    
    const [name, setName] = useState('');
    const [languages, setLanguages] = useState('');
    const [timezones, setTimezones] = useState('');

    const data = useSelector((state: RootState) => state.countries);

    const listZoneTime = Array.from(
        new Set(
            data.flatMap((country: any) => country.timezones || [])
        )
    );

    const listLanguages = Array.from(
        new Set(
            data.flatMap((country: any) => country.languages ? Object.values(country.languages) : [])
        )
    ).sort((a: any, b) => a.localeCompare(b));

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const filters: { name?: string; languages?: string; timezones?: string } = {};
        if (name) filters.name = name;
        if (languages) filters.languages = languages;
        if (timezones) filters.timezones = timezones;
        dispatch(searchCountries(filters));
    };

    return (
        <form onSubmit={handleSubmit} className = {style.form_container}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="languages">Languages:</label>
                <select
                    id="languages"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    >
                    <option value="">Select a language</option>
                    {listLanguages.map((lg: any, index: number) => (
                        <option key={index} value={lg}>
                            {lg}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="timezones">Timezones:</label>
                <select
                    id="timezones"
                    value={timezones}
                    onChange={(e) => setTimezones(e.target.value)}
                    >
                    <option value="">Select a timezone</option>
                    {listZoneTime.map((tz: any) => (
                        <option key={tz} value={tz}>
                            {tz}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;